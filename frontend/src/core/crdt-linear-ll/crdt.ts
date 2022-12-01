import { v4 as uuidv4 } from 'uuid';
import Char from './char';

interface CharMap {
  [key: string] : Char;
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
      [this.head.id] : this.head,
      [this.tail.id] : this.tail
    };
  }

  localInsertRange(index: number, value: string): Char[] {
    return value.split('').map((c, i)=> this.localInsert(index+i, c));
  }

  localInsert (index: number, value: string):Char {
    const [leftChar, rightChar] = this.searchInsertPosition(index);
    const insertedChar = new Char(leftChar.id, rightChar.id, this.siteId, value);
    this.insertChar(insertedChar, leftChar, rightChar);
    
    return insertedChar; 
  }

  insertChar (insertedChar: Char, leftChar: Char, rightChar: Char) {
    this.charMap[insertedChar.id] = insertedChar; 
    leftChar.rightId = insertedChar.id;
    rightChar.leftId = insertedChar.id;
  }

  searchInsertPosition (index: number) { // editor index => CRDT Position
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


  localDelete (startIndex: number, endIndex: number) : Char[] {
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

  remoteInsert(chars: Char[], editor: CodeMirror.Editor) {
    const charsLen = chars.length;
    const [firstChar, lastChar] = [chars[0], chars[charsLen - 1]];
    
    this.charMap[firstChar.leftId].rightId = firstChar.id;
    this.charMap[lastChar.rightId].leftId = lastChar.id;

    const charsObject = chars.reduce((acc, curr) => ({
      ...acc, 
      [curr.id] : curr
    }), {});
    
    this.charMap = {
      ...this.charMap,
      ...charsObject
    };
    
    const index = this.searchIndexByChar(firstChar);
    const position = editor?.getDoc().posFromIndex(index);
    editor?.replaceRange(chars.map((char)=>char.value).join(''), position, position, 'remote');
  }

  searchIndexByChar (char: Char): number {
    let currentNode = this.head;
    let currentIndex = 0;
    
    while (currentNode.rightId !== 'END') {
      if (currentNode.tombstone) {
        currentNode = this.charMap[currentNode.rightId];
        continue;
      }
      if(currentNode.id === char.id) {
        return currentIndex;
      }
      currentIndex++;
      currentNode = this.charMap[currentNode.rightId];
    }
    
    
    throw new Error('Error: Can not find Index. Please report it to our GitHub.');
  }

  

  /**
   * 1. 받은 맨 왼쪽 노드를 꺼낸다.
   * 2. 받은 배열 마지막 노드를 꺼낸다.
   * 3. 맨 왼쪽 노드의 left를 charMap에서 꺼낸다.
   * 4. 꺼낸 left의 right를 맨 왼쪽 노드의 id를 가리키게 한다.
   * 5. 맨 오른쪽 노드의 right를 charMap에서 꺼낸다.
   * 6. 꺼낸 right의 left를 맨 오른쪽 노드의 id로 바꾼다.
   * 7. 연결해줬으면, chars 배열을 charMap에 때려박는다. 
   */


  toString (): string {
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

  getAllNode (): Char[] {
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