var express = require('express'),
    reload = require('express-reload'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    logger = require('morgan');

var indexRouter = require('./routes/index');
var dishesRouter = require('./routes/dishes');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (!isProduction) {
  app.use(errorhandler());
}

app.use('/', indexRouter);
app.use('/dishes', dishesRouter);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

module.exports = app;
