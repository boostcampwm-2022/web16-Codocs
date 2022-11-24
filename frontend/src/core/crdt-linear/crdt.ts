import Char from './char';
import { v1 as uuidv1 } from 'uuid';

class CRDT {
  siteId: string;

  //   localCounter: number;
  struct: Char[];
   
  constructor() {
    this.siteId = uuidv1();
    // this.localCounter = 0;
    this.struct = [];
  }
  // a b c d e
  // 0 1 2 3 4
  // [3,5]
  // [0]
  // case
  // 1. [0], [1]: 1이하로 차이나는 경우 [0, 5]
  //   1-1. [0, 5], [0, 7] index 0에서 같고 -> index 1에서 2번
  //   1-2. [0, 5], [0, 6] index 0에서 같고 -> index 1에서 1번 (pos1 바로 단계에 5추가 후 return)
  //   1-3. [0, 5], [0, 5] index 0에서 같고 -> index 1에서 같은데 둘다 마지막 인덱스 return pos1
  // 2. [0], [4]: 1보다 많이 차이 - 대충 나누기 2 [2]

  // if
  // [] [] -> 0
  // [0] [] -> 1
  // [] [1] -> 0

  //
  localInsert(index: number, value: string) {
    const char = this.generateChar(index, value);
    this.struct.splice(index, 0, char);

    // broadcast char
  }

  localDelete(startIndex: number, endIndex: number) {
    this.struct.splice(startIndex, endIndex - startIndex);
  }

  remoteInsert(char: Char, doc: CodeMirror.Doc) {
    // binary?
    const index = this.searchInsertIndex(char);
    this.struct.splice(index, 0, char);

    const position = doc.posFromIndex(index);
    doc.replaceRange(char.value, position);
    // TODO: posFromIndex => editor.replaceRange();
  }

  remoteDelete(char: Char, doc: CodeMirror.Doc) {
    const index = this.searchDeleteIndex(char);
    if (index === -1) {
      return;
    }
    this.struct.splice(index, 1);

    const position = doc.posFromIndex(index);
    doc.replaceRange('', position);
    // TODO: posFromIndex => editor.replaceRange();
  }

  searchDeleteIndex(char: Char) {
    return this.struct.findIndex(
      (c) => JSON.stringify(c.index) === JSON.stringify(char.index)
    );
  }

  searchInsertIndex(char: Char) {
    const index = this.struct.findIndex((c) => c.index > char.index);
    return index === -1 ? this.struct.length : index;
  }

  /**
   * 1. 비어 있는 경우
   * 1-1. 처음 입력할 떄
   * 1-2. 양 끝에 입력할 때
   */
  generateChar(index: number, value: string): Char {
    const startIndex = this.struct[index - 1]
      ? this.struct[index - 1].index
      : [];
    const endIndex = this.struct[index] ? this.struct[index].index : [];
    const newIndex = this.generateIndex(startIndex, endIndex);

    return new Char(newIndex, this.siteId, value);
  }

  /**
   * 1. 0번 인덱스를 비교한다 1.24 => [1, 2, 4]
   * 2. 같으면 다음 인덱스를 비교한다
   * 3. 인덱스라는 변수는 => [1, 3]
   * [1, 0], [1, 1] => [1, 0, 5] 나누어진 수가 정수가 아닌 경우, 소수부를 push한다
   * 3. 다르면 [1, 2] -> [1, 5] -> [1, 5]
   * 4. 0.5랑 0.7 = 0.6 [0, 6]
   * 5. 비어있는 경우
   *   1. [] [] => newIndex = [0]
   *   2. [] [0, 5, 5] = newIndex[right - 1] [-1]
   *   3. [0] [] = newIndex[left + 1]
   */
  generateIndex(
    startIndex: number[],
    endIndex: number[],
    newIndex: number[] = []
  ): number[] {
    console.log(startIndex, endIndex);

    if (startIndex.length === 0 && endIndex.length === 0) {
      return [0];
    }
    if (startIndex.length === 0) {
      return [endIndex[0] - 1];
    }
    if (endIndex.length === 0) {
      return [startIndex[0] + 1];
    }

    if (startIndex[0] === endIndex[0]) {
      return this.generateIndex(startIndex.slice(1), endIndex.slice(1), [
        ...newIndex,
        startIndex[0],
      ]);
    }
    const mid = (startIndex[0] + endIndex[0]) / 2;

    return [...newIndex, ...mid.toString().split('.').map(Number)];
  }

  toString() {
    return this.struct.map((char) => char.value).join('');
  }
}

const crdt = new CRDT();

export { crdt, CRDT };