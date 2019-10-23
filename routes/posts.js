var express = require('express'),
    router = express.Router(),
    logger = require('../logger/logger'),
    Post = require("../models/PostModel"),
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
                
// router.get('/', function(req, res) {
//   //get all posts and return for admin
//   // Post.find({}).sort('-date').exec(function(err, docs) {  });
//   logger.info("get all posts");
//     posts = Post.sort('createDate').exec(function(err, docs) {
//       logger.debug(posts);
//     if (err){ 
//         console.log("err:"+err);
//         res.send(err.message);
         
//     }
//     res.json(posts);
          
//   });        
// });

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
