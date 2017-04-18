var express 	 = require('express');
var app 		 = express();
var bodyParser   = require('body-parser');
var path         = require('path');
var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport     = require('passport');
var db  		 = require('./config/initializers/database.js');
var middleware   = require('./config/initializers/middleware.js');

/***************Mongodb configuratrion********************/
db.connectMongoDB();
// create application/json parser 
app.use(bodyParser.json());
// pass passport for configuration
require('./config/initializers/passport')(passport);
// read cookies (needed for auth)
app.use(cookieParser());
app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());
// use connect-flash for flash messages stored in session
app.use(flash());
 //load our routes and pass in our app and fully configured passport
require('./config/routes.js')(app,passport);
//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
// error hndlers
app.use(middleware.pageNotFound);
app.use(middleware.internalServerError);
app.use(middleware.requestTimeOut);
module.exports = app;