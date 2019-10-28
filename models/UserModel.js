var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstname:{ type:  String, required: true },
        lastname: { type:  String, required: true },
        public: Number,
        admin: Boolean,
        location: String,
        bio: String,
        avatar: String,
        url: String,
        activated: String,
        // posts: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Post'
        //   }],
        createDate: {
            type: Date,
            default: Date.now
        }
    });


    module.exports = mongoose.model('users', UserSchema);