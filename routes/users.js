var express = require('express'),
    router = express.Router(),
    express = require('express'),
    logger = require('../logger/logger'),
    router = express.Router(),
    User = require("../models/UserModel"),
    mongoose=require('mongoose'),
    bcrypt = require('bcrypt'),
    assert = require('assert')
    
    

    

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
    
    User.findById(req.params.id, function (err, user) {

    if (err){ 
     logger.error("Error: "+err.message);
      res.send(err.message);
      //next();  
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
                            
                          firstname:req.body.firstname,
                          lastname :req.body.lastname,
                          email :req.body.email,
                          password : hash,
                          public:1,
                          admin: false,
                          bio : "",
                          location : "",
                          avatar: "",
                          url: ""
                        });
                          user.save(function (error, user) {
                              if (error){ 
                                console.log("err:"+error);
                                res.send(error.message);
                              //send email
                              }
                              else{
      //                               const mailjet = require ('node-mailjet').connect("344470aad27d953af9c982f6fdc8f0fa", "ea7a6f8f78dfde8e7532a1b71e254b88")
      // const request = mailjet
      // .post("send", {'version': 'v3.1'})
      // .request({
      //   "Messages":[
      //           {
      //                   "From": {
      //                           "Email": "adrian@adriannadeau.com",
      //                           "Name": "Adrian Nadeau"
      //                   },
      //                   "To": [
      //                           {
      //                                   "Email": "adriannadeau.art@gmail.com",
      //                                   "Name": "passenger 1"
      //                           }
      //                   ],
      //                   "Subject": "Confirm email to activate your account.",
      //                   // "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
      //                   "HTMLPart": "<html>"+
      //                   "<body>"+
      //                   "<table width='100%'>"+
      //                       "<tr width='100%'><td style='background-color:#cb1103;'><a href='http://www.gratitudetoday.io'><img src='https://www.adriannadeau.com/images/logo-horizontal.png'></img></a></td></tr>"+
	    //                     "<tr style='width='100%'<td>"+
			//                     "<br/><br/>"+
			//                     "<h3>Hey, Adrian</h3><br/><br/>"+
			//                     "<font face='arial'>Welcome to <a href='https://www.gratitudetoday.io'>GratitudeToday.io</a>!</font>"+
			//                     "<br /><br/><font face='arial'>Click the link below to activate your account</font><br/><br/>"+
			 
			//                     "<button type='submit' onClick='window.location.href='http://localhost:3000/resetForm/'>Activate Account</button>"+
			
			
      //                           "</td>"+
                                
      //                       "</tr>"+

      //                   "</table>"+
                                
      //                   "</body>"+
      //                   "</html>"
      //           }
      //   ]
      // })
      // request
      // .then((result) => {
      //     console.log(result.body)
      // })
      // .catch((err) => {
        
      //     console.log(err.statusCode)
      // })

                               res.send(user)
                            }
                          
                             
                              
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

router.post('/updateAccount/', async function(req,res){

  User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.id)}, {$set: {bio: req.body.bio, location: req.body.location, url:req.body.url}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
    res.send(JSON.stringify(doc))
  });
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
      const mailjet = require ('node-mailjet')
      .connect(`${global.gConfig.mailjet_api_key}`, `${global.gConfig.mailjet_secret_key}`);
      logger.debug("send email...");
      const request = mailjet
      .post("send", {'version': 'v3.1'})
      .request({
          "Messages":[
                  {
                          "From": {
                                  "Email": "adrian@gratitudetoday.io",
                                  "Name": "GratitudeToday.io"
                          },
                          "To": [
                                  {
                                          "Email":emailAddress,
                                          "Name": user.firstname+ " "+ user.lastname
                                  }
                          ],
                          "Subject": "Reset Your Password",
                          //"TextPart": "Dear "+user.firstname+", welcome to GratitudeToday! May the delivery force be with you!",
                          // "HTMLPart": "<h3>Dear "+user.firstname+", Click the link below to reset your password.<br/><br/>"+
                          // "<a href='https://gratitudetoday.io/users/resetForm/'>Reset Password</a>"
                          "HTMLPart": "<table width='100%'><tr width='100%'><td style='background-color:#cb1103;'><a href='http://www.gratitudetoday.io'><img src='https://www.gratitudetoday.io/logo-gratitudetoday-red.png'></img></a></td></tr>"+
                            "<tr style='width='100%'>"+
                            "<td>"+
                            
                            "<h3>Hey Adrian,<h3/>"+
                            
                            " <p>Click the link below to activate your account</p>"+
                                "<a href='http://localhost:3000/resetForm/?id="+user._id+"'>Reset Password</a>"+
                                
                                
                              "</td>"+
                              
                            "</tr>"+

                          "</table>"
		

                  }
          ]
      })
      request
      .then((result) => {
          console.log(result.body);
          res.send(result.body);
      })
      .catch((err) => {
          console.log(err.statusCode)
          res.send(err.statusCode);
      })
      
    
  }else{
    
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
 
       
module.exports = router;