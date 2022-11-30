import Char from './char';
import {CRDT} from './crdt';
import CodeMirror from 'codemirror';

describe('localInsert() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
    crdt.localInsert(0, 'A');
    crdt.localInsert(1, 'B');
    crdt.localInsert(2, 'C');
  });

  it('1. localInsert(0, "H") 테스트', () => {
    crdt.localInsert(0, 'H');
    expect(crdt.toString()).toEqual('HABC');
  });

  it('2. localInsert(3, "D") 테스트', () => {
    crdt.localInsert(3, 'D');
    expect(crdt.toString()).toEqual('ABCD');
  });

  it('3. localInsert(1, "F") 테스트', () => {
    crdt.localInsert(1, 'F');
    expect(crdt.toString()).toEqual('AFBC');
  });
});

describe('localDelete() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
    crdt.localInsert(0, 'A');
    crdt.localInsert(1, 'B');
    crdt.localInsert(2, 'C');
  });

  it('1. localDelete(0, 0) 테스트', () => {
    crdt.localDelete(0, 0);
    expect(crdt.toString()).toEqual('ABC');
  });
  it('2. localDelete(0, 1) 테스트', () => {
    crdt.localDelete(0, 1);
    expect(crdt.toString()).toEqual('BC');
  });
  it('3. localDelete(1, 2) 테스트', () => {
    crdt.localDelete(1, 2);
    expect(crdt.toString()).toEqual('AC');
  });
  it('4. localDelete(1, 3) 테스트', () => {
    crdt.localDelete(1, 3);
    expect(crdt.toString()).toEqual('A');
  });
});

describe('generateIndex() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
  });
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

  it('1. 양 옆에 인덱스가 존재하고 그 사이에 넣는 경우 (Default)', () => {
    expect(crdt.generateIndex([1], [2])).toEqual([1, 5]);
  });

  it('2. 둘 다 비어있는 경우, [] []', () => {
    expect(crdt.generateIndex([], [])).toEqual([0,5]);
  });

  it('3. 왼쪽만 비어있는 경우, [] [0, 5]', () => {
    expect(crdt.generateIndex([], [0, 5])).toEqual([0, 2, 5]);
  });

  it('4. 오른쪽만 비어있는 경우, [0, 5] []', () => {
    expect(crdt.generateIndex([0, 5], [])).toEqual([1]);
  });

  it('5. 정수부는 같고 소수부가 다른 경우, [1, 2] [1, 5]', () => {
    expect(crdt.generateIndex([1, 2], [1, 5])).toEqual([1, 3, 5]);
  });

  it('6. [1, 2, 3] [1, 2, 4] => [1, 2, 3, 5]', () => {
    expect(crdt.generateIndex([1, 2, 3], [1, 2, 4])).toEqual([1, 2, 3, 5]);
  });
});

describe('searchIndex() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
    crdt.localInsert(0, 'A');
    crdt.localInsert(1, 'B');
    crdt.localInsert(2, 'C');
  });

  it('1. remoteInsert된 Char의 인덱스가 기존 struct 사이에 존재하는 경우', () => {
    expect(crdt.searchInsertIndex(new Char([0, 7, 5], '123', 'D', 4))).toEqual(1);
  });
  it('2. crdt struct 인덱스를 초과하는 Char 입력 (맨 뒤에 입력)', () => {
    expect(crdt.searchInsertIndex(new Char([9999, 5, 5], '123', 'D', 5))).toEqual(3);
  });
  it('3. crdt struct 인덱스를 초과하는 Char 입력 (맨 앞에 입력)', () => {
    expect(crdt.searchInsertIndex(new Char([-1, 5, 5], '123', 'D', 6))).toEqual(0);
  });
});

// Editor에 대한 의존성 지님 
describe('remoteInsert() Test:', () => { 
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
    crdt.localInsert(0, 'A');
    crdt.localInsert(1, 'B');
    crdt.localInsert(2, 'C');
  });
  let doc: CodeMirror.Doc;
  let editor: CodeMirror.Editor;

  it('1. remoteInsert된 Char의 인덱스가 기존 struct 사이에 존재하는 경우', () => {
    crdt.remoteInsert([new Char([0, 7], '123', 'D', 3)], editor);
    expect(crdt.toString()).toEqual('ADBC');
  });
  it('2. remoteInsert : 맨 앞에 입력받는 경우', () => {
    crdt.remoteInsert([new Char([0, 2, 5], '123', 'D', 4)], editor);
    expect(crdt.toString()).toEqual('DABC');
  });
  it('3. remoteInsert : 맨 뒤에 입력받는 경우', () => {
    crdt.remoteInsert([new Char([9999, 5], '123', 'D', 5)], editor);
    expect(crdt.toString()).toEqual('ABCD');
  });
  it('4. remoteInsert : 오류 케이스 1', () => {
    crdt.struct = [];
    crdt.remoteInsert([new Char([0,7,4,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,6,7,3,3,2,7,3,1,5,3,1,1,3,2,5,9,4,6,8,2,2,7,6,2,4,8,9,3,1,8,8,4,7,6,5,6,2,5],'abc','s', 6)], editor);
    crdt.remoteInsert([new Char([0,7,5],'abc','m', 7)], editor);
    crdt.remoteInsert([new Char([0,7,4,9,9,9,9,9,9,9,9,5,8,3,6,6,6,3,6,5,7,6,5,5,6,6,2,9,7,3,4,1,1,3,8,1,2,4,4,6,5,9,4,2,3,8,2,8,1,2,5],'abc','e', 8)], editor);
    expect(crdt.toString()).toEqual('esm');
  });
  it('5. remoteInsert : 여러 개를 맨 뒤에 입력하는 경우', () => {
    crdt.remoteInsert([new Char([9999, 5], '123', 'D', 3), new Char([9999, 7, 5], '123', 'E', 4), new Char([9999, 9], '123', 'F', 5)], editor);
    expect(crdt.toString()).toEqual('ABCDEF');
  });
  it('5. remoteInsert : 여러 개 사이에 입력하는 경우', () => {
    crdt.remoteInsert([new Char([0, 7], '123', 'D',3 ), new Char([0, 8], '123', 'E', 4), new Char([0, 9], '123', 'F', 5)], editor);
    expect(crdt.toString()).toEqual('ADEFBC');
  });
  it('5. remoteInsert : 여러 개 맨 앞에 입력하는 경우', () => {
    crdt.remoteInsert([new Char([0, 1], '123', 'D', 3), new Char([0, 2], '123', 'E', 4), new Char([0, 3], '123', 'F', 5)], editor);
    expect(crdt.toString()).toEqual('DEFABC');
  });
});

