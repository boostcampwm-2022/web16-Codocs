import Char from './char';
import { v1 as uuidv1 } from 'uuid';

declare type CRDTIndex = number[];
class CRDT {
  siteId: string;

  struct: Char[];
  
  constructor() {
    this.siteId = uuidv1();
    // this.localCounter = 0;
    this.struct = [];
  }
  
  saveInsert(chars: Char[]) {
    // binary?
    const index = this.searchInsertIndex(chars[0]);
    this.struct.splice(index, 0, ...chars);
  }

  saveDeleteRange(chars: Char[]){
    chars.forEach(char => this.saveDelete(char));
  }

  saveDelete(char: Char) {
    const index = this.searchDeleteIndex(char);
    if (index === -1) {
      return;
    }
    
    this.struct.splice(index, 1);
  }

  searchDeleteIndex(char: Char) {
    return this.struct.findIndex(
      (c) => JSON.stringify(c.index) === JSON.stringify(char?.index)
    );
  }

  searchInsertIndex(char: Char) {
    const index = this.struct.findIndex((c) => this.compareCRDTIndex(c.index, char.index));
    return index === -1 ? this.struct.length : index;
  }

  compareCRDTIndex(originIndex: CRDTIndex, insertedIndex: CRDTIndex) : boolean {
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
      return false;
    }
    return true;
  }

  toString() {
    return this.struct.map((char) => char.value).join('');
  }

  printStruct(){
    return JSON.stringify(this.struct);
  }

  getStruct() {
    return [...this.struct];
  }
}

const crdt = new CRDT();

export { crdt, CRDT };