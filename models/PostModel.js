var mongoose = require('mongoose');

var PostSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
   // postedBy: { type: String, required: true },
   postMsg: { type: String, required: true },
   postMediaType: {type: String},
   postMedia: {type: String},
   // _user: 
   //     {
   //         type: mongoose.Schema.Types.ObjectId,
   //         ref: 'User'
   // },
 
   createDate: {
       type: Date,
       default: Date.now
   }
});

    module.exports = mongoose.model('Posts', PostSchema);
