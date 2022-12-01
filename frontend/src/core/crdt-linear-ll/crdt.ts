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

  //   localInsert (index: number, value: string):Char {
  //     const insertedChar = this.generateChar(index, value);
  //     this.insert(insertedChar);
    
  //     return insertedChar;
  //   }
  
  //   generateChar (index: number, value: string) :Char {
    
    

  //     return new Char();
  //   }

  searchInsertIndex (index: number) { // index -> editor index
    let counter = 0;
    let currentNode = this.head;
    
    if (index === 0) {
      return [this.head, this.charMap[this.head.rightId]]; // 맨 앞
    }

    while (currentNode.rightId !== 'END') {
      if (counter === index) {
        return [this.charMap[currentNode.leftId], currentNode]; // 글자 사이면 이전 노드와 현재 노드를 반환 
      }
      if (!currentNode.tombstone) {
        counter++;
      }
      currentNode = this.charMap[currentNode.rightId];
    }

    return [this.charMap[this.tail.leftId], this.tail]; // 맨 뒤
  }

  // 1 c 
  // ab
  

  /*
  1. [] => (0) a
  if (index===0) => head. head.rightID;
  
  */
}

const crdt = new CRDT();
console.log(crdt.charMap);

export { crdt, CRDT };