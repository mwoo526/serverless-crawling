const serverless = require('serverless-http');
const express = require('express');
const { scheduler } = require('./schedule/scheduler');
const app = global.app =express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

require('./route');
scheduler();

module.exports.handler = serverless(app);
