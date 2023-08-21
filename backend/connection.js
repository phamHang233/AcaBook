var mongoose = require('mongoose');
var express = require('express');
var server = express();
var routes = require('./routes/routes.js');
const cors = require('cors');

// connect to mongo
mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Kết nối thành công đến MongoDB");
    })
    .catch((error) => {
        console.log("Lỗi kết nối", error);
    });
server.use(cors());
server.use(express.json());
server.use(routes);
// Thêm một bước trung gian cors() trước khi gọi routes


server.listen(8000, function (error) {
    if (error) {
        console.log("Lỗi kết nối ", error);
    } else {
        console.log('Kết nối thành công');
    }
});
