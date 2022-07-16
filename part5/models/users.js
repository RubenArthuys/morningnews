var mongoose = require('mongoose')

var articlesSchema = mongoose.Schema({
    title: String,
    description: String,
    content: String,
    urlToImage: String
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