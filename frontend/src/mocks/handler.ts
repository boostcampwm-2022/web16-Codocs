import { rest } from 'msw';
import createDocumentList from './dummy/docList';
import createDocumentId from './dummy/document';
import createUserProfile from './dummy/userProfile';
import charMap from './dummy/charMap';

interface generateEnumObj {
  [key : string] : (counts: number) => DocListItem[] | UserProfile[] | DocListItem;
}

const generateFunc: generateEnumObj = {
  'docList' : createDocumentList,
  'newDocument': createDocumentId, 
  'userProfile' : createUserProfile,
};

const generateDummy = (target: string, counts = 1) => {
  return generateFunc[target](counts);
};

const dummyDocList = generateDummy('docList', 30) as DocListItem[];

export const handler = [
  rest.get('/user-document/recent', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyDocList));
  }),
  rest.get('/document/:id', (req, res, ctx) => {
    const [ targetDocument ] = dummyDocList.filter(doc => doc.id === req.params.id);
    return res(ctx.status(200), ctx.json(
      {...targetDocument,
      content: charMap }
    ));
  }),
  rest.post('/document', (req, res, ctx) => {
    const newDocument = generateDummy('newDocument') as DocListItem;
    dummyDocList.push(newDocument);
    return res(ctx.status(200), ctx.json(newDocument));
  }),
  rest.get('/user/profile', (req, res, ctx) => {
    const [ useProfile ] = generateDummy('userProfile') as UserProfile[];
    return res(ctx.status(200), ctx.json(useProfile));
  }),
];
