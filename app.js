// This is the entry point for your add-on, creating and configuring
// your add-on HTTP server

// [Express](http://expressjs.com/) is your friend -- it's the underlying
// web framework that `atlassian-connect-express` uses
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
// You need to load `atlassian-connect-express` to use her godly powers
var ac = require('atlassian-connect-express');
// Static expiry middleware to help serve static resources efficiently
process.env.PWD = process.env.PWD || process.cwd(); // Fix expiry on Windows :(
var expiry = require('static-expiry');
// We use [Handlebars](http://handlebarsjs.com/) as our view engine
// via [express-hbs](https://npmjs.org/package/express-hbs)
var hbs = require('express-hbs');
// We also need a few stock Node modules
var http = require('http');
var path = require('path');
var os = require('os');


// Anything in ./public is served up as static content
var staticDir = path.join(__dirname, 'public');
// Anything in ./views are HBS templates
var viewsDir = __dirname + '/views';
// Your routes live here; this is the C in MVC
var routes = require('./routes');
// Bootstrap Express
var app = express();
// Bootstrap the `atlassian-connect-express` library
var addon = ac(app);
// You can set this in `config.json`
var port = addon.config.port();
// Declares the environment to use in `config.json`
var devEnv = app.get('env') == 'development';

// The following settings applies to all environments
app.set('port', port);

// Configure the Handlebars view engine
app.engine('hbs', hbs.express3({partialsDir: viewsDir}));
app.set('view engine', 'hbs');
app.set('views', viewsDir);

// Declare any Express [middleware](http://expressjs.com/api.html#middleware) you'd like to use here
// Log requests, using an appropriate formatter by env
app.use(morgan(devEnv ? 'dev' : 'combined'));
// Include request parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// Gzip responses when appropriate
app.use(compression());

// You need to instantiate the `atlassian-connect-express` middleware in order to get its goodness for free
app.use(addon.middleware());
// Enable static resource fingerprinting for far future expires caching in production
app.use(expiry(app, {dir: staticDir, debug: devEnv}));
// Add an hbs helper to fingerprint static resource urls
hbs.registerHelper('furl', function(url){ return app.locals.furl(url); });
// Mount the static resource dir
app.use(express.static(staticDir));

// Show nicer errors when in dev mode
if (devEnv) app.use(errorHandler());

// Wire up your routes using the express and `atlassian-connect-express` objects
routes(app, addon);








var https = require('https');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('public-key.pem')
};



// Boot the damn thing
http.createServer(app).listen(port, function(){
  console.log('Add-on server running at http://' + os.hostname() + ':' + port);
  // Enables auto registration/de-registration of add-ons into a host in dev mode
  if (devEnv) addon.register();
});

// Boot the damn thing
/*https.createServer(options, app).listen(443, function(){
  console.log('Add-on server running at http://' + os.hostname() + ':' + port);
  // Enables auto registration/de-registration of add-ons into a host in dev mode
  if (devEnv) addon.register();
});*/
