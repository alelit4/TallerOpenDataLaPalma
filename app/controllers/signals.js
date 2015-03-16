/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('underscore');

/* Views Responce */
exports.index = function (req, res) {
    if (req.isAuthenticated()){
        res.render('signals');
    }else{
        res.render('home');
    }

};

