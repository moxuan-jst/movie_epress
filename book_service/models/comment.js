// 用户评论数据集
var mongoose = require('../common/db');

// 数据库数据集
var comment = new mongoose.Schema({
    movie_id: String,
    username: String,
    context: String,
    check: Boolean
});

// 数据操作
// 根据电影ID查询评论
comment.statics.findByMovieId = function(m_id, callBack){
    this.find({movie_id: m_id, check: true}, callBack);
};
// 查询所有评论
comment.statics.findAll = function(callBack){
    this.find({}, callBack);
};

var commentModel = mongoose.model('comment', comment);
module.exports = commentModel;
