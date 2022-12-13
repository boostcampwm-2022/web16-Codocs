import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://codocs.site/socket');

export default socket;
