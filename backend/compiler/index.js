import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World compiler server');
});

app.listen(8200);
