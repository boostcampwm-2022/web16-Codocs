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
  // rest.get('/user-document/shared', (req, res, ctx) => {
  //   // TODO: 공유된 문서만 반환하도록 수정 
  //   const sharedDocList = dummyDocList.filter(doc => doc.shared === true && doc.isDeleted === false);
  //   return res(ctx.status(200), ctx.json(sharedDocList));
  // }),
  // rest.get('/bookmark', (req, res, ctx) => {
  //   // TODO: 북마크된 문서만 반환하도록 수정
  //   const bookmarkDocList = dummyDocList.filter(doc => doc.bookmark === true && doc.isDeleted === false); 
  //   return res(ctx.status(200), ctx.json(bookmarkDocList));
  // }),
  // rest.post('/bookmark/:id', (req, res, ctx) => {
  //   dummyDocList.some(doc => {
  //     if (doc.id === req.params.id) {
  //       doc.bookmark = true;
  //       return true;
  //     }
  //     return false;
  //   });
  //   return res(ctx.status(200));
  // }),
  rest.get('/document/:id', (req, res, ctx) => {
    const [ targetDocument ] = dummyDocList.filter(doc => doc.id === req.params.id);
    return res(ctx.status(200), ctx.json(
      {...targetDocument,
      content: charMap }
    ));
  }),
  // rest.delete('/document/:id', (req, res, ctx) => {
  //   dummyDocList.some(doc => {
  //     if (doc.id === req.params.id) {
  //       doc.isDeleted = true;
  //       return true;
  //     }
  //     return false;
  //   });
  //   return res(ctx.status(200));
  // }),
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
