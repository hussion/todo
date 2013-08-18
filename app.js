
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();
// mongodb
require('./db');

var routes = require('./routes');
var user = require('./routes/user');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('todo'));
app.use(express.session());
app.use(function(req, res, next) {
    var url = req.originalUrl;
    if (url != '/login' && url != '/reg' && !req.session.username)
        return res.redirect('/login');
    next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.errorHandler({ dumpExceptions : true, showStack : true }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.list);
app.get('/login', user.login);
app.post('/login', user.doLogin);
app.get('/reg', user.reg);
app.post('/reg', user.doReg);
app.post('/add', routes.add);
app.get('/edit/:id', routes.edit);
app.post('/update', routes.update);
app.get('/del/:id', routes.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
