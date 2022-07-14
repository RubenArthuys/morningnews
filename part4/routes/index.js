var express = require('express');
var router = express.Router();

var usersModel = require('../models/users');

var bcrypt = require('bcrypt');
var uid2 = require('uid2');
const cost = 10;


// Sign Up
router.post('/sign-up', async function(req,res,next){
  
  var userTaken = await usersModel.findOne({ userEmail : req.body.emailFromFront })
  var error = []

  if (req.body.usernameFromFront == '' 
      || req.body.emailFromFront == '' 
      || req.body.passwordFromFront == '') {

    error.push("Empty field...")

  } else if (userTaken) {

    error.push("Email already taken")

  } else {

    const hash = bcrypt.hashSync(req.body.passwordFromFront, cost)
    
    var newUser = new usersModel ({
      userName : req.body.usernameFromFront,
      userEmail : req.body.emailFromFront,
      userPassword : hash, 
      userToken: uid2(32) 
    });
    var userSave = await newUser.save();
  
    var result = false
    var token;
    if(userSave){
      result = true
      token = userSave.userToken
    }
  }

  res.json({ result, userSave, error, token });
})

// Sign In
router.post('/sign-in', async function(req,res,next){
  
  var error = []

  if(req.body.emailFromFront == '' || req.body.passwordFromFront == '' ) {

     error.push("Empty field...")

  } else {
    
    var user = await usersModel.findOne({ 
      userEmail : req.body.emailFromFront, 
    })

    var result = false;
    var token;
    if(user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.userPassword)) {
      result = true; 
      token = user.userToken 
      } else {
        result = false
        error.push("Wrong password")
      }
    } else {
      error.push("Wrong email")
    }
  }

  res.json({ result, user, error, token});
  
})


module.exports = router;
