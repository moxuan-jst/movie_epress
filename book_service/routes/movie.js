// 后台管理admin， 添加新的电影

var express = require('express');
var router = express.Router();
var movie = require('../models/movie');
var article = require('../models/article');
var recommend = require('../models/recommend');


// 添加新电影
router.get('/list', function(req, res, next){
    var movieName = req.body.movieName;
    var movieImg = req.body.movieImg;
    var movieDownload = req.body.movieDownload;

    if(!movieName){
        res.json({status: 1, message: "电影名称为空"});
    }
    if(!movieImg){
        res.json({status: 1, message: "电影图片为空"});
    }
    if(!movieDownload){
        res.json({status: 1, message: "电影下载地址为空"});
    }

    movie.findAll(function(e, getRecommend){
        res.json({status: 0, meg: "电影列表", data: getRecommend})
    });


});


module.exports = router;