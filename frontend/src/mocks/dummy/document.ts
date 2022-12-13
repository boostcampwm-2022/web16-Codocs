import { v1 as uuidv1 } from 'uuid';

const createDocumentId = () => {
  return {
    id: uuidv1(),
    title: Math.random().toFixed(4).slice(2).toString(),
    lastVisited: '2022-12-01',
    role: 'owner',
    createdAt: '2022-11-11'
  };
};

export default createDocumentId;
