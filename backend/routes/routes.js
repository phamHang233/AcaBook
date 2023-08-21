const express = require('express')
const router = express.Router()
const userController = require('../src/user/userController')
const bookController = require('../src/book/bookController')
const addrController = require('../src/addr/addrController')
const orderController = require('../src/order/orderController')
const reviewController = require('../src/review/reviewController')


router.route('/user/getAll').get(userController.getDataControllerfn)
router.route('/user/create').post(userController.createUserControllerfn)
router.route('/user/login').post(userController.loginUserControllerfn)
router.route('/allBooks').get(bookController.getDataControllerfn)
router.route('/search/:bookName').get(bookController.getBooksByNameController);
router.route('/books/add').post(bookController.createBookControllerfn)

router.route('/books/update/:id').put(bookController.updateBookControllerfn)
router.route('/books/:id').get(bookController.getBookByIDController)
router.delete('/books/delete/:id', bookController.deleteBookController);

router.route('/addr/createAddr').post(addrController.createAddrControllerfn)

router.route('/addr/getAddr/:userID').get(addrController.getDataControllerfn)
router.route('/addr/update/:userID').put(addrController.updateAddrControllerfn)

router.route('/order/add').post(orderController.createOrderControllerfn)
router.route('/order').get(orderController.getDataControllerfn)

router.route('/review').get(reviewController.getDataControllerfn)
router.route('/review/:bookID').get(reviewController.getReviewByBookController)


module.exports = router;