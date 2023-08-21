const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Tao Schema va Model
const PersonSchema = new Schema({
    name: String,
    age: Number,
    weight: Number,

});
const PersonChar = mongoose.model('personchar', PersonSchema)
module.exports = PersonChar