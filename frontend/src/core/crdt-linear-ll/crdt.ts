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
    const [leftChar, rightChar] = this.searchInsertIndex(index);
    const insertedChar = new Char(leftChar.id, rightChar.id, this.siteId, value);
    this.insertChar(insertedChar, leftChar, rightChar);
    
    return insertedChar; 
  }

  insertChar (insertedChar: Char, leftChar: Char, rightChar: Char) {
    this.charMap[insertedChar.id] = insertedChar; 
    leftChar.rightId = insertedChar.id;
    rightChar.leftId = insertedChar.id;
  }

  searchInsertIndex (index: number) { // index -> editor index
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