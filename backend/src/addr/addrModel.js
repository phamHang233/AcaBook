
const mongoose = require("mongoose")
const Schema = mongoose.Schema
var addrSchema = new Schema({

    userID: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    province: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    guild: {
        type: String,
        require: true
    },
    home: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('userAddr', addrSchema)