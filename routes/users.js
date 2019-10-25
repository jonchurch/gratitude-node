var express = require('express'),
    router = express.Router(),
    logger = require('../logger/logger'),
    User = require("../models/UserModel"),
    mongoose=require('mongoose'),
    bcrypt = require('bcrypt');
  
    
    router.use(express.json());

///////////////////////
//// GET ALL USERS ////
///////////////////////
router.get('/', function(req, res) {
  //get all users and return for admin 
 
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
  logger.debug("Get ID: "+req.params.id);
    // logger.debug("param : "+req.params.id);
    const user= User.findById(req.params.id, function (err, user) {
      if (err){ 
      logger.error("Get User Error: "+err.message);
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
   
    User.findOne({ email:req.body.email,activated:"y"}, function (err, user) {
    
    if (!user){ 
         //not there
            
            const error = new Error('Login Failed. Cofirm Email and Password are correct.');
            res.status(500);
            
            res.send(JSON.stringify(error.message));
       
    }else{
      
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          
          res.send(user);
        } else {
            
            const error = new Error('Login Failed. Cofirm Email and Password are correct.');

            res.status(500);
            logger.debug("User not found");
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
            console.log("user exists");
            const error = new Error('User email account already exists.');
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
                            
                          firstname:"Welcome",
                          lastname :req.body.email,
                          email :req.body.email,
                          password : hash,
                          public:1,
                          admin: false,
                          bio : "",
                          location : "",
                          avatar: "",
                          url: "",
                          activated:"n"
                        });
                          user.save(function (error, user) {
                              if (error){ 
                                console.log("err:"+error);
                                res.send(error.message);
                              //send email
                              
                              }
                              
                              const host = `${global.gConfig.host}`
                              logger.info ("host: " +host);
                              
                              const mailjet = require ('node-mailjet')
                                .connect(`${global.gConfig.mailjet_api_key}`, `${global.gConfig.mailjet_secret_key}`);
                                logger.debug("send email...");
                                const request = mailjet
                                .post("send", {'version': 'v3.1'})
                                .request({
                                    "Messages":[
                                              {
                                                    "From": {
                                                            "Email": "adrian@adriannadeau.com",
                                                            "Name": "GratitudeToday.io"
                                                    },
                                                    "To": [
                                                            {
                                                                    "Email":"adriannadeau.art@gmail.com",
                                                                    "Name": "Adrian"
                                                            }
                                                    ],
                                                    "Subject": "Activate Your Account",
                                                    //"TextPart": "Dear "+user.firstname+", welcome to GratitudeToday! May the delivery force be with you!",
                                                    // "HTMLPart": "<h3>Dear "+user.firstname+", Click the link below to reset your password.<br/><br/>"+
                                                    // "<a href='https://gratitudetoday.io/users/resetForm/'>Reset Password</a>"
                                                    "HTMLPart": "<table width='100%'><tr width='100%'><td style='background-color:#cb1103;'><a href='http://www.gratitudetoday.io'><img src='https://www.gratitudetoday.io/logo-gratitudetoday-red.png'></img></a></td></tr>"+
                                                        "<tr style='width='100%'>"+
                                                        "<td>"+
                                                        
                                                        "<h3>Hey Friend,<h3/>"+
                                                        
                                                        " <p>Click the link below to activate your account</p>"+
                                                            "<a href='"+host+"/activateAccount/"+user._id+"'>Activate Acccount</a>"+
                                                            
                                                            
                                                        "</td>"+
                                                        
                                                        "</tr>"+

                                                    "</table>"
                                    

                                            }
                                    ]
                                });
                                request
                                    .then((result) => {
                                        // console.log(result.body);
                                        // logger.debug("send user back:"+user);
                                        res.send(user)
                                    })
                                    .catch((err) => {
                                        logger.debug(err.statusCode);
                                        res.send(err.statusCode);

                                    })
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
////ACTIVATE USER////
////////////////////
router.post('/activateAccount/:id', function(req, res) {
  
  try {
    
    const user = User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body._id)}, {$set: {activated: "y"}}, {new: true}, (err, doc) => {
      if (err) {
        logger.error("err:"+err.message);
        res.send(err.message);
      }
      console.log(user);
      res.send(JSON.stringify(doc));
      
  });
  }
  catch(err) {
    logger.error("catch err:"+logger.error({message: e.message, stack: e.stack}));
  }
});   


 ////////////////////
////UPDATE DETAILS//
////////////////////
router.post('/updateAccount/', async function(req,res){
  logger.debug("update user account: "+req.body.id);
  User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.id)}, {$set: {firstname: req.body.firstname, lastname: req.body.lastname, bio: req.body.bio, location: req.body.location, url:req.body.url}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
    res.send(JSON.stringify(doc))
  });
});


router.get('/info/:id', function(req, res) {
    logger.debug(req.params.id);
  
  if (err){ 
    logger.error(err.message);
    res.send("info error:"+err.message);
    //next();  
  }
  res.send(req.params.id);
});        

        

 ////////////////////
////SEND EMAIL Reset//
////////////////////
router.post('/sendReset/',function(req,res){
  var emailAddress=req.body.email;
  //console.log("session: " + JSON.stringify(req));
  User.findOne({ email:emailAddress}, function (error, user) {
  if(user){
  //create guid to send to user with id in url
    logger.debug("user exists");
    logger.info("Send Reset Password Email");
      // const mailjet = require ('node-mailjet')
      // .connect(`${global.gConfig.mailjet_api_key}`, `${global.gConfig.mailjet_secret_key}`);
      // logger.debug("send email...");
      // const request = mailjet
      // .post("send", {'version': 'v3.1'})
      // .request({
      //     "Messages":[
      //             {
      //                     "From": {
      //                             "Email": "adrian@gratitudetoday.io",
      //                             "Name": "GratitudeToday.io"
      //                     },
      //                     "To": [
      //                             {
      //                                     "Email":emailAddress,
      //                                     "Name": user.firstname+ " "+ user.lastname
      //                             }
      //                     ],
      //                     "Subject": "Reset Your Password",
      //                     //"TextPart": "Dear "+user.firstname+", welcome to GratitudeToday! May the delivery force be with you!",
      //                     // "HTMLPart": "<h3>Dear "+user.firstname+", Click the link below to reset your password.<br/><br/>"+
      //                     // "<a href='https://gratitudetoday.io/users/resetForm/'>Reset Password</a>"
      //                     "HTMLPart": "<table width='100%'><tr width='100%'><td style='background-color:#cb1103;'><a href='http://www.gratitudetoday.io'><img src='https://www.gratitudetoday.io/logo-gratitudetoday-red.png'></img></a></td></tr>"+
      //                       "<tr style='width='100%'>"+
      //                       "<td>"+
                            
      //                       "<h3>Hey Adrian,<h3/>"+
                            
      //                       " <p>Click the link below to activate your account</p>"+
      //                           "<a href='http://localhost:3000/resetForm/?id="+user._id+"'>Reset Password</a>"+
                                
                                
      //                         "</td>"+
                              
      //                       "</tr>"+

      //                     "</table>"
		

      //             }
      //     ]
      // })
      // request
      // .then((result) => {
          
      //     res.send(result.body);
      // })
      // .catch((err) => {
      //     logger.error(err.statusCode)
      //     res.send(err.statusCode);
      // })
      res.send(result.body);
    
  }else{
    logger.error("User not found!");
    res.send("Email not found, no user");
  }
  });
});
router.post('/resetPassword/', async function(req,res){
  logger.debug("Id:"+req.body.id);
  // logger.debug("password: "+req.body.password);
  var pwd = req.body.password;
  
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      logger.error("BCrype issue");
      const error = new Error("Unable to reset password.");
      //throw new Error('User email account already exists.');
      res.status(420);
      res.send(JSON.stringify(error.message));

    }
    //console.log('Salt: ' + salt);
    bcrypt.hash(pwd, salt, function (err, hash) {
      User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.id)}, {$set: {password: pwd}}, {new: true}, (err, doc) => {
        if (err) {
            logger.error("Something wrong updating password");
            res.send(JSON.stringify(err.message));
        }
        // console.log(doc);
        res.send(JSON.stringify(pwd));
     });
    });
  }); 
  
}); 
router.get('/activateAccount/:id', function(req, res) {
    logger.debug(req.params.id);
    //update
    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {$set: {activated:"y"}}, {new: true}, (err, doc) => {
    if (err) {
        logger.error(err.message);
        res.send(err.message);
    }
    console.log(doc);
        logger.debug(req.params.id);
        res.send(JSON.stringify(doc));
    });
});    
 
       
module.exports = router;