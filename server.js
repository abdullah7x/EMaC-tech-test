const server = require('express')();
const apiRouter = require('./routes/api');

server.use('/api', apiRouter);

server.use((req, res, next) => {
  res.status(404).send({ message: 'End point not found' });
});

server.use((err, req, res, next) => {
  res.status(500).send({ message: 'internal sever error' });
});

module.exports = server;
