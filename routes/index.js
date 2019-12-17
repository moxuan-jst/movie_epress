// 所有路由配置

var express = require('express');

// 路由引入
var router = express.Router();

// 数据库引入
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 定义路由
router.get('/mongooseTest', function(req, res, next){
  // 连接数据库
  mongoose.connect('mongodb://localhost/pets', {useMongoClient: true});
  mongoose.Promise = global.Promise;

  // 初始化新数据集
  var Cat = mongoose.model('Cat', {name: String});
  // 创建数据
  var tom = new Cat({name: 'Tom'});
  // 保存数据
  tom.save(function(e){
    if(e){
      console.log(e)
    }else{
      console.log('success insert')
    }
  });
  // 向前台发送信号
  res.send('数据库连接成功！')

})

module.exports = router;
