/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('underscore');

var Pto = require('../models/puntos');
var Comentario = require('../models/comentarios');

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





exports.addComment = function (req, res){

    var comentarioNuevo = new Comentario({nombre: req.body.nombre,comentario: req.body.comentario, idPoint: req.body.idPoint});
    ptoNuevo.save();
    res.send("200");

}


exports.allComments = function (req, res){

    Comentario.find({}, function(err, comentario) {
        if ((comentario !== null) && (comentario !== undefined) && (comentario !== '')){
            res.json(comentario);
        }
        else {
            res.send("Error");
        }

    });
}