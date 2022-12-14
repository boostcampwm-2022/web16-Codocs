import socketIOClient from 'socket.io-client';
const { REACT_APP_NODE_ENV } = process.env;

let requestDomain = 'http://localhost:8100';
if (REACT_APP_NODE_ENV === 'production') {
  requestDomain = 'http://codocs.site/socket';
}
const socket = socketIOClient(requestDomain);

export default socket;
