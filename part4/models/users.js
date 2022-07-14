var mongoose = require('mongoose')

var usersSchema = mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String,
    userToken: String
})

var usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel;