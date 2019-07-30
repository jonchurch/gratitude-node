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
    User.findOne({ email:req.body.email}, function (err, user) {
    if (err){ 
      console.log("err:"+err);
      res.send(err.message);
      next();  
    }
    console.log("user email: "+user.email);
    console.log("user id"+user._id);

    if(bcrypt.compareSync(req.body.password, user.password)){
        // res == true
        console.log('user exists');
        res.send(user);
    }else{
        //not there
        console.log('is not there')

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
            console.log("create new user");
            console.log(req.body.public);
            var publicValue = Boolean(req.body.public);
            console.log("publicValie: ")+publicValue;
           
            var hash = bcrypt.hashSync(req.body.password, saltRounds);
                console.log("password successful");
                var user = new User({
                
                firstname:req.body.firstname,
                lastname : req.body.lastname,
                email :req.body.email,
                password : hash,
                public :publicValue,
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

module.exports = router;
