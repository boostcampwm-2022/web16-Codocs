import { v4 as uuidv4 } from 'uuid';
import Char from './char';

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

  insertChar(insertedChar: Char, leftChar: Char, rightChar: Char) {
    this.charMap[insertedChar.id] = insertedChar;
    leftChar.rightId = insertedChar.id;
    rightChar.leftId = insertedChar.id;
  }

  localInsert(index: number, value: string): Char {
    const [leftChar, rightChar] = this.searchInsertPosition(index);
    const insertedChar = new Char(leftChar.id, rightChar.id, this.siteId, value);
    this.insertChar(insertedChar, leftChar, rightChar);

    return insertedChar;
  }

  localInsertRange(index: number, value: string): Char[] {
    return value.split('').map((c, i) => this.localInsert(index + i, c));
  }

  searchInsertPosition(index: number) {
    let counter = 0;
    let currentNode = this.head;

    if (index === 0) {
      return [this.head, this.charMap[this.head.rightId]];
    }

    while (currentNode.rightId !== 'END') {
      if (counter === index) {
        return [this.charMap[currentNode.leftId], currentNode];
      }
      if (!currentNode.tombstone) {
        counter++;
      }
      currentNode = this.charMap[currentNode.rightId];
    }

    return [this.charMap[this.tail.leftId], this.tail];
  }

  localDelete(startIndex: number, endIndex: number): Char[] {
    const deletedChars: Char[] = [];
    let currentIndex = 0;
    let currentNode = this.head;

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

  remoteInsert(chars: Char[]): [number, string] {
    const charsLen = chars.length;
    const [firstChar, lastChar] = [chars[0], chars[charsLen - 1]];

    this.charMap[firstChar.leftId].rightId = firstChar.id;
    this.charMap[lastChar.rightId].leftId = lastChar.id;

    for (let i = 0; i < chars.length; i++) {
      this.charMap[chars[i].id] = chars[i];
    }

    const insertedIndex = this.searchIndexByChar(firstChar);
    const insertedChars = chars.map((char) => char.value).join('');

    return [insertedIndex, insertedChars];
  }

  remoteDelete(chars: Char[]): null[] | number[] {
    let currentNode = this.head;
    let deleteStartIndex = 0;
    let currentIndex = 0;
    if (chars.length === 0) {
      return [null, null];
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

    return [deleteStartIndex, deleteEndIndex];
  }

  remoteReplace(char: Char): [number, string] {
    const replaceChar = this.charMap[char.id];
    replaceChar.value = char.value;
    
    return [this.searchIndexByChar(char), replaceChar.value];
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
        break;
      }
      currentIndex++;
      currentNode = this.charMap[currentNode.rightId];
    }

    return currentIndex;
  }

  toString(): string {
    let str = '';
    let currentNode = this.head;

    while (currentNode.rightId !== 'END') {
      if (!currentNode.tombstone) {
        str += currentNode.value;
      }

      currentNode = this.charMap[currentNode.rightId];
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

export default CRDT;
