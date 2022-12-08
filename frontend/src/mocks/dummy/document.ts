import { v1 as uuidv1 } from 'uuid';

const createDocumentId = () => {
  return uuidv1();
};

export default createDocumentId;
