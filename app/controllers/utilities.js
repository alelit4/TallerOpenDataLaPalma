/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('underscore');


/* Home View */
exports.index = function(req, res) {
  res.render('home');
  console.log(req.isAuthenticated());
};

/* Login View */
exports.login = function(req, res) {
    if(req.isAuthenticated()){
        res.render('logout');
    }
    else{  res.render('login');}

};

