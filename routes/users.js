/*
对于routes目录中的文件以文件名作为域名的二级路径。
项目默认会自动创建此文件。
*/ 

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
