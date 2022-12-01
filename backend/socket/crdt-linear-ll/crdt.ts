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

  saveInsert(chars: Char[]) {
    console.log("INSERT :" , chars);
    console.log("CHARMAP :" , this.charMap);
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
  }

  saveDelete(chars: Char[]) {
    let currentNode = this.head;
    let deleteStartIndex = 0;
    let currentIndex = 0;
    
    console.log("DELETE :" , chars);
    if(chars.length === 0){
      return -1;
    }
    while (currentNode.rightId !== 'END') {
      if (chars[0]?.id === currentNode.id) { // 오류
        deleteStartIndex = currentIndex;
        break;
      }
      if (!currentNode.tombstone) {
        currentIndex++;
      }
      currentNode = this.charMap[currentNode.rightId];
    }
    const deleteEndIndex = deleteStartIndex + chars.length;

    chars.forEach(char => {
      this.charMap[char.id].tombstone = true;
    });
    

    return [deleteStartIndex, deleteEndIndex];
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

  getCharMap() {
    return this.charMap;
  }
}

const crdt = new CRDT();


export { crdt, CRDT };