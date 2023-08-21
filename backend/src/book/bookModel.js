
const mongoose = require("mongoose")
const Schema = mongoose.Schema
var bookSchema = new Schema({
    bookName: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    star: {
        type: Number,
        require: false,
    },
    author: {
        type: String,
        require: true
    },
    dailyPrice: {
        type: Number,
        require: true
    },
    salePrice: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    imagePath: {
        type: String,
        require: true
    },

})
module.exports = mongoose.model('books', bookSchema)
