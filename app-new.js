var createError = require('http-errors'),
  express = require('express'),
  cookieParser = require('cookie-parser'),
  express = require("express"),
  logger = require('./logger/logger'),
  dbPort = 27017, 
  fs = require('fs'),
  path=require('path'),
  mongoose=require('mongoose'),
  indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users'),
  postsRouter = require('./routes/posts');

var app = express();


fs.readFile('dbConfig.txt', function (err, data) {
  if (err) {
     console.log("err: "+err);
     logger.error("Error starting db on port:::::::" + dbPort);

  }
  /*console.log("Asynchronous read: " + data.toString());*/
  mongoose.connect(data.toString(), { useNewUrlParser: true });
  var db = mongoose.connection;
  logger.info("DB Running server on from port:::::::" + dbPort);
  
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(__dirname + '/public'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.enable('etag'); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // log the error...
  res.sendStatus(err.httpStatusCode).json(err)
})

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
