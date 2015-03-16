// Signal Class
// Para tener precargados los puntos conflictivos
var mongoose = require('mongoose'),  
    Schema = mongoose.Schema;  
  
var signalSchema = new Schema({
    idtiposignal: String, // Punto negro, stop, cruce
    fechainicio: Date, 
    fechafin: Date,
    valida: Boolean,
    geo: {type: [Number], index: '2d'},
    sentido: { type: Number, default: 0 },
    pertenencia:  String
});  
  
  
//Export the schema  
module.exports = mongoose.model('Signal', signalSchema); 