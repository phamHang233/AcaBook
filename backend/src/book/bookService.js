const bookModel = require('./bookModel')
module.exports.getDataFromDBService = () => {
    return new Promise((resolve, reject) => {
        bookModel.find({})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });
};
module.exports.getBooksByName = (search_key) => {
    return new Promise((resolve, reject) => {
        bookModel.find({ bookName: { $regex: search_key, $options: 'i' } })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });
};
module.exports.getBookByID = (id) => {
    return new Promise((resolve, reject) => {
        bookModel.findById(id)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(false);
            })
    })
}
module.exports.deleteBookDBService = (id) => {
    return new Promise((resolve, reject) => {
        bookModel.findByIdAndRemove(id, { useFindAndModify: false })
            .then(result => {
                resolve(result)
                console.log("ok")
            })
            .catch(error => {
                reject(false);
                console.log("fail")
            })
    })
}
module.exports.updateBookDBService = (id, bookDetails) => {
    return new Promise((resolve, reject) => {
        bookModel.findByIdAndUpdate(id, bookDetails, { useFindAndModify: false })
            .then(result => {
                resolve(result)
                console.log("lưu DL thành công")
            })
            .catch(error => {
                reject(false);
            })
    })
}

module.exports.createBookDBService = (bookDetails) => {
    return new Promise((resolve, reject) => {
        var bookModelData = new bookModel()
        bookModelData.bookName = bookDetails.bookName
        bookModelData.category = bookDetails.category
        bookModelData.star = bookDetails.star
        bookModelData.author = bookDetails.author
        bookModelData.dailyPrice = bookDetails.dailyPrice
        bookModelData.salePrice = bookDetails.salePrice
        bookModelData.description = bookDetails.description
        bookModelData.imagePath = bookDetails.imagePath

        bookModelData.save().then(result => {
            console.log("Lưu dữ liệu thành công!")
            resolve(result);
        })
            .catch(error => {
                console.log("Lưu dữ liệu thất bại!", error)

                reject(false);
            });
    })
}

