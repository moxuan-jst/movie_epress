// 数据库操作
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movieService', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// 连接数据库
module.exports = mongoose;