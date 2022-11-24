import * as express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', client => {
  client.on('local-insert', data => { 
    client.broadcast.emit('remote-insert', data);  
  });
  client.on('local-delete', data => { 
    client.broadcast.emit('remote-delete', data);
  });
  client.on('disconnect', () => {
    console.log("Socket disconnected");
  });
});

app.set('port', 8100)

httpServer.listen(app.get('port'), function () {
  console.log('Running on : ', 8100);
});
