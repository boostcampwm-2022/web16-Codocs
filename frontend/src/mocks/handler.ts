import { rest } from 'msw';
import createDocumentList from './dummy/docList';
import createDocumentId from './dummy/document';
import createUserProfile from './dummy/userProfile';

interface generateEnumObj {
  [key : string] : (counts: number) => DocListItem[] | UserProfile[] | string;
}

const generateFunc: generateEnumObj = {
  'docList' : createDocumentList,
  'document': createDocumentId, 
  'userProfile' : createUserProfile,
};

const generateDummy = (target: string, counts = 1) => {
  return generateFunc[target](counts);
};

export const handler = [
  rest.get('/user-document/recent', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(generateDummy('docList', 30)));
  }),
  rest.post('/document', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(generateDummy('document')));
  }),
  rest.get('/user/profile', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(generateDummy('userProfile')[0]));
  }),
];
