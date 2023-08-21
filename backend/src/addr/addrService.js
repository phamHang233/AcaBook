const addrModel = require('./addrModel')
module.exports.getDataFromDBService = (userID) => {
    return new Promise((resolve, reject) => {
        addrModel.findOne({ userID: userID })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });
};
module.exports.updateAddrDBService = (userID, addrDetails) => {
    return new Promise((resolve, reject) => {
        console.log(userID, addrDetails)
        addrModel.findOneAndUpdate(
            { userID: userID },
            { $set: addrDetails },
            { new: true } // Trả về tài liệu đã được cập nhật
        )
            .then(result => {
                if (result === null) {
                    console.log("Không tìm thấy tài liệu để cập nhật");
                } else {
                    console.log("Lưu dữ liệu thành công");
                    resolve(result);
                }
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật dữ liệu:", error);
                reject(false);
            })
    })
};

module.exports.createUserDBService = (addrDetails) => {
    return new Promise((resolve, reject) => {
        var addrModelData = new addrModel()
        addrModelData.userID = addrDetails.userID

        addrModelData.userName = addrDetails.userName
        addrModelData.phone = addrDetails.phone
        addrModelData.province = addrDetails.province
        addrModelData.district = addrDetails.district
        addrModelData.guild = addrDetails.guild
        addrModelData.home = addrDetails.home

        addrModelData.save().then(result => {
            console.log("Lưu dữ liệu thành công!")
            resolve(result);
        })
            .catch(error => {
                console.log("Lưu dữ liệu thất bại!")

                reject(false);
            });
    })
}
