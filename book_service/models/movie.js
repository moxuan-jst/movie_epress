var mongoose = require('../common/db');
// 电影相关数据集
var movie = new mongoose.Schema({
    movieName: String,
    movieImg: String,
    movieVideo: String,
    movieDownload: String,
    movieTime: String,
    movieNumSuppose: Number,
    movieNumDownload: Number,
    movieMainPage: Boolean
})
// 根据电影ID查询
movie.statics.findByMovieId = function(m_id, callBack){
    this.find({movie_id: m_id, check: true}, callBack);
};
// 查询所有电影
movie.statics.findAll = function(callBack){
    this.find({}, callBack);
};

var movieModel = mongoose.model('movie', movie);
module.exports = movieModel;