describe('getMidIndex() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
  });

  it('1. crdt.getMidIndex([0, 5], [1])', () => {
    expect(crdt.getMidIndex([0, 5], [1])).toEqual([0, 7, 5]);
  });
  it('2. crdt.getMidIndex([0, 9], [0, 8])', () => {
    expect(crdt.getMidIndex([0, 9], [0, 8])).toEqual([0, 8, 5]);
  });
  it('3. crdt.getMidIndex([0, 9], [1, 9])', () => {
    expect(crdt.getMidIndex([0, 9], [1, 9])).toEqual([1, 4]);
  });

  it('4. crdt.getMidIndex([12, 9, 9], [25, 9, 9])', () => {
    expect(crdt.getMidIndex([12, 9, 9], [25, 9, 9])).toEqual([19, 4, 9]);
  });
});

describe('convertCRDTIndex() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
  });

  it('1. [1, 2, 3] - [1, 2, 4]', () => {
    expect(crdt.compareCRDTIndex(new Char([1, 2, 3], '123', 'a', 1), new Char([1, 2, 4], '124', 'b', 2))).toEqual(false);
  });
  
  it('2. [1, 2] - [1, 2, 4]', () => {
    expect(crdt.compareCRDTIndex(new Char([1, 2], '123', 'a', 2), new Char([1, 2, 4], '123', 'b', 3))).toEqual(false);
  });

  it('3. [1, 2, 3] - [1, 2]', () => {
    expect(crdt.compareCRDTIndex(new Char([1, 2, 3], '123', 'a', 1), new Char([1, 2], '124', 'b', 2))).toEqual(true);
  });
  
  it('4. [0,7,4,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,6,7,3,3,2,7,3,1,5,3,1,1,3,2,5,9,4,6,8,2,2,7,6,2,4,8,9,3,1,8,8,4,7,6,5,6,2,5] - [0,7,5]',() => {
    expect(crdt.compareCRDTIndex(new Char([0,7,4,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,6,7,3,3,2,7,3,1,5,3,1,1,3,2,5,9,4,6,8,2,2,7,6,2,4,8,9,3,1,8,8,4,7,6,5,6,2,5], '123', 'a', 1), new Char([0, 7, 5], '124', 'b', 2))).toEqual(false);
  });
});

describe('중복 인덱스 테스트 Test:', () => {
  let crdt1: CRDT;
  let crdt2: CRDT;
  
  beforeEach(() => {
    crdt1 = new CRDT();
    crdt2 = new CRDT();
  });

  let editor: CodeMirror.Editor;

  it('같은 인덱스를 가진 두 Char를 순서를 바꿔 Insert 테스트 (교환법칙 성립 확인)', () => {

    crdt1.remoteInsert([new Char([0,5], '456', 'B', 0)], editor);
    crdt1.remoteInsert([new Char([0,5], '123', 'A', 0)], editor);

    crdt2.remoteInsert([new Char([0,5], '123', 'A', 0)], editor);
    crdt2.remoteInsert([new Char([0,5], '456', 'B', 0)], editor);

    expect(crdt1.toString()).toEqual('AB');
    expect(crdt2.toString()).toEqual('AB');
    expect(crdt1.struct).toEqual(crdt2.struct);
  });

  it('2. 두 인덱스가 같고, originChar의 siteID가 더 큰 경우', () => {
    const originChar = new Char([1, 2, 4], 'b', '', 2);
    const insertedChar = new Char([1, 2, 4], 'a', '', 3);
    expect(crdt1.compareCRDTIndex(originChar, insertedChar)).toEqual(true);
  }); 

  it('3. 두 인덱스가 같고, originChar의 siteID가 더 작은 경우', () => {
    const originChar = new Char([1, 2, 4], 'a', '', 2);
    const insertedChar = new Char([1, 2, 4], 'b', '', 3);
    expect(crdt1.compareCRDTIndex(originChar, insertedChar)).toEqual(false);
  }); 
});
