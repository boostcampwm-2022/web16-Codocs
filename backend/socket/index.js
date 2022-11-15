import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World socket server');
});

app.listen(8100);
