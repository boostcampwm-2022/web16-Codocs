import * as express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { CRDT } from './crdt-linear-server/crdt';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const crdts = {};
// 클라이언트 목록, 룸 목록 관리

io.on('connection', (client) => {
  client.on('joinroom', (room) => {
    if (!crdts.hasOwnProperty(room)) {
      crdts[room] = new CRDT();
    }
    client.emit('new-user', crdts[room].getStruct());
    client.join(room);
  });
  client.on('update-title', (newTitle) => {
    const roomName = Array.from(client.rooms)[1];
    client.to(roomName).emit('new-title', newTitle);
  });
  client.on('local-insert', (data) => {
    const roomName = Array.from(client.rooms)[1];
    crdts[roomName].saveInsert(data);
    client.to(roomName).emit('remote-insert', data);
  });
  client.on('local-delete', (data) => {
    const roomName = Array.from(client.rooms)[1];
    crdts[roomName].saveDeleteRange(data);
    client.to(roomName).emit('remote-delete', data);
  });
  client.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

app.set('port', 8100);

httpServer.listen(app.get('port'), function () {
  console.log('Running on : ', 8100);
});
