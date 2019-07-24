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
  console.log(" get 1 user id:" +req.params.id);
  User.findById(req.params.id, function (err, user) {

    if (err){ 
      console.log("err:"+err);
      res.send(err.message);
      next();  
    }
    res.send(user);
   
    
   });        
  
 });



//////////////////
////LOGIN USER////
//////////////////
router.post('/login', function(req, res) {
  
  User.findOne({ email:req.body.email,password:req.body.password}, function (err, user) {
    if (err){ 
      console.log("err:"+err);
      res.send(err.message);
      next();  
    }
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
         
  
  
 });        
});

////////////////////
////USER Profile////
////////////////////
router.post('/profile/:id', function(req, res) {
    console.log("go to profile page")
    console.log(req.params.id);
    if (err){ 
      console.log("err:"+err);
      res.send(err.message);
      next();  
    }
    res.send(req.params.id);
  
  
  
 });        



///////////////////////
////CREATE NEW USER////
///////////////////////

router.post('/',function(req,res){
   
  console.log("email: "+req.body.email)
  User.findOne({ email:req.body.email}, function (error, user) {
      if(user){
      //throw new Error('User Exists');
      console.log("users exists");
      //return something here.
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
          user.save(function (error, user) {
            if (error){ 
              console.log("err:"+error);
              res.send(error.message);
              next();  
            }
        
            res.send(user)
            
          });
    }
        
  });
 });   
 

module.exports = router;
