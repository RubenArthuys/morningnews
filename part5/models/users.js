var mongoose = require('mongoose')

var articlesSchema = mongoose.Schema({
    articleTitle: String,
    articleDescription: String,
    articleContent: String,
    articleImage: String
})

var usersSchema = mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String,
    userToken: String,
    userArticles: [articlesSchema]
})

var usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel;