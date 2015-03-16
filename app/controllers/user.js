
var User = require('../../app/models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var CryptoJS = require("crypto-js");

passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            User.findOne({username: username},function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != CryptoJS.SHA3(password).toString(CryptoJS.enc.Hex)) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
));

//función que se encarga de la autenticación mediante usuario y ontraseña
exports.authenticate = passport.authenticate('local',
    { failureRedirect: '/register',
        failureFlash: 'Login Error',
        successRedirect: '/search',
        successFlash: 'Login ok'})

//función que se encarga del registro de usuarios mediante usuario y contraseña
exports.signup = function (req, res){

    User.findOne({username: req.body.username}, function(err, user) {
        if ((user !== null) && (user !== undefined) && (user !== '')){
            res.send(user);
        } else {
            /*
             los password se almacenan en la base de datos mediante la función sha3 y conviertiendo luego el hash
             en un string hexadecimal */
            var pass = CryptoJS.SHA3(req.body.password).toString(CryptoJS.enc.Hex);
            console.log(pass);
            var UserNew = new User({ username: req.body.username, password: pass});
            UserNew.save();
            res.send(UserNew._id);
        }
    });
}

