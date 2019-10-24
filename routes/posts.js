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
  try{
    logger.debug("get posts");
    var dateDesc = {createDate: 1};

        const posts = Post.find({}, function (err, results) {

            if (err) {
              logger.error(err.message);  
              res.send(err.message);
                

            }

        }).sort(dateDesc);
        
        res.send(posts);
      }
      catch(err) {
        logger.error("Error posts");  
        res.send(err.message);
      }
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
    
  
    var post = new Post({
            userid: req.body.userid,
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
           
          }); 
          res.send(post)
      }); 
        
});
module.exports = router;
