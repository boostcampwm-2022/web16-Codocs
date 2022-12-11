import Char from './char';
import { CRDT } from './crdt';
import CodeMirror from 'codemirror';

describe('searchInsertIndex() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
    crdt.charMap = {...crdt.charMap,
      ['uuid0']:new Char('HEAD', 'TAIL', 'siteID', 'A', 'uuid0')};
    
    //insert 함수 만들어야함
    crdt.charMap[crdt.charMap['uuid0'].leftId].rightId = 'uuid0';
    crdt.charMap[crdt.charMap['uuid0'].rightId].leftId = 'uuid0';
  });

  it('1. searchInsertIndex(0) : 맨 앞에 삽입하는 경우 ', () => {
    expect(crdt.searchInsertPosition(0)).toEqual([crdt.head, crdt.charMap[crdt.head.rightId]]);
  });

  it('2. searchInsertIndex(1) : 사이에 삽입하는 경우 ', () => { 
    expect(crdt.searchInsertPosition(1)).toEqual([crdt.charMap['uuid0'], crdt.tail]);
  });

  it('3. searchInsertIndex(2) : 맨 뒤에 삽입하는 경우 ', () => {
    expect(crdt.searchInsertPosition(2)).toEqual([crdt.charMap[crdt.tail.leftId], crdt.tail]);
  });
});

describe('localInsert() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
    crdt.localInsert(0, 'A');
    crdt.localInsert(1, 'B');
    crdt.localInsert(2, 'C');
  });
  
  it('1. localInsert(0, "H") 테스트 : 맨 앞에 삽입', () => {
    crdt.localInsert(0, 'H');
    expect(crdt.toString()).toEqual('HABC');
  });
  
  it('2. localInsert(3, "D") 테스트 : 맨 뒤에 삽입', () => {
    crdt.localInsert(3, 'D');
    expect(crdt.toString()).toEqual('ABCD');
  });
  
  it('3. localInsert(1, "F") 테스트 : 사이에 삽입', () => {
    crdt.localInsert(1, 'F');
    expect(crdt.toString()).toEqual('AFBC');
  });

  it('4. localInsertRange(1, "F") 테스트 : 여러 문자 한번에 사이에 삽입 ( Paste )', () => {
    crdt.localInsertRange(1, 'FSOMANYTEXTS');
    expect(crdt.toString()).toEqual('AFSOMANYTEXTSBC');
  });

  it('5. localInsertRange(1, "F") 테스트 : 여러 문자 한번에 맨 앞에 삽입 ( Paste )', () => {
    crdt.localInsertRange(0, 'FSOMANYTEXTS');
    expect(crdt.toString()).toEqual('FSOMANYTEXTSABC');
  });

  it('6. localInsertRange(1, "F") 테스트 : 여러 문자 한번에 맨 뒤에 삽입 ( Paste )', () => {
    crdt.localInsertRange(3, 'FSOMANYTEXTS');
    expect(crdt.toString()).toEqual('ABCFSOMANYTEXTS');
  });
});

