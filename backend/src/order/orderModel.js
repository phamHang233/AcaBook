
const mongoose = require("mongoose")
const Schema = mongoose.Schema
var orderSchema = new Schema({

    product_id: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },
    product_category_name: {
        type: String,
        require: true
    },
    customer_id: {
        type: String,
        require: true
    },
    order_purchase_timestamp: {
        type: Date,
        require: true
    }
})
module.exports = mongoose.model('orders', orderSchema)