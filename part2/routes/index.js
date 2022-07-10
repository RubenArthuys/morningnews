var express = require('express');
var router = express.Router();

var usersModel = require('../models/users');


// Add users to MongoDB
router.post('/sign-up', async function(req,res,next){
  
  var error = []
  var userTaken = await usersModel.findOne({ userEmail : req.body.emailFromFront })

  if(req.body.usernameFromFront == '' 
     || req.body.emailFromFront == '' 
     || req.body.passwordFromFront == '' ) {
    error.push("Missing something...")
  } else if(userTaken) {
    error.push("User already taken")
  } else {
    var newUser = new usersModel ({
      userName : req.body.usernameFromFront,
      userEmail : req.body.emailFromFront,
      userPassword : req.body.passwordFromFront, 
    });
    var userSave = await newUser.save();
  
    var result = false
    if(userSave){
      result = true
    }
  }

  res.json({ result, userSave, error });
})

// Find users to MongoDB
router.post('/sign-in', async function(req,res,next){
  
  var error = []

  if(req.body.emailFromFront == '' || req.body.passwordFromFront == '' ) {
     error.push("Missing something...")
  } else {
    var user = await usersModel.findOne({ 
      userEmail : req.body.emailFromFront, 
      userPassword : req.body.passwordFromFront 
    })

    var result = false;
    if(user) {
      result = true;  
    } else {
      error.push("Incorrect email or password")
    }
  }

  res.json({ result, user, error });
})


module.exports = router;