describe('remoteInsert() Test:', () => { 
  let crdt: CRDT;
  let A: Char, B: Char, C: Char;
  let editor: CodeMirror.Editor;
  beforeEach(() => {
    crdt = new CRDT();
    A = crdt.localInsert(0, 'A');
    B = crdt.localInsert(1, 'B');
    C = crdt.localInsert(2, 'C');
  });

  it('1. remoteInsert : A랑 B 사이에 문자 하나가 삽입되는 경우', () => {
    crdt.remoteInsert([new Char(A.id, B.id, 'siteId', 'D')], editor);
    expect(crdt.toString()).toEqual('ADBC');
  });
  it('2. remoteInsert : 맨 앞에 문자 하나를 입력받는 경우', () => {
    crdt.remoteInsert([new Char(crdt.head.id, A.id, 'siteId', 'D')], editor);
    expect(crdt.toString()).toEqual('DABC');
  });
  it('3. remoteInsert : 맨 뒤에 문자 하나를 입력받는 경우', () => {
    crdt.remoteInsert([new Char(C.id, crdt.tail.id, 'siteId', 'D')], editor);
    expect(crdt.toString()).toEqual('ABCD');
  });
  it('4. remoteInsert : 여러 개를 맨 뒤에 입력하는 경우', () => {
    crdt.remoteInsert([new Char(C.id, 'E_id', 'siteId', 'D', 'D_id'), new Char('D_id', 'F_id', 'siteId', 'E', 'E_id'), new Char('E_id', crdt.tail.id, 'siteId', 'F', 'F_id')],  editor);
    expect(crdt.toString()).toEqual('ABCDEF');
  });
  it('5. remoteInsert : 여러 개 사이에 입력하는 경우', () => {
    crdt.remoteInsert([new Char(A.id, 'E_id', 'siteId', 'D', 'D_id'), new Char('D_id', 'F_id', 'siteId', 'E', 'E_id'), new Char('E_id', B.id, 'siteId', 'F', 'F_id')], editor);
    expect(crdt.toString()).toEqual('ADEFBC');
  });
  it('6. remoteInsert : 여러 개 맨 앞에 입력하는 경우', () => {
    crdt.remoteInsert([new Char(crdt.head.id, 'E_id', '123', 'D', 'D_id'), new Char('D_id', 'F_id', '123', 'E', 'E_id'), new Char('D_id', A.id, '123', 'F', 'F_id')], editor);
    expect(crdt.toString()).toEqual('DEFABC');
  });
  it('7. remoteInsert : localInsertRange 로 글자 사이에 입력', () => {
    crdt.remoteInsert(crdt.localInsertRange(1, 'DEF'), editor);
    expect(crdt.toString()).toEqual('ADEFBC');
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

  it('1. localDelete(0, 0) 테스트 : 삭제하지 않는 경우 ', () => {
    crdt.localDelete(0, 0);
    expect(crdt.toString()).toEqual('ABC');
  });
  it('2. localDelete(0, 1) 테스트 : 맨 앞 하나만 지우기', () => {
    crdt.localDelete(0, 1);
    expect(crdt.toString()).toEqual('BC');
  });
  it('3. localDelete(1, 2) 테스트 : 중간에 있는 글자 하나만 삭제', () => {
    crdt.localDelete(1, 2);
    expect(crdt.toString()).toEqual('AC');
  });
  it('4. localDelete(1, 3) 테스트 : BC 2개 삭제 ', () => {
    crdt.localDelete(1, 3);
    expect(crdt.toString()).toEqual('A');
  });
  it('5. localDelete(0, 3) 테스트 : 싹 다 지우기', () => {
    crdt.localDelete(0, 3);
    expect(crdt.toString()).toEqual('');
  });
});


describe('remoteDelete() Test:', () => {
  let crdt: CRDT;
  let A: Char, B: Char, C: Char;
  let doc: CodeMirror.Doc;

  beforeEach(() => {
    crdt = new CRDT();
    A = crdt.localInsert(0, 'A');
    B = crdt.localInsert(1, 'B');
    C = crdt.localInsert(2, 'C');
  });

  it('1. remoteDelete 테스트 : 맨 앞에 있는 글자 하나만 삭제  ', () => {
    expect(crdt.remoteDelete([A], doc)).toEqual([0, 1]);
    expect(crdt.toString()).toEqual('BC');
  });
  it('2. remoteDelete 테스트 : 다 지우기', () => {
    expect(crdt.remoteDelete([A, B, C], doc)).toEqual([0, 3]);
    expect(crdt.toString()).toEqual('');
  });
  it('3. remoteDelete 테스트 : 맨 뒤에 있는 글자 하나만 삭제', () => {
    expect(crdt.remoteDelete([C], doc)).toEqual([2, 3]);
    expect(crdt.toString()).toEqual('AB');
  });
});

/*
연결리스트 삽입

## 노드 A의 왼쪽에 노드 B를 삽입할 경우 (insertNode)
1. 노드 A의 left의 right가 노드 B를 가리키게 한다.
2. 노드 B의 left는 노드 A의 left를 가리킨다.
3. 노드 B의 right는 노드 A를 가리킨다.
4. 노드 A의 left는 노드 B를 가리킨다.
*/