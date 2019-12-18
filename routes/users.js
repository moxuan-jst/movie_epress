/*
对于routes目录中的文件以文件名作为域名的二级路径。
项目默认会自动创建此文件。
*/ 
var express = require('express');
var router = express.Router();
var user = require('../models/users');
// 用于加密
var crypto = require('crypto');
var movie = require('../models/movie');
var mail = require('../models/mail');
var comment = require('../models/comment');

const init_token = 'TKL02o';

/* GET users listing. */
// 用户登录接口
router.post('/login', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  if(!username){
    res.json({ status: 1, meg: "用户名为空"}) 
  }
  if(!password){
    res.json({ status: 1, meg: "密码为空"})
  }

  user.findUserLogin(username, password, function(e, userSave){
    if(userSave.length != 0){
      // 通过MD5查看密码
      // console.log(typeof(String(userSave[0]._id)))  // Object
      var token_after = getMD5password(userSave[0]._id)
      res.json({status: 1, data: {token: token_after, user: userSave},meg: "用户登录成功"}) // user: userSave
    }else{
      res.json({status: 1, meg: "用户名或密码错误"})
    }
  })
});

// 用户注册接口
router.post('/register', function(req, res, next){
  // 验证完整性, 只是简单的判断其是否为空，其他判断需要自己添加
  var username = req.body.username;
  var password = req.body.password;
  var userMail = req.body.userMail;
  var userPhone = req.body.userPhone;
  if(!username){
    res.json({ status: 1, meg: "用户名为空"}) 
  }
  if(!password){
    res.json({ status: 1, meg: "密码为空"})
  }
  if(!userMail){
    res.json({ status: 1, meg: "用户邮箱为空"})
  }
  if(!userPhone){
    res.json({ status: 1, meg: "用户手机号为空"})
  }
  user.findByUsername(username, function(e, userSave){
    if(userSave.length != 0){
      // 返回错误信息
      res.json({status: 1, meg: "用户已注册"})
    }else{
      var registerUser = new user({
        username: username,
        password: password,
        userMail: userMail,
        userPhone: userPhone,
        userAdmin: 0,
        userPower: 0,
        userStop: 0
      })
      registerUser.save(function () {  
        res.json({ status: 0, meg: "注册成功"})
      })
    }
  })
});

// 提交评论
router.post('/postComment', function(req, res, next){

});

// 点赞
router.post('/support', function(req, res, next){

});

// 找回密码
router.post('/findPassword', function(req, res, next){
  // 需要输入用的邮箱信息和手机信息，同时可以更新密码
  // 这里需要两个返回情况，一个是 req.body.repassword 存在时，另一个是 repassword 不存在时
  // 这个接口同时用于密码重置，需要用户登录
  var id = req.body.user_id;
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;
  var userMail = req.body.userMail;
  var userPhone = req.body.userPhone;
  var token =req.body.token

  if(repassword){
    // 存在时，验证其登录情况或者验证其 code
    if(token){
      if(!id){
        res.json({status: 1, meg: "用户登录错误1"})
      }
      if(!password){
        res.json({status: 1, meg: "用户原始密码错误1"})
      }
      if( token == getMD5password(id)){
        user.findOne({_id: id}, {password: password}, function(e, checkUser){
          if(checkUser){
            user.updateOne({_id: id}, {password: repassword}, function(e, userUpdate){
              if(e){
                res.json({status: 1, meg: "更正出错", data: e})
              }
              res.json({status: 0, meg: "更正完成", data: userUpdate})
            })
          }else{
            res.json({status: 1, meg: "用户原始密码错误2"})
          }
        })
      }else{
        res.json({status: 1, meg: "用户登录错误2"})
      }
    }else{
        // 不存在 code 时， 直接验证 mail 和 phone
          user.findUserPassword(username, userMail, userPhone, function(e, userFound){
            if(userFound.length != 0){
             
              user.updateMany({_id: userFound[0]._id}, {password: repassword}, function(e, userUpdate){
                if(e){
                  res.json({status: 1, meg: "更新错误", data: e})
                }else{
                  res.json({status: 0, meg: "更新成功", data: userUpdate})
                }
              })
            }else{
              res.json({status: 1, meg: "信息错误"})
            }
          })
        }
  }else{
    // 只是验证 Mail 和 Phone,返回验证成功提示和提交的字段， 用于之后改密码的操作。
    if(!username){
      res.json({status: 1, meg: "用户名为空"})
    }
    if(!userMail){
      res.json({ status: 1, meg: "用户邮箱为空"})
    }
    if(!userPhone){
      res.json({ status: 1, meg: "用户手机号为空"})
    }
    user.findUserPassword(username, userMail, userPhone, function(e, userFound){
      if(userFound.length != 0){
        res.json({status: 0 ,meg: "验证成功，请修改密码", data: {username, userMail, userPhone}})
      }else{
        res.json({status: 1, mge: "信息错误"})
      }
    })
  }
});

// 发送站内信
router.post('/sendEmail', function(req, res, next){

});

// 显示站内信，其中receive参数的值为1时是发送的内容，为2是收到的内容
router.post('/showEmail', function(req, res, next){

});

// 获取MD5值
function getMD5password(id){
  var md5 = crypto.createHash('md5');
  var token_before = id + init_token;
  // res.json(userSave[0]._id)
  return md5.update(token_before).digest('hex');
};

module.exports = router;
