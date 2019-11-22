var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Post = require('./PostModel');

// var AvatarImage = new mongoose.Schema({
//     url: String
// });

var UserSchema = Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname:{ type:  String, required: true },
    lastname: { type:  String, required: true },
    public: Number,
    admin: Boolean,
    location: String,
    bio: String,
    avatar:  String,
    url: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    activated: String,
    createDate: {
        type: Date,
        default: Date.now
    }
});
 module.exports = mongoose.model('users', UserSchema);