var bookService = require('./bookService')

var getDataControllerfn = async (req, res) => {
    var book = await bookService.getDataFromDBService();
    res.send(book)

}

const getBooksByNameController = async (req, res) => {
    var search_key = req.params.bookName;
    var filteredBooks = await bookService.getBooksByName(search_key);
    res.send(filteredBooks);
};

const getBookByIDController = async (req, res) => {
    var id = req.params.id;
    bookService.getBookByID(id).then(result => {
        res.send(result)
    })
        .catch(error => {
            res.send(error)
        })

}

const createBookControllerfn = async (req, res) => {

    bookService.createBookDBService(req.body)
        .then(result => {
            res.send({ 'status': true, "message": "Tao moi san pham thanh cong " })
            console.log("OK")
        })
        .catch(error => {
            res.send({ 'status': false, "message": "Tao moi san pham that bai " })

        })
}
const updateBookControllerfn = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    console.log(req.body)

    bookService.updateBookDBService(id, req.body)

        .then(result => {
            res.send({ 'status': true, "message": "Cap nhat san pham thanh cong " })
        })
        .catch(error => {
            res.send({ 'status': false, "message": "Cap nhat san pham that bai " })
            console.log("fail")
        })
}
const deleteBookController = async (req, res) => {
    var id = req.params.id;
    console.log(id)
    bookService.deleteBookDBService(id)
        .then(result => {
            res.send({ 'status': true, "message": "Xóa san pham thanh cong " })
            console.log("OK")
        })
        .catch(error => {
            res.send({ 'status': false, "message": "Xoa san pham that bai " })

        })
}
module.exports = { deleteBookController, getBookByIDController, updateBookControllerfn, getDataControllerfn, createBookControllerfn, getBooksByNameController }
