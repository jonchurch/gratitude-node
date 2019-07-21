var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
var User = require("../models/UserModel");
router.use(express.json());

///////////////////////
//// GET ALL USERS ////
///////////////////////
router.get('/', function(req, res) {
  //get all users and return for admin
  User.find({}, function (err, users) {
  if (err){ 
      console.log("err:"+err);
      res.send(err.message);
      
      next();  
  }
    res.json(users);
          
  });        
});

////////////////////
//// GET 1 USER ////
////////////////////

router.get('/:id', function(req, res) {
  console.log("id:" +req.params.id);
  //console.log("id:" +id);
  User.find({_id:req.body._id}, function (err, users) {
  if (err){ 
      console.log("err:"+err);
      res.send(err.message);
      res.status(410);
      next();  
  }
    res.json(users);
          
  });        
});


//////////////////
////LOGIN USER////
//////////////////
router.post('/login', function(req, res) {
  console.log("Email: "+req.body.email);
  console.log("Password" +req.body.password);
  
  User.findOne({ email:req.body.email,password:req.body.password}, function (err, user) {
  if (err){ 
        console.log('Error: '+err.message);
        console.log(err.message);
        //res.send(err.message);
  }
  else{
      console.log("user email: "+user.email);
      console.log("user id"+user._id);
      if(user.email===req.body.email && user.password===req.body.password){
           //user exists
          
           res.send(user);
         }
         else{
            //login failed
            console.log('does not');

         }
         
  }
  
 });        
});

////////////////////
////USER Profile////
////////////////////
router.post('/profile/:id', function(req, res) {
    console.log("go to profile page")
  console.log(req.params.id);
  if(req.params.id===null || req.params.id=== undefined || req.params.id ===""){
        //id is not found
        res.send(req.params.id);
  }
  else{
      //forward to profile with id
      console.log("found user!");
  }
  
 });        



///////////////////////
////CREATE NEW USER////
///////////////////////

router.post('/',function(req,res){
   
  console.log("email: "+req.body.email)
  User.findOne({ email:req.body.email}, function (err, user) {
      console.log("user exists");
    if (err){ 
      console.log("err:"+err);
      console.log("err:"+err.message);
      
      res.status(410);
      res.send(err.message);
      
      //res.json("Email already in use"); 
      next();  
  	}
  	else{
        //save user  
        console.log("create new user");
        var user = new User({
          
          firstname:req.body.firstname,
          lastname : req.body.lastname,
          email :req.body.email,
          password :req.body.password,
          public :true,
          admin: false,
          bio : "",
          location : "",
          avatar: ""
        });
         user.save(function (err) {
          if (err){ 
            //check to see if email already in db
            console.log("err:"+err);
            res.send(err.message);
            res.status(400);
            //res.json("Error registering"); 
            //next();  
              
          }else{
              console.log ("SAVED!");
              res.send(user);
           }
         });
      }
      
  });
 });   
 

module.exports = router;
