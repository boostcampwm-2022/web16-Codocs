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

// describe('generateIndex() Test:', () => {
//   let crdt: CRDT;
//   beforeEach(() => {
//     crdt = new CRDT();
//   });
//   /**
//    * 1. 0번 인덱스를 비교한다 1.24 => [1, 2, 4]
//    * 2. 같으면 다음 인덱스를 비교한다
//    * 3. 인덱스라는 변수는 => [1, 3]
//    * [1, 0], [1, 1] => [1, 0, 5] 나누어진 수가 정수가 아닌 경우, 소수부를 push한다
//    * 3. 다르면 [1, 2] -> [1, 5] -> [1, 5]
//    * 4. 0.5랑 0.7 = 0.6 [0, 6]
//    * 5. 비어있는 경우
//    *   1. [] [] => newIndex = [0]
//    *   2. [] [0, 5, 5] = newIndex[right - 1] [-1]
//    *   3. [0] [] = newIndex[left + 1]
//    */

//   it('1. 양 옆에 인덱스가 존재하고 그 사이에 넣는 경우 (Default)', () => {
//     expect(crdt.generateIndex([1], [2])).toEqual([1, 5]);
//   });

//   it('2. 둘 다 비어있는 경우, [] []', () => {
//     expect(crdt.generateIndex([], [])).toEqual([0]);
//   });

//   it('3. 왼쪽만 비어있는 경우, [] [0]', () => {
//     expect(crdt.generateIndex([], [0])).toEqual([-1]);
//   });

//   it('4. 오른쪽만 비어있는 경우, [0] []', () => {
//     expect(crdt.generateIndex([0], [])).toEqual([1]);
//   });

//   it('5. 정수부는 같고 소수부가 다른 경우, [1, 2] [1, 5]', () => {
//     expect(crdt.generateIndex([1, 2], [1, 5])).toEqual([1, 3, 5]);
//   });

//   it('6. 정수부가 음수일 경우, [-2] [-1]', () => {
//     expect(crdt.generateIndex([-2], [-1])).toEqual([-1, 5]);
//   });

//   it('7. 정수부가 음수이면서 소수부가 두 자리 수 이상일 경우, [-1, 2, 4] [-1, 2, 2]', () => {
//     expect(crdt.generateIndex([-1, 2, 4], [-1, 2, 2])).toEqual([-1, 2, 3]);
//   });

//   it('8. [1, 2, 3] [1, 2, 4] => [1, 2, 3, 5]', () => {
//     expect(crdt.generateIndex([1, 2, 3], [1, 2, 4])).toEqual([1, 2, 3, 5]);
//   });
// });

describe('searchIndex() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
    crdt.localInsert(0, 'A');
    crdt.localInsert(1, 'B');
    crdt.localInsert(2, 'C');
  });

  it('1. remoteInsert된 Char의 인덱스가 기존 struct 사이에 존재하는 경우', () => {
    expect(crdt.searchInsertIndex(new Char([0, 5], '123', 'D'))).toEqual(1);
  });
  it('2. crdt struct 인덱스를 초과하는 Char 입력 (맨 뒤에 입력)', () => {
    expect(crdt.searchInsertIndex(new Char([9999, 5, 5], '123', 'D'))).toEqual(
      3
    );
  });
  it('3. crdt struct 인덱스를 초과하는 Char 입력 (맨 앞에 입력)', () => {
    expect(crdt.searchInsertIndex(new Char([-1, 5, 5], '123', 'D'))).toEqual(0);
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

  it('1. remoteInsert된 Char의 인덱스가 기존 struct 사이에 존재하는 경우', () => {
    crdt.remoteInsert(new Char([0, 5], '123', 'D'), doc);
    expect(crdt.toString()).toEqual('ADBC');
  });
  it('2. remoteInsert : 맨 앞에 입력받는 경우', () => {
    crdt.remoteInsert(new Char([-1, 5], '123', 'D'), doc);
    expect(crdt.toString()).toEqual('DABC');
  });
  it('3. remoteInsert : 맨 뒤에 입력받는 경우', () => {
    crdt.remoteInsert(new Char([9999, 5], '123', 'D'), doc);
    expect(crdt.toString()).toEqual('ABCD');
  });
  it('4. remoteInsert : 오류 케이스 1', () => {
    crdt.struct = [];
    crdt.remoteInsert((new Char([0,7,4,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,6,7,3,3,2,7,3,1,5,3,1,1,3,2,5,9,4,6,8,2,2,7,6,2,4,8,9,3,1,8,8,4,7,6,5,6,2,5],'abc','s')), doc);
    crdt.remoteInsert((new Char([0,7,5],'abc','m')), doc);
    crdt.remoteInsert((new Char([0,7,4,9,9,9,9,9,9,9,9,5,8,3,6,6,6,3,6,5,7,6,5,5,6,6,2,9,7,3,4,1,1,3,8,1,2,4,4,6,5,9,4,2,3,8,2,8,1,2,5],'abc','e')), doc);

    expect(crdt.toString()).toEqual('esm');
  });
});

// describe('remoteDelete() Test:', () => {
//   let crdt: CRDT;
//   beforeEach(() => {
//     crdt = new CRDT();
//     crdt.localInsert(0, 'A');
//     crdt.localInsert(1, 'B');
//     crdt.localInsert(2, 'C');
//   });

//   it('1. remoteDelete 로 있는 글자를 삭제하는 경우', () => {
//     crdt.remoteDelete(crdt.struct[0]);
//     expect(crdt.toString()).toEqual('BC');
//   });
//   it('2. remoteDelete 로 없는 글자를 삭제하는 경우', () => {
//     crdt.remoteDelete(new Char([999, 5], '123', 'D'));
//     expect(crdt.toString()).toEqual('ABC');
//   });
// });

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

describe('convertIndexToNumber() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
  });

  it('1. convertIndexToNumber', () => {
    expect(crdt.convertIndexToNumber(new Char([0,7,4,9,9,9,9,9,9,9,9,5,8,3,6,6,6,3,6,5,7,6,5,5,6,6,2,9,7,3,4,1,1,3,8,1,2,4,4,6,5,9,4,2,3,8,2,8,1,2,5],'abc','a'))).toEqual(0.74999999995836663657655662973411381244659423828125);
  });
});