/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('underscore');

var Pto = require('../models/puntos');

/* Home View */
exports.index = function(req, res) {
  res.render('home');
};

exports.mapa = function(req, res) {
    res.render('mapa');

};

exports.addMarker = function (req, res){

    Pto.findOne({nombre: req.body.nombre}, function(err, punto) {
        if ((punto !== null) && (punto !== undefined) && (punto !== '')){
            res.send("Error");
        } else {
            var ptoNuevo = new Pto({nombre: req.body.nombre,  geo: [req.body.lon, req.body.lat]});
            ptoNuevo.save();
            res.render(mapa);
        }
    });
}


exports.allPoints = function (req, res){

    Pto.find({}, function(err, punto) {
        if ((punto !== null) && (punto !== undefined) && (punto !== '')){
            res.json(punto);
        }
        else {
            res.send("Error");
        }

    });
}