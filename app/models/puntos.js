var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PtoSchema = new Schema({
    nombre: String,
    geo: {type: [Number], index: '2d'}
});

//Export the schema
module.exports = mongoose.model('Pto', PtoSchema);
