var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
var Post = require("../models/PostModel");


///////////////////////
//// GET ALL POSTS ////
///////////////////////
router.get('/', function(req, res) {
  //get all posts and return for admin
  console.log("get them all");
  Post.find({}, function (err, posts) {
    
    if (err){ 
        console.log("err:"+err);
        res.send(err.message);
        next();  
    }
    res.json(posts);
          
  });        
});
router.post('/',function(req,res){      
    console.log("user: "+req.body._id);
    console.log("user: "+req.body.postMsg)
  
    var post = new Post({
            userid: req.body._id,
            postMsg: req.body.postMsg,
            postMediaType:"n",
            postMedia:""
        });
        post.save(function (error, post) {
            if (error){ 
                console.log("err:"+error);
                res.send(error.message);
                next();  
            }
            res.send(post)
            
                  
    }); 
        
  });
module.exports = router;
