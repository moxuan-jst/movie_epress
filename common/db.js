// 数据库操作
var mongoose = require('mongoose');
var url = mongoose.connect('mongodb://localhost/movieService');
mongoose.connect(url);
// 连接数据库
module.exports = mongoose;