var express = require('express'),
    router = express.Router(),
    logger = require('../logger/logger'),
    Post = require("../models/PostModel"),
    User = require("../models/UserModel"),
    mongoose=require('mongoose');



///////////////////////
//// GET ALL POSTS ////
///////////////////////

router.get('/', function(req, res) {
  logger.debug('get all posts...');
  try{
      var q = Post.find({}).populate('user').sort({'createDate': -1});
      q.exec(function(err, posts) {
        if (err){ 
                  logger.error('Could not get all posts');
                  res.send(err.message);
                  next();  
        }
        res.json(posts);
      })
  }
  catch(err){
    //no posts yet, load page anyway
    logger.debug('no posts');
    
  }
});
  
  // });
  // var getUser = function (propertyName) {
  //   return obj[];
  // };

router.post('/updateProfileAccount/', async function(req,res){
  logger.debug("update user account: "+req.body.id);
  User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.id)}, {$set: {firstname: req.body.firstname, lastname: req.body.lastname, bio: req.body.bio, location: req.body.location, url:req.body.url}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
    res.send(JSON.stringify(doc))
  });
});

///////////////////////
//// CREATE POST////
///////////////////////
router.post('/',function(req,res){      
    // logger.debug("MSG: "+req.body.postMsg);
    // logger.debug("user ID: "+req.body.userid);
    logger.debug("add post...:" +req.body.userid);
    //get user value and put into post values for each post
      var post = new Post({
           
            user: req.body.userid,
            postMsg: req.body.postMsg,
            postMediaType :  "",
            postMedia :   ""
        });
        post.save(function (error, post) {
          if (error){ 
            logger.error(error.message);
            res.send(error.message);
            
          }
          res.send(post)
      }); 
});
//route to get user data by user id
//left hand profile, etc
router.get('/userInfo/:id', function(req, res) {
  logger.debug("Get UserInfo: "+req.params.id);
  const user= User.findById(req.params.id, function (err, user) {
    if (err){ 
    logger.error("Get User Error: "+err.message);
      res.send(err.message);
      next();  
    }
    
    res.send(user);
  });
});  
module.exports = router;
