import Char from './char';
import { CRDT } from './crdt';
import CodeMirror from 'codemirror';

describe('searchInsertIndex() Test:', () => {
  let crdt: CRDT;
  beforeEach(() => {
    crdt = new CRDT();
    crdt.charMap = { ...crdt.charMap, ['uuid0']: new Char('HEAD', 'TAIL', 'siteID', 'A', 'uuid0') };

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
    crdt.remoteInsert(
      [
        new Char(C.id, 'E_id', 'siteId', 'D', 'D_id'),
        new Char('D_id', 'F_id', 'siteId', 'E', 'E_id'),
        new Char('E_id', crdt.tail.id, 'siteId', 'F', 'F_id')
      ],
      editor
    );
    expect(crdt.toString()).toEqual('ABCDEF');
  });
  it('5. remoteInsert : 여러 개 사이에 입력하는 경우', () => {
    crdt.remoteInsert(
      [
        new Char(A.id, 'E_id', 'siteId', 'D', 'D_id'),
        new Char('D_id', 'F_id', 'siteId', 'E', 'E_id'),
        new Char('E_id', B.id, 'siteId', 'F', 'F_id')
      ],
      editor
    );
    expect(crdt.toString()).toEqual('ADEFBC');
  });
  it('6. remoteInsert : 여러 개 맨 앞에 입력하는 경우', () => {
    crdt.remoteInsert(
      [
        new Char(crdt.head.id, 'E_id', '123', 'D', 'D_id'),
        new Char('D_id', 'F_id', '123', 'E', 'E_id'),
        new Char('D_id', A.id, '123', 'F', 'F_id')
      ],
      editor
    );
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
  let doc: CodeMirror.Editor;

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
describe('sync document test', () => {
  let crdt: CRDT;

  beforeEach(() => {
    crdt = new CRDT();
  });
  it('sample data', () => {
    const data = `[
      {
          "id": "HEAD",
          "leftId": "START",
          "rightId": "c3a33996-6df0-438f-998c-c2a7afb28de4",
          "siteId": "",
          "value": ""
      },
      {
          "id": "c3a33996-6df0-438f-998c-c2a7afb28de4",
          "leftId": "HEAD",
          "rightId": "fb91ca2f-d298-4e75-9ce8-0cc5398f11c6",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "1",
          "tombstone": false
      },
      {
          "id": "fb91ca2f-d298-4e75-9ce8-0cc5398f11c6",
          "leftId": "c3a33996-6df0-438f-998c-c2a7afb28de4",
          "rightId": "3b8bc555-8692-4829-be70-25e18eaa6f6c",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "또",
          "tombstone": false
      },
      {
          "id": "3b8bc555-8692-4829-be70-25e18eaa6f6c",
          "leftId": "fb91ca2f-d298-4e75-9ce8-0cc5398f11c6",
          "rightId": "216e8490-efe9-45bf-86e1-099591361b27",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": " ",
          "tombstone": false
      },
      {
          "id": "216e8490-efe9-45bf-86e1-099591361b27",
          "leftId": "3b8bc555-8692-4829-be70-25e18eaa6f6c",
          "rightId": "2e996f15-31a8-466c-a83a-d374969c45b9",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "잘",
          "tombstone": false
      },
      {
          "id": "2e996f15-31a8-466c-a83a-d374969c45b9",
          "leftId": "216e8490-efe9-45bf-86e1-099591361b27",
          "rightId": "d995a442-107b-4622-aeed-83cb54dbd19e",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "1",
          "tombstone": false
      },
      {
          "id": "d995a442-107b-4622-aeed-83cb54dbd19e",
          "leftId": "2e996f15-31a8-466c-a83a-d374969c45b9",
          "rightId": "9ac56280-9d1e-4376-a961-7c110603dd53",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "1",
          "tombstone": false
      },
      {
          "id": "9ac56280-9d1e-4376-a961-7c110603dd53",
          "leftId": "d995a442-107b-4622-aeed-83cb54dbd19e",
          "rightId": "c1b9087b-35e1-4659-97f5-0f83d7d43def",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "되",
          "tombstone": false
      },
      {
          "id": "c1b9087b-35e1-4659-97f5-0f83d7d43def",
          "leftId": "9ac56280-9d1e-4376-a961-7c110603dd53",
          "rightId": "b44a0543-da61-4c41-bca3-a8f78cf1dc70",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "네",
          "tombstone": false
      },
      {
          "id": "b44a0543-da61-4c41-bca3-a8f78cf1dc70",
          "leftId": "c1b9087b-35e1-4659-97f5-0f83d7d43def",
          "rightId": "ebe17050-2b68-4416-af49-5e263e03f6ec",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": " ",
          "tombstone": false
      },
      {
          "id": "ebe17050-2b68-4416-af49-5e263e03f6ec",
          "leftId": "b44a0543-da61-4c41-bca3-a8f78cf1dc70",
          "rightId": "1c2a0002-85aa-4073-acdf-b1e04aef040f",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "h",
          "tombstone": false
      },
      {
          "id": "1c2a0002-85aa-4073-acdf-b1e04aef040f",
          "leftId": "ebe17050-2b68-4416-af49-5e263e03f6ec",
          "rightId": "2d7c00e1-5e79-44d4-992c-c44c9954c840",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "i",
          "tombstone": false
      },
      {
          "id": "2d7c00e1-5e79-44d4-992c-c44c9954c840",
          "leftId": "1c2a0002-85aa-4073-acdf-b1e04aef040f",
          "rightId": "782dea3a-84ce-498d-96a6-b224378d2dcd",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "~",
          "tombstone": false
      },
      {
          "id": "782dea3a-84ce-498d-96a6-b224378d2dcd",
          "leftId": "2d7c00e1-5e79-44d4-992c-c44c9954c840",
          "rightId": "c08f22c4-3479-497d-9ca5-fceacbb70289",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": " ",
          "tombstone": false
      },
      {
          "id": "c08f22c4-3479-497d-9ca5-fceacbb70289",
          "leftId": "782dea3a-84ce-498d-96a6-b224378d2dcd",
          "rightId": "8cc6c2f8-4977-4263-b3f2-88f5de7c5225",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㅁ",
          "tombstone": false
      },
      {
          "id": "8cc6c2f8-4977-4263-b3f2-88f5de7c5225",
          "leftId": "c08f22c4-3479-497d-9ca5-fceacbb70289",
          "rightId": "3abf43a1-c4b4-408e-b797-19431f5c3afb",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㄴ",
          "tombstone": false
      },
      {
          "id": "3abf43a1-c4b4-408e-b797-19431f5c3afb",
          "leftId": "8cc6c2f8-4977-4263-b3f2-88f5de7c5225",
          "rightId": "474970d3-647f-479a-a069-c4ad2e0cf021",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㅇ",
          "tombstone": false
      },
      {
          "id": "474970d3-647f-479a-a069-c4ad2e0cf021",
          "leftId": "3abf43a1-c4b4-408e-b797-19431f5c3afb",
          "rightId": "4a82e04b-0ae5-4913-b292-dd3a8ca9cdb9",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": " ",
          "tombstone": false
      },
      {
          "id": "4a82e04b-0ae5-4913-b292-dd3a8ca9cdb9",
          "leftId": "474970d3-647f-479a-a069-c4ad2e0cf021",
          "rightId": "87269079-a23e-4ac6-92e4-cccd9f61234f",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㅁ",
          "tombstone": false
      },
      {
          "id": "87269079-a23e-4ac6-92e4-cccd9f61234f",
          "leftId": "4a82e04b-0ae5-4913-b292-dd3a8ca9cdb9",
          "rightId": "61ecb04d-1ab6-4e19-afc9-22b4f6e652d5",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㄴ",
          "tombstone": false
      },
      {
          "id": "61ecb04d-1ab6-4e19-afc9-22b4f6e652d5",
          "leftId": "87269079-a23e-4ac6-92e4-cccd9f61234f",
          "rightId": "6d756ae4-233d-4e93-a47c-269c52b843ed",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㅇ",
          "tombstone": false
      },
      {
          "id": "6d756ae4-233d-4e93-a47c-269c52b843ed",
          "leftId": "61ecb04d-1ab6-4e19-afc9-22b4f6e652d5",
          "rightId": "42004e72-c0ae-419b-b126-25595e98da80",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㅂ",
          "tombstone": false
      },
      {
          "id": "42004e72-c0ae-419b-b126-25595e98da80",
          "leftId": "6d756ae4-233d-4e93-a47c-269c52b843ed",
          "rightId": "c7d8e8fc-0e1c-4405-84b1-29f1fdccdd13",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㅈ",
          "tombstone": false
      },
      {
          "id": "c7d8e8fc-0e1c-4405-84b1-29f1fdccdd13",
          "leftId": "42004e72-c0ae-419b-b126-25595e98da80",
          "rightId": "3deb04e5-49f9-45dc-a65a-4396e1598fc7",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": " ",
          "tombstone": false
      },
      {
          "id": "3deb04e5-49f9-45dc-a65a-4396e1598fc7",
          "leftId": "c7d8e8fc-0e1c-4405-84b1-29f1fdccdd13",
          "rightId": "204fe7b6-97aa-425f-8a15-604279a23487",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": false
      },
      {
          "id": "204fe7b6-97aa-425f-8a15-604279a23487",
          "leftId": "3deb04e5-49f9-45dc-a65a-4396e1598fc7",
          "rightId": "7cac0ef0-80f3-4ec0-8586-fb3a95da235d",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "1",
          "tombstone": false
      },
      {
          "id": "7cac0ef0-80f3-4ec0-8586-fb3a95da235d",
          "leftId": "204fe7b6-97aa-425f-8a15-604279a23487",
          "rightId": "546edd57-71c8-4f53-bab6-9af3017a767d",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "4",
          "tombstone": false
      },
      {
          "id": "546edd57-71c8-4f53-bab6-9af3017a767d",
          "leftId": "7cac0ef0-80f3-4ec0-8586-fb3a95da235d",
          "rightId": "a39e4424-cdc3-496f-a32b-2c817501a936",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": " ",
          "tombstone": false
      },
      {
          "id": "a39e4424-cdc3-496f-a32b-2c817501a936",
          "leftId": "546edd57-71c8-4f53-bab6-9af3017a767d",
          "rightId": "439db2e2-e84c-4bc2-ad09-2e6621c72d87",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": false
      },
      {
          "id": "439db2e2-e84c-4bc2-ad09-2e6621c72d87",
          "leftId": "a39e4424-cdc3-496f-a32b-2c817501a936",
          "rightId": "9cd57864-c83b-461e-acd5-e0a26ac4066c",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㄱ",
          "tombstone": false
      },
      {
          "id": "9cd57864-c83b-461e-acd5-e0a26ac4066c",
          "leftId": "439db2e2-e84c-4bc2-ad09-2e6621c72d87",
          "rightId": "49057f6f-5863-4bda-b542-52e5f1d3fda4",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": false
      },
      {
          "id": "49057f6f-5863-4bda-b542-52e5f1d3fda4",
          "leftId": "9cd57864-c83b-461e-acd5-e0a26ac4066c",
          "rightId": "33fcef97-dd3b-4573-ba1c-6156f4490317",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": " ",
          "tombstone": false
      },
      {
          "id": "33fcef97-dd3b-4573-ba1c-6156f4490317",
          "leftId": "49057f6f-5863-4bda-b542-52e5f1d3fda4",
          "rightId": "16410a1c-abeb-4b60-8cd3-efcde0b00a25",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": false
      },
      {
          "id": "16410a1c-abeb-4b60-8cd3-efcde0b00a25",
          "leftId": "33fcef97-dd3b-4573-ba1c-6156f4490317",
          "rightId": "9a0c85ef-6b56-4ecf-a032-10b833d39f6f",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㄱ",
          "tombstone": false
      },
      {
          "id": "9a0c85ef-6b56-4ecf-a032-10b833d39f6f",
          "leftId": "16410a1c-abeb-4b60-8cd3-efcde0b00a25",
          "rightId": "da6b15a4-7fbc-4331-a7b7-c00362d2e84a",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": false
      },
      {
          "id": "da6b15a4-7fbc-4331-a7b7-c00362d2e84a",
          "leftId": "9a0c85ef-6b56-4ecf-a032-10b833d39f6f",
          "rightId": "98829ddf-cdd6-41ee-b311-9fe11202ccdf",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㄱ",
          "tombstone": false
      },
      {
          "id": "98829ddf-cdd6-41ee-b311-9fe11202ccdf",
          "leftId": "da6b15a4-7fbc-4331-a7b7-c00362d2e84a",
          "rightId": "c3150fa1-d8dc-4872-9b4e-a4a0c535b0d5",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": false
      },
      {
          "id": "c3150fa1-d8dc-4872-9b4e-a4a0c535b0d5",
          "leftId": "98829ddf-cdd6-41ee-b311-9fe11202ccdf",
          "rightId": "c88f5743-e91a-4cf4-bc2a-2efa27ce2034",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㅁ",
          "tombstone": false
      },
      {
          "id": "c88f5743-e91a-4cf4-bc2a-2efa27ce2034",
          "leftId": "c3150fa1-d8dc-4872-9b4e-a4a0c535b0d5",
          "rightId": "5f229ef3-b541-4928-88e7-9aa242bdc1fc",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": " ",
          "tombstone": false
      },
      {
          "id": "5f229ef3-b541-4928-88e7-9aa242bdc1fc",
          "leftId": "c88f5743-e91a-4cf4-bc2a-2efa27ce2034",
          "rightId": "129c81cf-ee6b-46a2-85db-8ea5283b5dcd",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "된",
          "tombstone": true
      },
      {
          "id": "129c81cf-ee6b-46a2-85db-8ea5283b5dcd",
          "leftId": "5f229ef3-b541-4928-88e7-9aa242bdc1fc",
          "rightId": "da615101-0a1e-40c7-8bce-4eba9ffe7173",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "되",
          "tombstone": true
      },
      {
          "id": "da615101-0a1e-40c7-8bce-4eba9ffe7173",
          "leftId": "129c81cf-ee6b-46a2-85db-8ea5283b5dcd",
          "rightId": "1b3079be-c12c-4bf9-973d-f6065153068e",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "도",
          "tombstone": true
      },
      {
          "id": "1b3079be-c12c-4bf9-973d-f6065153068e",
          "leftId": "da615101-0a1e-40c7-8bce-4eba9ffe7173",
          "rightId": "e9f2f63c-ed1e-4512-880f-8ee8a80d051e",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㄷ",
          "tombstone": true
      },
      {
          "id": "e9f2f63c-ed1e-4512-880f-8ee8a80d051e",
          "leftId": "1b3079be-c12c-4bf9-973d-f6065153068e",
          "rightId": "17229702-8f2c-4c65-af98-058f833cad9f",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "자",
          "tombstone": true
      },
      {
          "id": "17229702-8f2c-4c65-af98-058f833cad9f",
          "leftId": "e9f2f63c-ed1e-4512-880f-8ee8a80d051e",
          "rightId": "f70753d1-6ef5-43bc-973d-b5b9aef8f2f2",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㅈ",
          "tombstone": true
      },
      {
          "id": "f70753d1-6ef5-43bc-973d-b5b9aef8f2f2",
          "leftId": "17229702-8f2c-4c65-af98-058f833cad9f",
          "rightId": "1d2ac97c-ec94-4b63-ae27-8fa72ab46d70",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㄸ",
          "tombstone": true
      },
      {
          "id": "1d2ac97c-ec94-4b63-ae27-8fa72ab46d70",
          "leftId": "f70753d1-6ef5-43bc-973d-b5b9aef8f2f2",
          "rightId": "400565df-7c44-406a-8589-cb3f3970df07",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "1",
          "tombstone": true
      },
      {
          "id": "400565df-7c44-406a-8589-cb3f3970df07",
          "leftId": "1d2ac97c-ec94-4b63-ae27-8fa72ab46d70",
          "rightId": "55cb3aea-3b13-4a46-8a4e-1380aaecdad1",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": true
      },
      {
          "id": "55cb3aea-3b13-4a46-8a4e-1380aaecdad1",
          "leftId": "400565df-7c44-406a-8589-cb3f3970df07",
          "rightId": "cf1fb676-ec50-41ee-8457-cc21f6ac83de",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "에",
          "tombstone": true
      },
      {
          "id": "cf1fb676-ec50-41ee-8457-cc21f6ac83de",
          "leftId": "55cb3aea-3b13-4a46-8a4e-1380aaecdad1",
          "rightId": "fc35a80f-3f9b-4a61-9201-1915206b3824",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "3",
          "tombstone": true
      },
      {
          "id": "fc35a80f-3f9b-4a61-9201-1915206b3824",
          "leftId": "cf1fb676-ec50-41ee-8457-cc21f6ac83de",
          "rightId": "16a05dfc-f6e1-4a60-91ad-19244eff7fc9",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": " ",
          "tombstone": true
      },
      {
          "id": "16a05dfc-f6e1-4a60-91ad-19244eff7fc9",
          "leftId": "fc35a80f-3f9b-4a61-9201-1915206b3824",
          "rightId": "a70e1dd9-2fda-4db4-b28e-723881e4c2c2",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": true
      },
      {
          "id": "a70e1dd9-2fda-4db4-b28e-723881e4c2c2",
          "leftId": "16a05dfc-f6e1-4a60-91ad-19244eff7fc9",
          "rightId": "c35c34bb-b8ad-4b0e-84d8-78ebdd7679c9",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": true
      },
      {
          "id": "c35c34bb-b8ad-4b0e-84d8-78ebdd7679c9",
          "leftId": "a70e1dd9-2fda-4db4-b28e-723881e4c2c2",
          "rightId": "1f5ca022-25c3-4569-a3f0-e6fabf7d77fd",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "2",
          "tombstone": true
      },
      {
          "id": "1f5ca022-25c3-4569-a3f0-e6fabf7d77fd",
          "leftId": "c35c34bb-b8ad-4b0e-84d8-78ebdd7679c9",
          "rightId": "f493df82-776a-44c9-a987-e71fd4823bd9",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "러",
          "tombstone": true
      },
      {
          "id": "f493df82-776a-44c9-a987-e71fd4823bd9",
          "leftId": "1f5ca022-25c3-4569-a3f0-e6fabf7d77fd",
          "rightId": "0ed60ff6-9bd7-495f-9a9a-e806ae93893b",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "4",
          "tombstone": true
      },
      {
          "id": "0ed60ff6-9bd7-495f-9a9a-e806ae93893b",
          "leftId": "f493df82-776a-44c9-a987-e71fd4823bd9",
          "rightId": "9df5d940-cfc3-431b-82c6-3a562d91b014",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "엘",
          "tombstone": true
      },
      {
          "id": "9df5d940-cfc3-431b-82c6-3a562d91b014",
          "leftId": "0ed60ff6-9bd7-495f-9a9a-e806ae93893b",
          "rightId": "d112a1c0-7abd-4405-a6d5-f0f323c46818",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "에",
          "tombstone": true
      },
      {
          "id": "d112a1c0-7abd-4405-a6d5-f0f323c46818",
          "leftId": "9df5d940-cfc3-431b-82c6-3a562d91b014",
          "rightId": "08536cfc-aaeb-4814-aaae-6048fa07bf52",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "ㅇ",
          "tombstone": true
      },
      {
          "id": "08536cfc-aaeb-4814-aaae-6048fa07bf52",
          "leftId": "d112a1c0-7abd-4405-a6d5-f0f323c46818",
          "rightId": "TAIL",
          "siteId": "ef922c2f-9671-4ec4-848d-29c17bf0d144",
          "value": "d",
          "tombstone": true
      }
  ]`;
    crdt.syncDocument(JSON.parse(data));
    // console.log(JSON.parse(data));
    crdt.getAllNode();
    expect(crdt.toString()).toEqual('또 잘되네?');
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
