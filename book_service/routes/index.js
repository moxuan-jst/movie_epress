// 所有路由配置

var express = require('express');

// 路由引入
var router = express.Router();

// 数据库引入
var mongoose = require('mongoose');

var recommend = require('../models/recommend')
var movie = require('../models/movie')
var article = require('../models/article')
var user = require('../models/users')


/* GET home page. */
// 主页
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 数据库测试
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

});

// 显示主页的推荐大图等
router.get('/showIndex', function(req, res, next){
  recommend.findAll(function(e, getRecommend){
    res.json({status: 0, meg: "获取推荐", data: getRecommend})
  });
});

// 显示所有排行榜，也就是对于电影字段index的样式
router.get('/showRanking', function(req, res, next){
  movie.find({movieMainPage: true}, function(e, getMovies){
    res.json({status: 1, meg: "获取主页", data: getMovies})
  })
});

// 显示文章列表
router.get('/showArticle', function(req, res, next){
  article.findAll(function(e, getArticles){
    res.json({status: 0, meg: "获取文章列表", data: getArticles})
  })
});

// 显示文章的内容
router.post('/articleDetail', function(req, res, next){
  var article_id = req.body.article_id;
  if(!article_id){
    res.json({status: 1, meg: "文章id出错"})
  }
  article.findByArticleId(article_id, function(e, getArticles){
    res.json({status: 0, meg: "获取成功", data: getArticles})
  })
});

// 显示用户个人信息的内容
router.post('/showUser', function(req, res, next){
  var user_id = req.body.user_id;
  if(!user_id){
    res.json({status: 1, meg: "用户状态错误"})
  }
  user.findById(user_id, function(e, getUser){
    if(e){
      res.json({status: 1, meg: "获取失败", data: e})
    }else{
      res.json({status: 0, meg: "获取成功", data: {
        user_id: getUser.id,
        username: getUser.username,
        userPhone: getUser.userPhone,
        userMail: getUser.userMail,
        UserStop: getUser.userStop
      }})
    }
  })
});

module.exports = router;
