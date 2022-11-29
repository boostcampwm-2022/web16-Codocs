import { rest } from 'msw';

const docList: DocListItem[] = [{id:'1234',
  title: '알고리즘 스터디 기록',
  lastVisited: '2022-11-10',
  role: 'onwer',  
}, {id:'5678',
  title: 'Untitled',
  lastVisited: '2022-11-19',
  role: 'edit'
}];

export const handler = [
  rest.get('/document/main', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(docList));
  }),
];