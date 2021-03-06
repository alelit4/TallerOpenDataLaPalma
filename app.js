// Init Page of Dephisit
//Load app dependencies
var express = require('express'),  
  mongoose = require('mongoose'), 
  path = require('path'),  
  http = require('http'),
  util = require('util'),
  request = require('request');

var flash 	 = require('connect-flash');
var passport = require('passport');

var Pto = require('./app/models/puntos');
var BBDD = require('./app/controllers/utilities');


var app = express();

//Configure: bodyParser to parse JSON data
//           methodOverride to implement custom HTTP methods  
//           router to crete custom routes

app.configure(function(){  
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(flash());
  app.use( express.cookieParser() );
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(app.router);

});  
  
app.configure('development', function(){  
  app.use(express.errorHandler());
    app.use(function(req, res, next){
        res.locals.user = req.session.user;
        next();
    });
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST","PUT","DELETE");
    next();

});


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

  
//Sample routes are in a separate module, just for keep the code clean  
routes = require('./routes/router')(app);  


//Connect to the MongoDB test database  
mongoose.connect('mongodb://localhost/demo_db');
  
//Start the server  
http.createServer(app).listen(3000);

console.log("Lanzado en puerto 3000...");

function loadData(urlParam){
  var url = urlParam;
  if (url === null){
    url = "http://www.opendatalapalma.es/datasets/b01599127c534a3ea4a29b9febae3389_0.geojson";
  }

  request({
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          // JSON is 'body'
          var farmacias = body.features;

          for (var i=0; i<farmacias.length; i++){
            BBDD.addPoint(farmacias[i].properties.Titular, // nombre
                          farmacias[i].geometry.coordinates[0], // latitud
                          farmacias[i].geometry.coordinates[1]); // longitud
          }
          console.log("Open Data Loaded!");
      }
  });
}

loadData(null);



