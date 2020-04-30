const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const omdbRouter = require('./routes/omdb');
const cors = require('cors');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Express Middlewares
// Rest call goes through waterfall of functions. Pipeline.

app.use(cors());
app.use(logger('dev')); // logs response
app.use(express.json()); // parses the request body
app.use(express.urlencoded({ extended: false })); // parse the url of the request
app.use(cookieParser()); // parse the cookie
app.use(express.static(path.join(__dirname, 'public'))); // Static hosting

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/omdb', omdbRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
