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
  
  var q = Post.find({}).sort({'createDate': -1});
    q.exec(function(err, posts) {
      if (err){ 
              logger.error("Could not get all posts");
              res.send(err.message);
              next();  
      }

      for (var i = 0; i < posts.length; i++) {
        //user find for user data
        console.log(posts[i]);
        User.findById(posts[i].userid, function (err, user) {
          
          console.log(user.firstname);
          Array.prototype.push.apply(posts, user.firstname);
          // console.log("userid: "+posts[i].userid);
          // console.log("found user: "+user.firstname);
          
         // Array.prototype.push.apply(posts[i], user.firstname);
          
          // console.log('added?')
                
              
              
        });
        
        //Array.prototype.push.apply(posts, userVals);
      
        // User.findById(posts[i].userid, function (err, user) {
          
        //       name=user.firstname+" "+user.lastname;
        //       posts[i].push('name');
              
            
            
        // });
    
      }
      
      res.json(posts);
    });
 
});
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
            res.send(post)
          }); 
          
      }); 
        
});
module.exports = router;
