const exec = require('child_process').exec;
const path = require('path');

const api = exec('npm run start', {
  windowsHide: true,
  cwd: path.join(__dirname, './backend/api'),
});
const socket = exec('npm run start', {
  windowsHide: true,
  cwd: path.join(__dirname, './backend/socket'),
});
const compiler = exec('npm run start', {
  windowsHide: true,
  cwd: path.join(__dirname, './backend/socket'),
});
const frontend = exec('npm run start', {
  windowsHide: true,
  cwd: path.join(__dirname, './frontend'),
});

api.stdout.pipe(process.stdout);
api.stderr.pipe(process.stderr);
socket.stdout.pipe(process.stdout);
socket.stderr.pipe(process.stderr);
compiler.stdout.pipe(process.stdout);
compiler.stderr.pipe(process.stderr);
frontend.stdout.pipe(process.stdout);
frontend.stderr.pipe(process.stderr);
