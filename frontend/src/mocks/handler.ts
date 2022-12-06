import { rest } from 'msw';
import createDocumentList from './dummy/docList';

interface generateEnumObj {
  [key : string] : (counts: number) => DocListItem[];
}

const generateFunc: generateEnumObj = {
  'docList' : createDocumentList,
};

const generateDummy = (target: string, counts: number) => {
  return generateFunc[target](counts);
};


export const handler = [
  rest.get('/document/main', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(generateDummy('docList', 30)));
  }),
];
