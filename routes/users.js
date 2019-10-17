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
  // User.findOneAndUpdate(
  //         {_id: mongoose.Types.ObjectId(req.body.id)},
  //         {$set: {bio: req.body.bio, location: req.body.location, url:req.body.url}}, {new: true}, (err, doc) => {
  //       );
  //    logger.debug("update account info");
     //kick off update
     
//     var query = User.findOneAndUpdate(
//       {_id: mongoose.Types.ObjectId(req.body.id)},
//       {$set: {bio: req.body.bio, location: req.body.location, url:req.body.url}}
//     );
//     //console.log(query);
//     assert.ok(!(query instanceof Promise));

// // A query is not a fully-fledged promise, but it does have a `.then()`.
//     query.then(function (doc) {
//       //console.log(query);
      
//       res.send("success");

// });
    

  // try{
  //   var doc = User.findOneAndUpdate(
  //           {_id: mongoose.Types.ObjectId(req.body.id)},
  //           {$set: {bio: req.body.bio, location: req.body.location, url:req.body.url}}
         
  //     )
  //     .then(() => logger.debug("need to send updated doc back: "+JSON.stringify(doc)));
        
      
  //   }
  //    catch(err) {
  //     logger.error("error : "+err.message);
  // }   
    
// }, (e) => {
//     res.status(400).send(e);
// });
  

  // try{
  //   logger.debug("update account info");
  //   await User.findOneAndUpdate(
  //       {_id: mongoose.Types.ObjectId(req.body.id)},
  //       {$set: {bio: req.body.bio, location: req.body.location, url:req.body.url}},
  //       function(err, doc) {
  //             // logger.error("error : "+err);
  //              logger.debug("doc : "+doc);
              
          
  //   });
  // }
  // catch(err) {
  //   logger.error("error : "+err.message);
  // }
  // res.send(doc);
 
  //   logger.debug("update account info");
  //   logger.info("input : "+req.body.id);
  //   logger.info("bio : "+req.body.bio);
  //   logger.info("loc : "+req.body.location);
  //   try{
  //     const filter = { _id: req.body.id };
  //     const update = { bio: req.body.bio};
  //     logger.debug("getting and updating user info");
  //     let user = await User.findOneAndUpdate(filter, update, {
  //       //new: true
  //     });
  //     logger.debug("do this doc thing");
  //     user.bio;
  //   }
  //  catch(err) {
  //   logger.error("error : "+err.message);
  //  }
  
  // } // 'Jean-Luc Picard'
  // doc.location; // 59
  // doc.url;
  

// router.post('/updateAccount/',function(req,res){
//   logger.info("update account info");
 
  
//   var _id="5da7205eda5ac83ae03f64d2"
//   logger.info("bio : "+req.body.bio);
//   logger.info("loc : "+req.body.location);
//   logger.info("url : "+req.body.url);
   

//   User.findOneAndUpdate(
//     {_id: mongoose.Types.ObjectId(req.body.id)},
//     {$set: {bio: req.body.bio, location: req.body.location, url:req.body.url}},
//     function(err, doc) {
//           logger.error("error : "+err);
//           logger.error("doc : "+doc);
      
// });

   

        
//  reset 
 ////////////////////
////SEND EMAIL Reset//
////////////////////
router.post('/reset',function(req,res){
  var emailAddress=req.body.email;
  logger.debug("send email to reset email:"+req.body.email+"get request now...");
  
  //console.log("session: " + JSON.stringify(req));
  User.findOne({ email:req.body.email}, function (error, user) {
  if(user){

    //create guid to send to user with id in url
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'adriannadeau.artgmail.com',
            pass: 'Asialouie!123'
        }
    });
    logger.info("transporter"+transporter);
    let mailOptions = {
        from: '"Adrian Nadeau" <adrian@adriannadeau.com>', // sender address
        to: "adrian@adriannadeau.com", // list of receivers
        subject: "hey", // Subject line
        text: "hey text", // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };
    logger.info("options"+mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            //res.render('index');
    });
  }else{
    logger.log("Email not found, no user?");
  }
  });
});
        
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
       
module.exports = router;