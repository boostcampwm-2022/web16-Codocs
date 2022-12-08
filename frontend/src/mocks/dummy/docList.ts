import { v1 as uuidv1 } from 'uuid';

interface roleEnumObj {
  [key : number] : string,
}

const roleEnumMock: roleEnumObj = {
  1: 'view',
  2: 'edit',
  3: 'onwer',
};

const createDocumentList = (counts: number): DocListItem[] => {
  return Array(counts).fill(null).map(_ => { 
    return {
      id: uuidv1(),
      title: Math.random().toFixed(4).slice(2).toString(),
      lastVisited: '2022-12-01',
      role: roleEnumMock[Math.floor((Math.random() * 3 + 1))],
    };
  });
};

export default createDocumentList;
