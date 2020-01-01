// 后台管理admin， 添加新的电影

var express = require('express');
var router = express.Router();
var movie = require('../models/movie');
var article = require('../models/article');
var recommend = require('../models/recommend');

// 后台管理验证用户后台管理权限
// function checkAdminPower(username, token, id){
//     this.username = username;
//     this.token = token;
//     this.id = id;
//     var check = function(username, token, id){
//         var error = 0;
//         if(username && token && id){
//             return error
//         }
//     }
// }


// 添加新电影
router.post('/movieAdd', function(req, res, next){
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;
    var movieName = req.body.movieName;
    var movieImg = req.body.movieImg;
    var movieDownload = req.body.movieDownload;
    var movieMainPage = req.body.movieMainPage;

    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户传递id出错"});
    }
    if(!movieName){
        res.json({status: 1, message: "电影名称为空"});
    }
    if(!movieImg){
        res.json({status: 1, message: "电影图片为空"});
    }
    if(!movieDownload){
        res.json({status: 1, message: "电影下载地址为空"});
    }
    if(!movieMainPage){
        var movieMainPage = false;
    }
    // 验证
    var check = checkAdminPower(username, token, id);
    if(check.error == 0){
        // 验证用户情况
        user.findByUsername(usernamae, function (e, findUser){
            if(findUser[0].userAdmin && findUser[0].userStop){
                // 根据数据集建立需要存入数据库的内容
                var saveMovie = new movie({
                    movieName: movieName,
                    movieImg: movieImg,
                    movieVideo: req.body.movieVideo,
                    movieDownload: movieDownload,
                    movieTime: Date.now(),
                    movieNumSuppose: 0,
                    movieNumDownload: 0,
                    movieMainPage: movieMainPage
                })
                // 保存合适的数据集
                saveMovie.save(function(e){
                    if(e){
                        res.json({status: 1, message: e})
                    }else{
                        res,json({status: 0, message: "添加成功"})
                    }
                })
            }else{
                res.json({error: 1, message: "用户没有权限或已停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 删除电影
router.post('/movieDel', function(req, res, next){
    var movieId = req.body.movieId;
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;

    if(!movieId){
        res.json({status: 1, message: "电影id传递失败"});
    }
    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }
    var check = checkAdminPower(username, token, id);
    if(check.error == 0){
        user.findByUsername(username, function(e, fundUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                movie.remove({_id: movieId}, function(e, delMovie){
                    res.json({status: 0, message: "删除成功", data: delMovie})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 更新电影
router.post('/movieUpdate', function(req, res, next){
    var movieId = req.body.movieId;
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;

    if(!movieId){
        res.json({status: 1, message: "电影id传递失败"});
    }
    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }
    var saceData = req.body.movie.Info;
    var check = checkAdminPower(username, token, id)
    if(check.error == 0){
        user.findByUsername(username, function(e, findUser){
            if(findUser[0].userAdmin && ! findUser[0].userStop){
                movie.update({_id: movieId}, saveDate, function(e, delMovie){
                    res.json({status: 0, message: "删除成功", data: delMovie})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"});
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 显示后台所有电影
router.get('/movie', function(req, res, next){
    movie.findAll(function(e, allMovie){
        res.json({status: 0, message: "获取成功", data: allMovie})
    })
});

// 获取用户评论
router.get('/commentsList', function(req, res, next){
    comment.findAll(function(e, allComment){
        res.json({status: 0, message: "获取成功", data: allComment})
    })
});

// 审核用户评论
router.post('/checkComment', function(req, res, next){
    var commentId = req.body.commentId;
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;

    if(!commentId){
        res.json({status: 1, message: "评论id为空"});
    }
    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, findUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                comment.update({_id: commentId}, {check: true}, function(e, updateComment){
                    res.json({status: 0, message: "审核通过", data: updateComment})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 删除评论
router.post('/delComment', function(req, res, next){
    var commentId = req.body.commentId;
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;

    if(!commentId){
        res.json({status: 1, message: "评论id为空"});
    }
    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, findUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                comment.remove({_id: commentId}, {check: true}, function(e, delComment){
                    res.json({status: 0, message: "审核通过", data: delComment})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 封停用户
router.post('/stopUser', function(req, res, next){
    var userId = req.body.userId;
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;

    if(!userId){
        res.json({status: 1, message: "用户id传递失败"})
    }
    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, findUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                user.update({_id: userId}, {userStop: true}, function(e, updateUser){
                    res.json({status: 0, message: "审核通过", data: updateUser})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 用户密码修改（管理员）
router.post('/changeUser', function(req, res, next){
    var userId = req.body.userId;
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;
    var newpassword = req.body.newpassword;

    if(!userId){
        res.json({status: 1, message: "用户id传递失败"})
    }
    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }
    if(!newpassword){
        res.json({status: 1, message: "请输入新密码"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, fundUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                user.update({_id: userId}, {password: newpassword}, function(e, updateUser){
                    res.json({status: 0, message: "审核通过", data: updateUser})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
})

// 显示所有用户
router.post('/showUser', function(req, res, next){
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;

    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, fundUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                user.findAll(function(e, alluser){
                    res.json({status: 0, message: "审核通过", data: alluser})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 管理用户权限
router.post('/powerUpdate', function(req, res, next){
    var userId = req.body.userId;
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;

    if(!userId){
        res.json({status: 1, message: "用户id传递失败"})
    }
    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, fundUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                user.update({_id: userId}, {userAdmin: ture}, function(e, updateUser){
                    res.json({status: 0, message: "修改成功", data: updateUser})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 新增文章
router.post('/powerUpdate', function(req, res, next){
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;
    var articleTitle = req.body.articleTitle;
    var articleContext = req.body.articleContext;

    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }
    if(!articleTitle){
        res.json({status: 1, message: "文章名称为空"});
    }
    if(!articleContext){
        res.json({status: 1, message: "文章内容为空"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, fundUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                var saveArticle = new article({
                    articleTitle: articleTitle,
                    articleContext: articleTitle,
                    articleTime: Date.now(),
                })
                saveArticle.save(function(e){
                    if(e){
                        res.json({status: 1, message: e});
                    }
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 删除文章
router.post('/powerUpdate', function(req, res, next){
    var articleId = req.body.articleId;
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;

    if(!articleId){
        res.json({status: 1, message: "文章id传递失败"})
    }
    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, fundUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                article.remove({_id: articleId}, function(e, delArticle){
                    res.json({status: 0, message: "删除成功", data: delArticle})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 新增主页推荐
router.post('/addRecommend', function(req, res, next){
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;
    var recommendImg = req.body.recommendImg;
    var recommendSrc = req.body.recommendSrc;
    var recommendTitle = req.body.recommendTitle;

    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }
    if(!recommendImg){
        res.json({status: 1, message: "推荐图片为空"})
    }
    if(!recommendSrc){
        res.json({status: 1, message: "推荐地址为空"});
    }
    if(!recommendTitle){
        res.json({status: 1, message: "推荐标题为空"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, fundUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                var saveRecommend = new recommendImg({
                    recommendImg: recommendImg,
                    recommendSrc: recommendSrc,
                    recommendTitle: recommendTitle
                })
                saveRecommend.save(function(e){
                    if(e){
                        res.json({status: 1, message: e})
                    }else{
                        res.json({status: 0, message: "保存成功"})
                    }
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});

// 删除热点信息
router.post('/delRecommend', function(req, res, next){
    var recommendId = req.body.recommendId;
    var username = req.body.username;
    var token = req.body.token;
    var id = req.body.id;

    if(!recommendId){
        res.json({status: 1, message: "热点id传递失败"})
    }
    if(!username){
        res.json({status: 1, message: "用户名为空"});
    }
    if(!token){
        res.json({status: 1, message: "登录出错"});
    }
    if(!id){
        res.json({status: 1, message: "用户id出错"});
    }

    var check = checkAdminPower(username, token, id)
    if(check == 0){
        user.findByUsername(username, function(e, fundUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                recommend.remove({_id: recommendId}, function(e, delRecommend){
                    res.json({status: 0, message: "删除成功", data: delRecommend})
                })
            }else{
                res.json({error: 1, message: "用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status: 1, message: check.message})
    }
});


module.exports = router;