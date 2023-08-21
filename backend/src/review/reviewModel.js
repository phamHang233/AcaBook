
const mongoose = require("mongoose")
const Schema = mongoose.Schema
var reviewSchema = new Schema({

    order_id: {
        type: String,
        require: true
    },

    product_id: {
        type: String,
        require: true
    },
    review_id: {
        type: String,
        require: true
    },
    review_score: {
        type: Number,
        require: true
    },
    review_creation_date: {
        type: Date,
        require: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "employees",
        require: true
    },
    review_content: {
        type: String,
        require: true
    },

})
module.exports = mongoose.model('reviews', reviewSchema)