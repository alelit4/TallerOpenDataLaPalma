var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
});

//Export the schema
module.exports = mongoose.model('User', userSchema);
