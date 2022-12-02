import socketIOClient from 'socket.io-client';

const socket = socketIOClient('ws://localhost:8100');

export default socket;
