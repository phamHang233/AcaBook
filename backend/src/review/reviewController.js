var reviewService = require('./reviewService')

var getDataControllerfn = async (req, res) => {
    var review = await reviewService.getDataFromDBService();
    res.send(review)

}
var getReviewByBookController = async (req, res) => {
    var bookID = req.params.bookID;
    var reviews = await reviewService.getReviewByBookService(bookID);
    res.send(reviews)

}
module.exports = { getDataControllerfn, getReviewByBookController }
