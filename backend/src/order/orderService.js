const orderModel = require('./orderModel')
module.exports.getDataFromDBService = () => {
    return new Promise((resolve, reject) => {
        orderModel.find({})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });
};

module.exports.createOrderDBService = (orderDetails) => {
    return new Promise((resolve, reject) => {
        var orderModelData = new orderModel()
        orderModelData.product_id = orderDetails.product_id
        orderModelData.order_purchase_timestamp = orderDetails.order_purchase_timestamp
        orderModelData.price = orderDetails.price
        orderModelData.product_category_name = orderDetails.product_category_name
        orderModelData.customer_id = orderDetails.customer_id


        orderModelData.save().then(result => {
            console.log("Lưu dữ liệu thành công!")
            resolve(result);
        })
            .catch(error => {
                console.log("Lưu dữ liệu thất bại!", error)

                reject(false);
            });
    })
}