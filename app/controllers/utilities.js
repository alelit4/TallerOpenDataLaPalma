/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('underscore');

var Pto = require('../models/puntos');
var Comentario = require('../models/comentarios');

/* Vistas */
exports.index = function(req, res) {
  res.render('home');
};

exports.mapa = function(req, res) {
    res.render('mapa');

};

/* Puntos */
exports.addMarker = function (req, res){
    Pto.findOne({nombre: req.body.nombre}, function(err, punto) {
        if ((punto !== null) && (punto !== undefined) && (punto !== '')){
            res.send("Error");
        } else {
            var ptoNuevo = new Pto({nombre: req.body.nombre,  geo: [req.body.lon, req.body.lat]});
            ptoNuevo.save();
            res.send(ptoNuevo.id);
        }
    });
}

exports.allPoints = function (req, res){
    Pto.find({}, function(err, punto) {
        if ((punto !== null) && (punto !== undefined) && (punto !== '')){
            res.json(punto);
        } else {
            res.send("Error");
        }
    });
};

/* Comentarios */
exports.addComment = function (req, res){
    console.log(req.body.idPoint);
    var comentarioNuevo = new Comentario({nombre: req.body.nombre, comentario: req.body.comentario, idPoint: req.body.idPoint});
    comentarioNuevo.save();
    res.send(comentarioNuevo._id);

};

exports.getCommment = function (req, res) {
    console.log("Entramose idPoint is");
    console.log(req.params.id);
    Comentario.find({idPoint: req.params.id}, function(err, comentario) {
        if ((comentario !== null) && (comentario !== undefined) && (comentario !== '')){
            res.send(comentario);
        } else {
            res.send("Error");
        }
    });
};

exports.allComments = function (req, res){
    Comentario.find({}, function(err, comentario) {
        if ((comentario !== null) && (comentario !== undefined) && (comentario !== '')){
            res.json(comentario);
        } else {
            res.send("Error");
        }
    });
}