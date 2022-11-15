import * as express from 'express';

const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('🟢 Compiler server!');
});

app.set('port', 8200);

app.listen(app.get('port'), () => console.log('Started server with ' + app.get('port')));
