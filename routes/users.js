var express = require('express'),
router = express.Router(),

User = require("../models/UserModel"),
bcrypt = require('bcrypt');

router.use(express.json());

///////////////////////
//// GET ALL USERS ////
///////////////////////
router.get('/', function(req, res) {
  //get all users and return for admin
  
  User.find({}, function (err, users) {
    
    if (err){ 
        logger.error("Error finding users");
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
  User.findById(req.params.id, function (err, user) {

    if (err){ 
      logger.error("Error finding user");
      res.send(err.message);
      next();  
    }
    logger.info("Logging in user");
    res.send(user);
  });        
  
 });

 //////////////////
////LOGIN USER////
//////////////////
router.post('/login', function(req, res) {
      User.findOne({ email:req.body.email}, function (error, user) {
      if (error){ 
        logger.error("Login failed, try again.");
        res.send(error.message);
        next();  
      }
      if (!user){ 
          //not there
          logger.debug("Failed to find user for login.");
           error = new Error("Failed to find user for login.")
          res.send(JSON.stringify(error.message));
          next();  
        
      }else{
          bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err){ 
              logger.error('Login Failed, bcrypt did not work');
              res.send(err.message);
              next();  
            }
            if (result == true) {
            res.send(user);
          } else {
              const error = new Error('Login Failed. Cofirm Email and Password are correct.');
              res.status(500);
              console.log(error.response)
              res.send(JSON.stringify(error.message));
            
          }
        });
      }  
});

////////////////////
////USER Profile////
////////////////////
router.get('/profile/:id', function(req, res) {
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

/*router.post('/',function(req,res){
   User.findOne({ email:req.body.email}, function (error, user) {

    if (user) {
      throw new Error('Email already used.') // Express will catch this on its own.
    
         
          

          var pwd = req.body.password;
         
          bcrypt.genSalt(10, function(err, salt) {
              if (err) {
                  console.log('1: ' + err.message);
              } else {
                  //console.log('Salt: ' + salt);
                  bcrypt.hash(pwd, salt, function (err, hash) {
                      if (err) {
                          //console.log('2: ' + err.message);
                      } else {
                        var user = new User({
                
                          firstname:req.body.firstname,
                          lastname : req.body.lastname,
                          email :req.body.email,
                          password : hash,
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
              }
          });
         
    }
        
  });*/ 
 });  
 ////////////////////
////NEW USER REG////
////////////////////
router.get('/info/:id', function(req, res) {
    
    console.log(req.params.id);
    if (err){ 
      console.log("err:"+err);
      res.send(err.message);
      next();  
    }
    res.send(req.params.id);
});        

 ////////////////////
////UPDATE DETAILS//
////////////////////


router.put('/users/:id',function(req,res){
  console.log("IN PUT: "+console.log(req.params.id));
	User.findById(_id, function (err, user) {
     if(!user){
     }
     else{

     }
    })
});   


module.exports = router;


// var express = require("express"),
//     bodyParser = require("body-parser"),
//     logger = require('../logger/logger'),
//     app = express();

// // array to hold users
// const users = [{firstName:"fnam1",lastName:"lnam1",userName:"username1"}];

// // request to get all the users
// app.get("/users", function(req, res) {
//     logger.info("users route");
//     res.json(users);
// })

// // request to get all the users by userName
// app.get("/users/:userName", function(req, res) {
//     logger.info("filter users by username:::::"+req.params.userName);
//     let user = users.filter(function(user){
//         if(req.params.userName === user.userName){
//             return user;
//         }
//     })
//     res.json(user);
// })

// // request to post the user
// //req.body has object of type {firstName:"fnam1",lastName:"lnam1",userName:"username1"}
// app.post("/user", function(req, res) {
//     users.push(req.body);
//     res.json(users);
// })

