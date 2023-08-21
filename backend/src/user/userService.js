const userModel = require('./userModel')
module.exports.getDataFromDBService = () => {
    return new Promise((resolve, reject) => {
        userModel.find({})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });
};

module.exports.loginUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: userDetails.email })
            .then(result => {
                if (result != undefined && result != null) {

                    if (result.password == userDetails.password) {
                        resolve({ status: true, msg: result })
                    }
                    else {
                        console.log("sai mkhau")
                        reject({ status: false, msg: "Sai mật khẩu" })
                    }
                }
                else {
                    reject({ status: false, msg: "Người dùng không tồn tại" })
                }
            })
            .catch(errValue => {
                console.log(errValue)
                reject({ status: false, msg: "Invalid Data" })
            })
    })
}
module.exports.createUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        var userModelData = new userModel()
        userModelData.firstName = userDetails.firstName
        userModelData.lastName = userDetails.lastName
        userModelData.email = userDetails.email
        userModelData.password = userDetails.password
        userModelData.role = userDetails.role

        userModelData.save().then(result => {
            console.log("Lưu dữ liệu thành công!")
            resolve(result);
        })
            .catch(error => {
                console.log("Lưu dữ liệu thất bại!")

                reject(false);
            });
    })
}
