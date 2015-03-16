var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ComentarioSchema = new Schema({
    nombre: String,
    comentario: String,
    idPoint: String
});

//Export the schema
module.exports = mongoose.model('Comentario', ComentarioSchema);
