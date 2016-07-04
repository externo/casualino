'use strict';

var ip = 'localhost';
var port = 2999;

var express = require('express'); //middleware
var jwt = require('jsonwebtoken'); // all JWT functions
var morgan = require('morgan'); //log server functions to console
var bodyParser = require('body-parser'); //get values from HTTP requests

//App settings
var app = express();
var http = require('http');
var httpServer = http.createServer(app);

app.use(morgan('dev')); // Log server operations to console. Has to be before routing functions....
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, Key, filename, Metadata, header");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  //res.setHeader("Access-Control-Allow-Origin", 'http://localhost:63342');
  res.setHeader("Access-Control-Allow-Origin", 'http://casualino.kataraga.com');
  //res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Routing
app.get('/', function (req, res) {
  res.send('Hello World!!!!');
});

app.post('/login', function (req, res) {

  if (req.body.email === 'office@casualino.com' && req.body.password === 'awesome') {

    // create a token
    var token = jwt.sign({testing: true}, tokenSecret, {
      expiresIn: '15m' // expires in minutes
    });

    // return the information including token as JSON
    res.json({
      email: "office@casualino.com",
      token: token
    });
  } else {
    console.log(req.body);
    res.status(401).send('Wrong credentials!');
  }
});

app.post('/reset', function (req, res) {

  if (req.body.email == 'office@casualino.com' && req.body.pass == 'awesome') {

    // create a token
    var token = jwt.sign({testing: true}, tokenSecret, {
      expiresIn: '15m' // expires in minutes
    });

    // return the information including token as JSON
    res.json({
      email: "office@casualino.com",
      token: token
    });
  } else if (req.body.email !== 'office@casualino.com') {
    console.log(req.body);
    res.status(401).send('Your e-mail is not office@casualino.com !');
  } else if (req.body.pass !== 'awesome') {
    console.log(req.body);
    res.status(401).send('Your password is wrong !');
  } else {
    console.log(req.body);
    res.status(401).send('You can reset your password !');
  }
});


/*********************************
 Step 2 - Getting a JWT
 *********************************/

var tokenSecret = 'apann49fn8apwounq9384fnpawiuefn';
var protectedRoutes = express.Router(); //middleware for protected routes - an instance of an express router inside of an express app.

/*********************************
 Step 3 - Create Protected Routes and Verify JWT
 *********************************/

protectedRoutes.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, tokenSecret, function (err, decoded) {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    console.log(req.body);
    return res.status(401).send('Access Denied. Invalid Credentials');
  }
});

// These routes are RELATIVE to /protected
protectedRoutes.get('/', function (req, res) {
  res.send('Welcome to the protected route! You have a valid JWT');
});

// apply the routes to our application with the prefix /api
app.use('/protected', protectedRoutes);

//Server
httpServer.listen(port, ip);