var express = require('express'),
    router = express.Router(),
    express = require('express'),
    logger = require('../logger/logger'),
    router = express.Router(),
    User = require("../models/UserModel"),
    ResetGUID= require("../models/UserResetGUID"),
    bcrypt = require('bcrypt'),
    Mailgun = require('mailgun-js'),
    uuidv1 = require('uuid/v1');
    var DOMAIN = 'gratitudetoday.io';
    var api_key = '344470aad27d953af9c982f6fdc8f0fa';
//var mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });

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
    logger.info("get single user: "+req.params.id);
    User.findById(req.params.id, function (err, user) {

    if (err){ 
     logger.error("Error: "+err.message);
      res.send(err.message);
      //next();  
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
                                logger.error("Error saving user");
                                res.send(error.message);
                               
                              }
                              else{
                                 //send email
                                    // const nylas = Nylas.with('yCe3ohYdcfoCOqbA8vR0ZOFDTkAFvB');

                                    // const draft = nylas.drafts.build({
                                    //     //from: 'GratitudeToday.io',
                                    //     subject: 'Welcome to GratitudeToday.io!',
                                    //     body:`<strong>It's great to have you join the community.</strong>  ` ,
                                    //     to: [{ name: 'GratitudeToday.io', email: 'adriannadeau.art@gmail.com' }]
                                    // });
                                    // draft.send().then(message => {
                                    //     console.log(`${message.id} was sent`);
                                    // });
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
router.put('/:id',function(req,res){
   
    logger.info("input : "+req.params.id);
    logger.info("bio : "+req.body.bio);
    logger.info("loc : "+req.body.location);
     
    
        User.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(req.body.id)},
            {$set: {bio: req.body.bio, location: req.body.location}},
            function(err, doc) {
                logger.error("error : "+err);
                logger.error("doc : "+doc);
            });
            res.send(doc);
        });

        
//  reset 
 ////////////////////
////SEND EMAIL Reset//
////////////////////
router.post('/reset',function(req,res){
  var emailAddress=req.body.email;
 
  
  //console.log("session: " + JSON.stringify(req));
  User.findOne({ email:req.body.email}, function (error, user) {
    if(user){
      var uuid1 = uuidv1();
      logger.debug("GUID"+uuid1);
      var resetguid =  ResetGUID ({
        userid:user._id,
        GUID :uuid1
       
      });
      
      resetguid.save(function (error, guid) {
          if (error){ 
            logger.error("error saving guid");
            logger.error("error: "+error.message);
            res.send(error.message);
            
          
          }
          else{
            logger.debug("user found, confirm message");
            res.send(resetguid); 
          }
      });
    }
  });
});
 //////////////////////////////////////////
////Check and send to reset password form//
///////////////////////////////////////////
router.get('/resetForm/', function(req, res) {
    logger.info("Get User ID");
    var pwd = req.body.password;
    
    if (err){ 
      
      logger.error("err:"+err);
      res.send(err.message);
      //next();  
    }
    res.send("yes");
 }); 
    // ResetGUID.findById(req.params.id, function (error, resetguid) {
    //     if (err){ 
    //         logger.error("Error: "+err.message);
    //         res.send(err.message);
    //         //next();  
    //     }else{
    //         logger.info("Return User");
    //         res.send(user);
    //     }
    
    // });          
  


router.post('/testEmail',function(req,res){
  
    const mailjet = require ('node-mailjet').connect('344470aad27d953af9c982f6fdc8f0fa', 'ea7a6f8f78dfde8e7532a1b71e254b88');
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
                {
                        "From": {
                                "Email": "pilot@mailjet.com",
                                "Name": "Mailjet Pilot"
                        },
                        "To": [
                                {
                                        "Email": "adriannadeau.art@gmail.com",
                                        "Name": "passenger 1"
                                }
                        ],
                        "Subject": "Your email flight plan!",
                        "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                        "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!"
                }
        ]
    })
request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log("error:"+err.statusCode)

    })

});

module.exports = router;
    //email user
    // logger.debug("Found user");
    //  //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    //  var mailgun = new Mailgun({apiKey: 'c690fbb47220c9f80e63b4e9777feb0f-9949a98f-70271fcc', domain: 'www.gratitudetoday.io'});
    //  var data = {
    //  //Specify email data
    //    from: 'adrian@adriannadeau.com',
    //  //The email to contact
    //    to: emailAddress,
    //  //Subject and text data  
    //    subject: 'Hello from Mailgun',
    //    html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + emailAddress + '">Click here to add your email address to a mailing list</a>'
    //  }
    //  mailgun.messages().send(data, function (err, body) {
    //   //If there is an error, render the error page
    //   if (err) {
    //      logger.error("Error sending email", err);
    //       res.render('error', { error : err});
    //       console.log("got an error: ", err);
    //   }
    //   //Else we can greet    and leave
    //   else {
    //       //Here "submitted.jade" is the view file for this landing page 
    //       //We pass the variable "email" from the url parameter in an object rendered by Jade
    //       res.render('submitted', { email : req.params.mail });
    //       console.log(body);
    //   }
  
    //create guid to send to user with id in url
    // let transporter = nodeMailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'adriannadeau.artgmail.com',
    //         pass: 'Asialouie!123'
    //     }
    // });
    // logger.info("transporter"+transporter);
    // let mailOptions = {
    //     from: '"Adrian Nadeau" <adrian@adriannadeau.com>', // sender address
    //     to: "adrian@adriannadeau.com", // list of receivers
    //     subject: "hey", // Subject line
    //     text: "hey text", // plain text body
    //     html: '<b>NodeJS Email Tutorial</b>' // html body
    // };
    // logger.info("options"+mailOptions);
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    //         //res.render('index');
    // });
  // }else{
  //   logger.log("Email not found, no user?");
  // }

        
      // const nylas = Nylas.with('yCe3ohYdcfoCOqbA8vR0ZOFDTkAFvB');
      // const draft = nylas.drafts.build({
      //   //from: 'GratitudeToday.io',
      //   subject: 'GratitudeToday.io password reset',
      //   body:`Click the following link to reset your password. ` ,
      //   to: [{ name: 'GratitudeToday.io', email: 'adriannadeau.art@gmail.com' }]
      // });
      // draft.send().then(message => {
      //     console.log(`${message.id} was sent`);
    // });
       
