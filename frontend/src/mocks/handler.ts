import { rest } from 'msw';
import createDocumentList from './dummy/docList';
import createUserProfile from './dummy/userProfile';

interface generateEnumObj {
  [key : string] : (counts: number) => DocListItem[] | UserProfile[];
}

const generateFunc: generateEnumObj = {
  'docList' : createDocumentList,
  'userProfile' : createUserProfile,
};

const generateDummy = (target: string, counts: number) => {
  return generateFunc[target](counts);
};

export const handler = [
  rest.get('/document/main', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(generateDummy('docList', 30)));
  }),
  rest.get('/user/profile', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(generateDummy('userProfile', 1)[0]));
  })
];
