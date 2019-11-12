var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var PostSchema = new Schema({
        userid: { type: String, required: true },
        postedBy: { type: String, required: true },
        postMsg: { type: String, required: true },
        postMediaType: {type: String},
        postMedia: {type: String},
        // postedBy: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User'
        // },
        createDate: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('posts', PostSchema);