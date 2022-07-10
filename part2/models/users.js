var mongoose = require('mongoose')

var usersSchema = mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String
})

var usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel;