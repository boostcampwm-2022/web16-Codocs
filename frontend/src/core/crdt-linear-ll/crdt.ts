import { v4 as uuidv4 } from 'uuid';
import CodeMirror from 'codemirror';
import Char from './char';

interface CharMap {
  [key: string]: Char;
}

class CRDT {
  siteId: string;

  head: Char;

  tail: Char;

  charMap: CharMap;

  constructor() {
    this.siteId = uuidv4();
    this.head = new Char('START', 'TAIL', this.siteId, '', 'HEAD');
    this.tail = new Char('HEAD', 'END', this.siteId, '', 'TAIL');
    this.head.tombstone = true;
    this.tail.tombstone = true;

    this.charMap = {
      [this.head.id]: this.head,
      [this.tail.id]: this.tail
    };
  }

  syncDocument(document: CharMap) {
    this.charMap = { ...document };
    this.head = this.charMap['HEAD'];
    this.tail = this.charMap['TAIL'];
  }

  localInsertRange(index: number, value: string): Char[] {
    return value.split('').map((c, i) => this.localInsert(index + i, c));
  }

  localInsert(index: number, value: string): Char {
    const [leftChar, rightChar] = this.searchInsertPosition(index);
    const insertedChar = new Char(leftChar.id, rightChar.id, this.siteId, value);
    this.insertChar(insertedChar, leftChar, rightChar);

    return insertedChar;
  }

  insertChar(insertedChar: Char, leftChar: Char, rightChar: Char) {
    this.charMap[insertedChar.id] = insertedChar;
    leftChar.rightId = insertedChar.id;
    rightChar.leftId = insertedChar.id;
  }

  searchInsertPosition(index: number) {
    let counter = 0;
    let currentNode = this.head;

    if (index === 0) {
      return [this.head, this.charMap[this.head.rightId]]; // 맨 앞
    }

    while (currentNode.rightId !== 'END') {
      if (counter === index) {
        return [this.charMap[currentNode.leftId], currentNode]; // 글자 사이면 이전 노드와 현재 노드를 반환, 현재 노드 앞에 삽입
      }
      if (!currentNode.tombstone) {
        counter++;
      }
      currentNode = this.charMap[currentNode.rightId];
    }

    return [this.charMap[this.tail.leftId], this.tail]; // 맨 뒤
  }

  localDelete(startIndex: number, endIndex: number): Char[] {
    const deletedChars: Char[] = [];
    let currentIndex = 0;
    let currentNode = this.head;

    //console.log('=========DELETE WHILE START========');
    while (currentNode.rightId !== 'END') {
      if (currentNode.tombstone) {
        currentNode = this.charMap[currentNode.rightId];
        continue;
      }
      if (currentIndex >= endIndex) {
        break;
      }
      if (currentIndex >= startIndex) {
        currentNode.tombstone = true;

        //console.log(currentIndex, currentNode);
        deletedChars.push(currentNode);
      }
      currentIndex++;
      currentNode = this.charMap[currentNode.rightId];
    }
    return deletedChars;
  }

  localReplace(index: number, value: string) {
    const [leftChar] = this.searchInsertPosition(index);
    const replaceChar = this.charMap[leftChar.rightId];
    replaceChar.value = value;

    return replaceChar;
  }

  remoteInsert(chars: Char[], editor: CodeMirror.Editor) {
    const charsLen = chars.length;
    const [firstChar, lastChar] = [chars[0], chars[charsLen - 1]];

    this.charMap[firstChar.leftId].rightId = firstChar.id;
    this.charMap[lastChar.rightId].leftId = lastChar.id;

    for (let i = 0; i < chars.length; i++) {
      this.charMap[chars[i].id] = chars[i];
    }

    const index = this.searchIndexByChar(firstChar);
    const position = editor?.getDoc().posFromIndex(index);
    this.addChange(editor, position, position, chars.map((char) => char.value).join(''));
  }

  searchIndexByChar(char: Char): number {
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode.rightId !== 'END') {
      if (currentNode.tombstone) {
        currentNode = this.charMap[currentNode.rightId];
        continue;
      }
      if (currentNode.id === char.id) {
        return currentIndex;
      }
      currentIndex++;
      currentNode = this.charMap[currentNode.rightId];
    }

    throw new Error(
      'Error: Can not find Index. That is Huge Error Case. Please report it to our GitHub.'
    );
  }

  remoteDelete(chars: Char[], editor: CodeMirror.Editor) {
    let currentNode = this.head;
    let deleteStartIndex = 0;
    let currentIndex = 0;
    if (chars.length === 0) {
      return -1;
    }
    while (currentNode.rightId !== 'END') {
      if (chars[0].id === currentNode.id) {
        deleteStartIndex = currentIndex;
        break;
      }
      if (!currentNode.tombstone) {
        currentIndex++;
      }
      currentNode = this.charMap[currentNode.rightId];
    }
    const deleteEndIndex = deleteStartIndex + chars.length;

    chars.forEach((char) => {
      this.charMap[char.id].tombstone = true;
    });

    const positionFrom = editor?.getDoc().posFromIndex(deleteStartIndex);
    const positionTo = editor?.getDoc().posFromIndex(deleteEndIndex);

    this.addChange(editor, positionFrom, positionTo, '');

    return [deleteStartIndex, deleteEndIndex];
  }

  remoteReplace(char: Char, editor: CodeMirror.Editor) {
    const replaceChar = this.charMap[char.id];
    replaceChar.value = char.value;

    const index = this.searchIndexByChar(char);
    const from = editor?.getDoc().posFromIndex(index);
    const to = editor?.getDoc().posFromIndex(index + 1);
    this.addChange(editor, from, to, char.value);

    console.log('==========remoteReplace==========');
    console.log(replaceChar);
    console.log('==========remoteReplace==========');
    return replaceChar;
  }

  // source : https://github.com/codemirror/codemirror5/pull/5619
  addChange(
    editor: CodeMirror.Editor,
    from: CodeMirror.Position,
    to: CodeMirror.Position,
    text: string
  ) {
    if (!editor) {
      return;
    }
    const adjust = editor
      .getDoc()
      .listSelections()
      .findIndex(({ anchor, head }) => {
        return CodeMirror.cmpPos(anchor, head) == 0 && CodeMirror.cmpPos(anchor, from) == 0;
      });
    editor.operation(() => {
      editor.getDoc().replaceRange(text, from, to, 'remote');
      if (adjust > -1) {
        const range = editor.getDoc().listSelections()[adjust];
        if (
          range &&
          CodeMirror.cmpPos(range.head, CodeMirror.changeEnd({ from, to, text: [text] })) == 0
        ) {
          const ranges: CodeMirror.Range[] = editor.getDoc().listSelections().slice();
          ranges[adjust] = {
            ...ranges[adjust],
            anchor: from,
            head: to
          };
          editor.getDoc().setSelections(ranges);
        }
      }
    });
  }

  toString(): string {
    let str = '';
    let currentNode = this.head;
    try {
      while (currentNode.rightId !== 'END') {
        if (!currentNode.tombstone) {
          str += currentNode.value;
        }

        currentNode = this.charMap[currentNode.rightId];
      }
    } catch (e) {
      // console.log('Tostring 에러!!!: ', currentNode);
    }

    return str;
  }

  getAllNode(): Char[] {
    const nodeList = [];
    let currentNode = this.head;

    while (currentNode.rightId !== 'END') {
      nodeList.push(currentNode);
      currentNode = this.charMap[currentNode.rightId];
    }

    return nodeList;
  }
}

const crdt = new CRDT();

export { crdt, CRDT };
