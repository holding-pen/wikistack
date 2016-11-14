var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var db = require('./models/index.js');

var app = express();

nunjucks.configure('views'); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

app.use(morgan('dev'));








db.User.sync({})
.then(function () {
    return db.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3001');
    })
})
.catch(console.error);