#!/usr/bin/env node
require('dotenv').config();

const app = require('./app');
const debug = require('debug')('server:server');
const http = require('http');
const chalk = require('chalk');

const port = normalizePort(process.env.HOST_PORT || 3001);
app.set('port', port);

const server = http.createServer(app);

server.listen(port, (req, res) => {
  console.log(chalk.bgGreen.black(" READY ") + " Server listening on port " + port);
});

server.on('error', onError);

function normalizePort(val) {
  let port = parseInt(val, 10);
  return port || false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.log(chalk.bold.yellow('port ' + port + ' requires elevated privileges'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(chalk.bold.yellow('port ' + port + ' is already in use'));
      process.exit(1);
      break;
    default:
      throw error;
  }
}
