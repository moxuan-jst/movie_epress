var mongoose = require('../common/db');
// 文章数据集
var article = new mongoose.Schema({
    articleTitle: String,
    articleContext: String,
    articleTIme: String
})
// 通过ID查找
article.statics.findByArticleId = function(id, callBack){
    this.find({_id: id}, callBack);
};
article.statics.findAll = function(callBack){
    this.find({}, callBack);
};
var articleModel = mongoose.model('article', article);
module.exports = articleModel;