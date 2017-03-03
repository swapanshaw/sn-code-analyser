
/**
 * Module dependencies
 */

const express = require('express');
const  bodyParser = require('body-parser');
  //errorHandler = require('error-handler'),
const morgan = require('morgan');
const index = require('./routes/index');
const api = require('./routes/api');
const http = require('http');
const path = require('path');
var sessions = require("client-sessions");
const app = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(morgan('dev'));

//body parser midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'bower_components')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  //app.use(express.errorHandler());
}


app.use(sessions({
    cookieName: 'session',
    secret: 'af*asdf+_)))==asdf afcmnoadfadf',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index.html page
app.use('/', index);
app.use('/api', api);

// redirect all others to the index (HTML5 history)
app.use('*', index);


/**
 * Start Server
 */

app.listen(app.get('port'), function () {
    console.log('server started at port' + app.get('port'));
});

