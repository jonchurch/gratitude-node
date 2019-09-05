var express = require('express'),
    router = express.Router(),
    express = require('express'),
    logger = require('../logger/logger'),
    router = express.Router(),
    User = require("../models/UserModel"),
    bcrypt = require('bcrypt');
    

router.use(express.json());

///////////////////////
//// GET ALL USERS ////
///////////////////////
router.get('/', function(req, res) {
  //get all users and return for admin
  console.log("get them all");
  User.find({}, function (err, users) {
    
    if (err){ 
        logger.error("Could not get all users");
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
    logger.info("get user info: "+req.params.id);
    User.findById(req.params.id, function (err, user) {

    if (err){ 
     logger.error("Error: "+err.message);
      res.send(err.message);
      next();  
    }
    logger.info("Return User");
    res.send(user);
   
    
   });        
  
 });



//////////////////
////LOGIN USER////
//////////////////
router.post('/login', function(req, res) {
   // bcrypt.compare(password, user.password);
   
    User.findOne({ email:req.body.email}, function (err, user) {
    
    if (!user){ 
         //not there
            
            const error = new Error('Login Failed. Cofirm Email and Password are correct.');
            res.status(500);
            logger.error("User not found");
            res.send(JSON.stringify(error.message));
       
    }else{
      
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          
          res.send(user);
        } else {
            
            const error = new Error('Login Failed. Cofirm Email and Password are correct.');

            res.status(500);
            logger.error("User not found");
            res.send(JSON.stringify(error.message));
          
        }
      });
       
    } 
});        
});

////////////////////
////USER Profile////
////////////////////
router.get('/profile/:id', function(req, res) {
    logger.info("Load profile page");
    logger.info(req.params.id);
    if (err){ 
      
      logger.error("err:"+err);
      res.send(err.message);
      next();  
    }
    res.send(req.params.id);
 });        

///////////////////////
////CREATE NEW USER////
///////////////////////

router.post('/',function(req,res){
    logger.info("email: "+req.body.email);
    User.findOne({ email:req.body.email}, function (error, user) {
      if(user){
        const error = new Error('User email account already exists.');
        //throw new Error('User email account already exists.');
        res.status(410);
        res.send(JSON.stringify(error.message));
        
    }
    else{
          //save user  
          
          var pwd = req.body.password;
         
          bcrypt.genSalt(10, function(err, salt) {
              if (err) {
                logger.error("BCrype issue");
                const error = new Error("Unable to register, please try again.");
                //throw new Error('User email account already exists.');
                res.status(420);
                res.send(JSON.stringify(error.message));
        
              } else {
                  //console.log('Salt: ' + salt);
                  bcrypt.hash(pwd, salt, function (err, hash) {
                      if (err) {
                         logger.error("ERROR! users bcrypt");
                        const error = new Error("Unable to register, please try again.");
                        
                        res.status(420);
                        res.send(JSON.stringify(error.message));
                      } else {
                        
                        var user = new User({
                            
                          firstname:req.body.firstname,
                          lastname : req.body.lastname,
                          email :req.body.email,
                          password : hash,
                          
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
router.put('/:id',function(req,res){
   
        // if(req.params.id!=null){
        //     User.findOneAndUpdate(req.params.id,{$set:{bio:req.body.bio}},{new:true}).then((docs)=>{
        //     if(docs) {
        //        // res.send(docs);
        //        next();
        //     } else {
        //         logger.error("1");
        //         next();
        //     }
        //     }).catch((err)=>{
        //         logger.error("2");
        //         next();
        //     })
        //     } else {
            
        //     }

    logger.info("input : "+req.params.id);
    logger.info("bio : "+req.body.bio);
    logger.info("loc : "+req.body.location);
     
    try{
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {bio: req.body.bio, location: req.body.location}},
            function(err, doc) {
                logger.debug("error : "+err);
                logger.debug("doc : "+doc);
                res.send(doc);
                
            
            
        });
        
    }catch(err){ 
        logger.error(err.message);
         logger.error(doc);
    }

    

    

        
    
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