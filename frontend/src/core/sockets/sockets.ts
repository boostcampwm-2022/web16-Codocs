import socketIOClient, { Socket } from 'socket.io-client';
const { REACT_APP_SOCKET_URL } = process.env;

const socket = socketIOClient(REACT_APP_SOCKET_URL!, { transports: ['polling'] });
socket.on('connect_error', () => window.location.reload());
socket.on('connect_failed', () => window.location.reload());

export default socket;
