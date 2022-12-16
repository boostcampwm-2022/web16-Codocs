import socketIOClient, { io, Socket } from 'socket.io-client';
const { REACT_APP_SOCKET_URL } = process.env;

const socket = io(REACT_APP_SOCKET_URL!, {
  path: '/socket/socket',
});

export default socket;
