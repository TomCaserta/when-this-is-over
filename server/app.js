const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();
const routes = require('./routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

module.exports = app;
