var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var PostSchema = new Schema({
        userid: { type: String, required: true },
        postMsg: { type: String, required: true },
        postMediaType: {type: String},
        postMedia: {type: String},
        createDate: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('posts', PostSchema);