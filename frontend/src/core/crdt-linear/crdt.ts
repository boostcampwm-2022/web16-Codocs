import Char from './char';
import { v1 as uuidv1 } from 'uuid';

class CRDT {
  siteId: string;

  struct: Char[];
   
  constructor() {
    this.siteId = uuidv1();
    // this.localCounter = 0;
    this.struct = [];
  }
  
  localInsert(index: number, value: string) : Char {
    const insertedChar = this.generateChar(index, value);
    this.struct.splice(index, 0, insertedChar);

    return insertedChar;
  }

  localDelete(startIndex: number, endIndex: number) : Char {
    const [ deletedChar ] = this.struct.splice(startIndex, endIndex - startIndex);
    return deletedChar;
  }

  remoteInsert(char: Char, doc: CodeMirror.Doc) {
    // binary?
    const index = this.searchInsertIndex(char);
    this.struct.splice(index, 0, char);

    
    const position = doc?.posFromIndex(index);
    doc?.replaceRange(char.value, position, position, 'remote');
    
  }

  remoteDelete(char: Char, doc: CodeMirror.Doc) {
    const index = this.searchDeleteIndex(char);
    if (index === -1) {
      return;
    }
    this.struct.splice(index, 1);

    const positionFrom = doc.posFromIndex(index);
    const positionTo= doc.posFromIndex(index+1);

    doc.replaceRange('', positionFrom, positionTo, 'remote');
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
      return [0];
    }
    if (startIndex.length === 0) {
      return [endIndex[0] - 1];
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
}

const crdt = new CRDT();

export { crdt, CRDT };