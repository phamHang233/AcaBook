var addrService = require('./addrService')
var getDataControllerfn = async (req, res) => {
    var userID = req.params.userID;
    var addr = await addrService.getDataFromDBService(userID);
    res.send(addr)

}

const updateAddrControllerfn = async (req, res) => {


    const id = req.params.userID;

    addrService.updateAddrDBService(id, req.body)

        .then(result => {
            res.send({ 'status': true, "message": "Cap nhat địa chỉ thanh cong " })
        })
        .catch(error => {
            res.send({ 'status': false, "message": "Cap nhat địa chỉ that bai " })
            console.log("fail")
        })
}

var createAddrControllerfn = async (req, res) => {
    var status = await addrService.createUserDBService(req.body);

    if (status) {
        res.send({ 'status': true, "message": "Tao moi địa chỉ thanh cong " })
        console.log("OK")
    }
    else res.send({ 'status': false, "message": "Tao moi địa chỉ that bai " })
}
module.exports = { createAddrControllerfn, getDataControllerfn, updateAddrControllerfn }