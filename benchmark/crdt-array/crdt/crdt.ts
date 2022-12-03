import Char from './char';
import { v1 as uuidv1 } from 'uuid';

type CRDTIndex = number[];

class CRDT {
  siteId: string;

  localCounter: number;

  struct: Char[];
  
  constructor() {
    this.siteId = uuidv1();
    this.localCounter = 0;
    this.struct = [];
  }

  localInsertRange(index: number, value: string): Char[] {
    return value.split('').map((c, i)=> this.localInsert(index+i, c));
  }
  
  localInsert(index: number, value: string) : Char {
    const insertedChar = this.generateChar(index, value);
    this.struct.splice(index, 0, insertedChar);
    return insertedChar;
  }

  localDelete(startIndex: number, endIndex: number) : Char[] {
    const deletedChars = this.struct.splice(startIndex, endIndex - startIndex);
    return deletedChars;
  }

  remoteInsert(chars: Char[]) {
    const index = this.searchInsertIndex(chars[0]);
    this.struct.splice(index, 0, ...chars);
  }

  remoteDeleteRange(chars: Char[]){
    chars.forEach(char => this.remoteDelete(char));
  }

  remoteDelete(char: Char) {
    const index = this.searchDeleteIndex(char);
    if (index === -1) {
      return;
    }
    
    this.struct.splice(index, 1);
  }

  searchDeleteIndex(char: Char) {
    return this.struct.findIndex(
      (c) => ( JSON.stringify(c.index) === JSON.stringify(char?.index) ) && c.siteId === char?.siteId
    );
  }

  searchInsertIndex(char: Char) {
    const index = this.struct.findIndex((c) => this.compareCRDTIndex(c, char));
    return index === -1 ? this.struct.length : index;
  }

  compareCRDTIndex(originChar: Char, insertedChar: Char) : boolean {
    const [originIndex, insertedIndex] = [originChar.index, insertedChar.index];
    const insertedIndexLength = insertedIndex.length;
    const originIndexLength = originIndex.length;
    for (let i = 0; i < insertedIndexLength; i++) {
      if (originIndex[i] > insertedIndex[i]) {
        return true;
      }
      if (originIndex[i] < insertedIndex[i]) {
        return false;
      }
      if (originIndex[i] === undefined) {
        return false;
      }
    }
    if (originIndexLength === insertedIndexLength) {
      return originChar.siteId > insertedChar.siteId; // 작은게 앞에 옴
    }
    return true; // Origin이 더 큼
  }

  generateChar(index: number, value: string): Char {
    const startIndex = this.struct[index - 1]
      ? this.struct[index - 1].index
      : [];
    const endIndex = this.struct[index] ? this.struct[index].index : [];
    const newIndex = this.generateIndex(startIndex, endIndex);

    return new Char(newIndex, this.siteId, value);
  }

  generateIndex(
    startIndex: CRDTIndex,
    endIndex: CRDTIndex
  ): CRDTIndex {
    if (startIndex.length === 0 && endIndex.length === 0) {
      return [0, 5];
    }
    if (startIndex.length === 0) {
      return this.getMidIndex([0], endIndex);
    }
    if (endIndex.length === 0) {
      return [startIndex[0] + 1];
    }

    const mid = this.getMidIndex(startIndex, endIndex);

    return mid;
  }

  getMidIndex(startIndex: CRDTIndex, endIndex: CRDTIndex) : CRDTIndex {
    const [shortIndex, longIndex] = startIndex.length > endIndex.length ? [endIndex, startIndex] : [startIndex, endIndex];
    
    const midIndex = [...longIndex];
    for(let i=0;i<shortIndex.length;i++){
      midIndex[i] += shortIndex[i];
    }
    for(let i=0;i<midIndex.length;i++){
      midIndex[i] /= 2;
    }
    for(let i=0;i<midIndex.length;i++){
      if(midIndex[i]%1 === 0){
        continue;
      }
      midIndex[i] = Math.floor(midIndex[i]);
      if(i+1 === midIndex.length){
        midIndex.push(5);
        break;
      }
      midIndex[i+1] += 5;
    }
    for(let i=midIndex.length-1;i>0;i--){
      const carry = Math.floor(midIndex[i] / 10);
      midIndex[i-1] += carry;
      midIndex[i] %= 10;
    }

    return midIndex;
  }
  
  toString() {
    return this.struct.map((char) => char.value).join('');
  }

  printStruct(){
    return JSON.stringify(this.struct);
  }

  syncDocument(document : Char[]) {
    this.struct = [...document];
  }
}

const crdt = new CRDT();

export { crdt, CRDT };