var mongoose = require('../common/db');
// 站内信
var mail = mongoose.Schema({
    toUser: String,
    fromUser: String,
    title: String,
    context: String
})
// 数据操作的常用方法
mail.statics.findByToUserId = function(User_id, callBack){
    this.find({toUser: User_id}, callBack);
};
mail.statics.findByFromUserId = function(User_id, callBack){
    this.find({fromUser: User_id}, callBack);
}

var mailModel = mongoose.model('mail', mail);
module.exports = mailModel;