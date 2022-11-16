import * as express from 'express';

const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('🟢 Socket server!');
});

app.set('port', 8100);

app.listen(app.get('port'), () => console.log('Started server with ' + app.get('port')));
