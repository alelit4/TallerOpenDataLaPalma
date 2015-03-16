//App routes  
module.exports = function (app) {

    var user = require('../app/controllers/user');
    var utilities = require('../app/controllers/utilities');
    var signals = require('../app/controllers/signals');
    var passport = require('passport');
    /* Home Page */
    app.get('/', utilities.index);

    // Signals
    app.get('/signals', signals.index);


    //petición get para acceder a la página de login
    app.get('/login', utilities.index);
    //petición post para hacer el login
    app.post('/login', user.authenticate);
    //petición post para registrar un usuario
    app.post('/signup', user.signup);

    app.post('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/register', utilities.login);

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

}