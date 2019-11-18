var mongoose = require('mongoose');
//Post = require('./PostModel');

// var AvatarImage = new mongoose.Schema({
//     url: String
// });

var UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname:{ type:  String, required: true },
    lastname: { type:  String, required: true },
    public: Number,
    admin: Boolean,
    location: String,
    bio: String,
    //avatar: [AvatarImage],
    url: String,
    activated: String,
    createDate: {
        type: Date,
        default: Date.now
    }
});
 module.exports = mongoose.model('users', UserSchema);