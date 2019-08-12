var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
var User = require("../models/UserModel");

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
   // bcrypt.compare(password, user.password);
   console.log("login users....")
    User.findOne({ email:req.body.email}, function (err, user) {
    
    if (!user){ 
         //not there
            console.log('not there');
            const error = new Error('User not found');
            res.status(500);
            console.log(error.response)
            res.send(JSON.stringify(error.message));
       
    }else{
        console.log("found user...");
        console.log(req.body.password);
        console.log(user.password);
        if(req.body.password == user.password){
            // res == true
            res.send(user);
        }
        else{
            //incorrect password
            const error = new Error('Login Failed. Cofirm Email and Password are correct.');
            res.status(500);
            console.log(error.response)
            res.send(JSON.stringify(error.message));
        }
    } 
});        
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

router.post('/',function(req,res){
   
  console.log("email: "+req.body.email)
  //console.log("public-checked "+req.params.public-checked);
  User.findOne({ email:req.body.email}, function (error, user) {
      if(user){
        const error = new Error('User email account already exists.');
        //throw new Error('User email account already exists.');
        res.status(410);
        console.log(error.response)
        res.send(JSON.stringify(error.message));
        
    }
    else{
          //save user  
         console.log("create new user : "+req.body.email);
        
           // var hash = bcrypt.hashSync(req.body.password, saltRounds);
                
                var user = new User({
                
                firstname:req.body.firstname,
                lastname : req.body.lastname,
                email :req.body.email,
                password : req.body.password,
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
router.put('/info:id',function(req,res){

   
    console.log("IN PUT: "+console.log(req.params.id));
    res.send('Got a PUT request at /user');
//     User.findById(_id, function (err, user) {
//     if(!user){
//         const error = new Error('Something went wrong, please try again.');
        
//         res.status(500);
//         console.log(error.response)
//         res.send(JSON.stringify(error.message));
        
//     }
//     else{
//           //save user  
//          console.log("save details: "+_id);
        
//            // var hash = bcrypt.hashSync(req.body.password, saltRounds);
                
//                 var user = new User({
                
              
//                 bio : req.body.bio,
//                 location : "",
//                 avatar: ""
//                 });
//                 user.save(function (error, user) {
//                     if (error){ 
//                     console.log("err:"+error);
//                     res.send(error.message);
//                     next();  
//                     }
                
//                     res.send(user)
                    
//                 });
//     }
        
//   });
                    
    
 });   
module.exports = router;
