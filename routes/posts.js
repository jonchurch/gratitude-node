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
  logger.debug("get all posts");
  var q = Post.find({}).sort({'createDate': 1});
    q.exec(function(err, posts) {
      if (err){ 
              logger.error("Could not get all posts");
              res.send(err.message);
              next();  
      }
      //logger.debug(posts);
      res.json(posts);
    });
 
});

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
    logger.debug("add post...");
  
      var post = new Post({
            userid: req.body.userid,
            postedBy:req.body.postedBy,
            postMsg: req.body.postMsg,
            postMediaType :  "",
            postMedia :   ""
        });
        post.save(function (error, post) {
          if (error){ 
            logger.error(error.message);
            res.send(error.message);
            
          }
          post.save(function (error, user) {
            if (error){ 
              console.log("err:"+error);
              res.send(error.message);
             
            }
            res.send(post)
          }); 
          
      }); 
        
});
module.exports = router;
