var orderService = require('./orderService')

var getDataControllerfn = async (req, res) => {
    var order = await orderService.getDataFromDBService();
    res.send(order)
    console.log("Gửi orders thành công")

}

const createOrderControllerfn = async (req, res) => {
    orderService.createOrderDBService(req.body)
        .then(result => {
            res.send({ 'status': true, "message": "Tao moi don hang thanh cong " })
            console.log("OK")
        })
        .catch(error => {
            res.send({ 'status': false, "message": "Tao moi don hang that bai " })

        })
}
module.exports = { createOrderControllerfn, getDataControllerfn }
