import * as express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import axios from 'axios';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (client: any) => {
  client.on('joinroom', (room, username) => {
    client.join(room);
    client.username = username;
    client.to(room).emit('new-user', username);
  });
  client.on('update-title', (newTitle) => {
    const roomName = Array.from(client.rooms)[1];
    client.to(roomName).emit('new-title', newTitle);
  });
  client.on('local-insert', async (data) => {
    const roomName = Array.from(client.rooms)[1];
    // crdts[roomName].saveInsert(data);
    try {
      await axios.post(`http://localhost:8000/document/${roomName}/save-content`, {
        content: data
      });
      client.to(roomName).emit('remote-insert', data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  });
  client.on('local-delete', async (data) => {
    const roomName = Array.from(client.rooms)[1];
    //console.log('ROOMNAME : ', roomName);
    // crdts[roomName].saveDelete(data); // saveDelete 없다
    try {
      await axios.post(`http://localhost:8000/document/${roomName}/update-content`, {
        content: data
      });
      client.to(roomName).emit('remote-delete', data);
    } catch (e) {
      console.log(e);
    }
  });

  client.on('cursor-moved', (data) => {
    const id = client.id;
    const { cursorPosition, profile } = data;
    const roomName = Array.from(client.rooms)[1];
    client.to(roomName).emit('remote-cursor', {
      id,
      cursorPosition,
      profile
    });
  });

  client.on('client-out', () => {
    const id = client.id;
    const roomName = Array.from(client.rooms)[1];
    console.log('client-out');
    client.to(roomName).emit('delete-cursor', {
      id
    });
  });

  client.on('disconnect', () => {
    console.log('Socket disconnected');
    const id = client.id;
    const roomName = Array.from(client.rooms)[1];
    //console.log(roomName);
    client.to(roomName).emit('delete-cursor', {
      id
    });
  });
});

app.set('port', 8100);

httpServer.listen(app.get('port'), function () {
  console.log('Running on : ', 8100);
});
