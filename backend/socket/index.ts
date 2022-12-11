import * as express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import axios from 'axios';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (client) => {
  client.on('joinroom', (room) => {
    client.join(room);
  });
  client.on('update-title', (newTitle) => {
    const roomName = Array.from(client.rooms)[1];
    client.to(roomName).emit('new-title', newTitle);
  });
  client.on('local-insert', (data) => {
    const roomName = Array.from(client.rooms)[1];
    // crdts[roomName].saveInsert(data);
    client.to(roomName).emit('remote-insert', data);
    try {
      axios.post(`http://localhost:8000/document/${roomName}/save-content`, {
        content: data
      });
    } catch (e) {
      console.log(e);
    }
  });
  client.on('local-delete', (data) => {
    const roomName = Array.from(client.rooms)[1];
    console.log('ROOMNAME : ', roomName);
    // crdts[roomName].saveDelete(data); // saveDelete 없다
    client.to(roomName).emit('remote-delete', data);
    try {
      axios.post(`http://localhost:8000/document/${roomName}/update-content`, {
        content: data
      });
    } catch (e) {
      console.log(e);
    }
  });

  client.on('cursor-moved', (data) => {
    const socketID = client.id;
    const { cursorPosition, profile } = data;
    const roomName = Array.from(client.rooms)[1];
    client.to(roomName).emit('remote-cursor', {
      socketID,
      cursorPosition,
      profile
    });
  });

  client.on('disconnect', () => {
    console.log('Socket disconnected');
    const socketID = client.id;
    const roomName = Array.from(client.rooms)[1];
    client.to(roomName).emit('delete-cursor', {
      socketID
    });
  });
});

app.set('port', 8100);

httpServer.listen(app.get('port'), function () {
  console.log('Running on : ', 8100);
});
