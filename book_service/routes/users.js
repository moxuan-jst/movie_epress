/*
对于routes目录中的文件以文件名作为域名的二级路径。
项目默认会自动创建此文件。
*/ 
var express = require('express');
var router = express.Router();
// 用户数据集
var user = require('../models/users');
// 用于加密
var crypto = require('crypto');
// 评论数据集
var comment = require('../models/comment');

var movie = require('../models/movie');
var mail = require('../models/mail');


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
      res.json({status: 0, data: {token: token_after, user: userSave},meg: "用户登录成功"}) // user: userSave
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
  /*
    通过用户的 username （如果用户不发送相关的 username，默认为匿名用户）、用户的名称和电影ID来确定一条评论，默认需要审核。
  */  
  var username = req.body.username;
  var movie_id = req.body.movie_id;
  var context = req.body.context;

  // 验证完整性
  if(!username){
    var username = "匿名用户";
  }
  if(!movie_id){
    res.json({status: 1, meg: "电影id为空"})
  }
  if(!context){
    res.json({status: 1, meg: "评论内容为空"})
  }
  // 根据数据集建立新的数据内容
  var saveComment = new comment({
    movie_id: movie_id,
    username: username,
    context: context,
    check: 0
  });
  // 保存数据集
  saveComment.save(function(e){
    if(e){
      res.json({status: 1, meg: e})
    }else{
      res.json({status: 1, meg: "评论成功"})
    }
  })
});

// 点赞
router.post('/support', function(req, res, next){
/*
  只需要将电影ID对应的点赞字端 加1 即可
*/ 
var movie_id = req.body.movie_id;

// 保存数据集
// var saveSupport = new movie({
//   movie_id: movie_id
// })
if(!movie_id){
  res.json({status: 1, meg: "没有对应的电影ID"})
}
// movie.findById(movie_id, function(e, supportMovie){
  movie.updateOne({_id: movie_id}, {movieNumSuppose: movieNumSuppose+1}, function(e){  // supportMovie.movieNumSuppose+1
    if(e){
      res.json({status: 1, meg: e})
    }else{
      res.json({status: 0, meg: "点赞成功"})
    }
  })
// })
});

// 下载
router.post('/download', function(req, res, next){
  var movie_id = req.body.movie_id;
  if(!movie_id){
    res.josn({status: 1, meg: "电影ID传递失败"})
  }
  movie.findById(movie_id, function(e, supportMovie){
    // 更新操作
    movie.update({_id: movie_id}, {movieDolnload: supportMovie.movieDolnload+1}, function(e){
      if(e){
        res.json({status: 1, meg: "下载失败", data: e});
      }else{
        res.json({status: 0, meg: "下载成功", data: supportMovie.movieDolnload});
      }
    })
  })
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
  var token =req.body.token;

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
// 这里有问题，当进入修改密码页面以后，无论是否修改密码都会成功
      }else{
        res.json({status: 1, meg: "信息错误"})
      }
    })
  }
});

// 发送站内信
router.post('/sendEmail', function(req, res, next){
  var token = req.body.token;
  var user_id = req.body.user_id;
  var toUsername = req.body.toUsername;
  var title = req.body.title;
  var context = req.body.context;
  // 验证完整性
  if(!token){
    res.json({status: 1, meg: "用户登录状态错误"})
  }
  if(!user_id){
    res.json({status: 1, meg: "用户登录出错"})
  }
  if(!toUsername){
    res.json({status: 1, meg: "未选择发送的用户"})
  }
  if(!title){
    res.json({status: 1, meg: "标题不能为空"})
  }
  if(!context){
    res.json({status: 1, meg: "内容不能为空"})
  }
  if(token == getMD5password(user_id)){
    // 存入数据库之前现在数据库中获取到要发送至用户的 user_id
    user.findByUsername(toUsername, function(e, toUser){
      if(toUsername.length != 0){
        var NewEmail = new mail({
          fromUser: user_id,
// 这里也有问题，toUser[0] 为空
          // toUser: toUser[0]._id,
          toUser: toUsername,
          title: title,
          context: context
        })
        NewEmail.save(function(){
          res.json({status: 0, meg: "发送成功"})
        })
      }else{
        res.json({statis: 1, meg: "您发送的对象不存在2"})
      }
    })
  }else{
    res.json({status: 1, meg: "用户登录错误"})
  }
});

// 显示站内信，其中receive参数的值为1时是发送的内容，为2是收到的内容
router.post('/showEmail', function(req, res, next){
  var token = req.body.token;
  var user_id = req.body.user_id;
  var receive = req.body.receive;

  // 验证完整性
  if(!token){
    res.json({status: 1, meg: "用户登录状态错误"})
  }
  if(!user_id){
    res.json({status: 1, meg: "用户登录出错"})
  }
  // if(!receive){
  //   res.json({status: 1, meg: "参数出错"})
  // }
  if(token == getMD5password(user_id)){
    if(receive == 1){
      // 发送的站内信
      mail.findByFromUserId(user_id, function(e, sendMail){
        res.json({status: 0, meg: "获取成功1", data: sendMail})
    })
    }else{
      // 接受的站内信
      mail.findByToUserId(user_id, function(e, receiveMail){
        res.json({status: 0, meg: "获取成功2", data: receiveMail})
      })
    }
  }else{
    res.json({status: 1, meg: "用户登录错误"})
  }
});


// 获取MD5值
function getMD5password(id){
  var md5 = crypto.createHash('md5');
  var token_before = id + init_token;
  // res.json(userSave[0]._id)
  return md5.update(token_before).digest('hex');
};

module.exports = router;
