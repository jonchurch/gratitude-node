var createError = require('http-errors'),
  express = require('express'),
  cookieParser = require('cookie-parser'),
  express = require("express"),
  logger = require('./logger/logger'),
  fs = require('fs'),
  path=require('path'),
  mongoose=require('mongoose'),
  


indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users'),
  postsRouter = require('./routes/posts');



// environment variables
process.env.NODE_ENV = 'development';
// uncomment below line to test this code against ystaging environment
// process.env.NODE_ENV = 'production';
// config variables
const config = require('./config/config.js');
var app = express();

//get connection from .env file
   mongoose.connect(`${global.gConfig.database}`, { useNewUrlParser: true });
  var db = mongoose.connection;
   logger.info("DB Running server on from port:::::::" + `${global.gConfig.db_port}`);
  mongoose.set('useFindAndModify', false);


// view engine setup
 app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(__dirname + '/public'));


//app route to upload avatar and other images


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
  const error=new Error("Not found");
  error.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  // log the error...
  res.status(err.status || 500);
  res.json({
      error:{
          message:error.message
      }

  });
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
// console.log(global.gConfig.mailjet_api_key);
app.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
});

module.exports = app;
