import socketIOClient from 'socket.io-client';
const { REACT_APP_SOCKET_URL } = process.env;

const socket = socketIOClient(REACT_APP_SOCKET_URL!);

export default socket;
