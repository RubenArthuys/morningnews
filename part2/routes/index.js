var express = require('express');
var router = express.Router();

var usersModel = require('../models/users');


// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Add users to MongoDB
router.post('/sign-up', async function(req,res,next){
  

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

  res.json({ result, userSave });
})

// Find users to MongoDB
router.post('/sign-in', async function(req,res,next){
  
  var user = await usersModel.findOne({ 
    userEmail : req.body.emailFromFront, 
    userPassword : req.body.passwordFromFront 
  })

  var result = false;
  if(user) {
    result = true;  
  }

  res.json({ result, user });
})


module.exports = router;
