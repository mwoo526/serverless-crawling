const express = require('express');
const { scheduler } = require('./schedule/scheduler');
const app = global.app =express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('port', port);

require('./route');
scheduler();


app.listen(app.get('port'),() => {
    console.log(`Eatable Running on port ${port}`);
}).on('error', err => {
    console.log(err);
});