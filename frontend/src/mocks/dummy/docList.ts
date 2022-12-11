import { v1 as uuidv1 } from 'uuid';

interface roleEnumObj {
  [key: number]: string;
}

const roleEnumMock: roleEnumObj = {
  1: 'view',
  2: 'edit',
  3: 'onwer'
};

const getRandomDate = () => {
  const date = new Date().getTime();
  return new Date(date - Math.floor(Math.random() * 10000000000 ));
};

const createDocumentList = (counts: number): DocListItem[] => {
  return Array(counts)
    .fill(null)
    .map((_) => {
      return {
        id: uuidv1(),
        title: Math.random().toFixed(4).slice(2).toString(),
        lastVisited: new Date(getRandomDate()).getTime().toString(),
        role: roleEnumMock[Math.floor(Math.random() * 3 + 1)],
        createdAt: new Date(getRandomDate()).getTime().toString()
      };
    });
};

export default createDocumentList;
