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
    expect(crdt.searchInsertIndex(0)).toEqual([crdt.head, crdt.charMap[crdt.head.rightId]]);
  });

  it('2. searchInsertIndex(1) : 사이에 삽입하는 경우 ', () => { 
    expect(crdt.searchInsertIndex(1)).toEqual([crdt.charMap['uuid0'], crdt.tail]);
  });

  it('3. searchInsertIndex(2) : 맨 뒤에 삽입하는 경우 ', () => {
    expect(crdt.searchInsertIndex(2)).toEqual([crdt.charMap[crdt.tail.leftId], crdt.tail]);
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


/*
연결리스트 삽입

## 노드 A의 왼쪽에 노드 B를 삽입할 경우 (insertNode)
1. 노드 A의 left의 right가 노드 B를 가리키게 한다.
2. 노드 B의 left는 노드 A의 left를 가리킨다.
3. 노드 B의 right는 노드 A를 가리킨다.
4. 노드 A의 left는 노드 B를 가리킨다.
*/