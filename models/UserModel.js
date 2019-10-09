var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstname: String,
        lastname: String,
        public: Number,
        admin: Boolean,
        location: String,
        bio: String,
        avatar: String,
        url: String,
        createDate: {
            type: Date,
            default: Date.now
        }
    });


    module.exports = mongoose.model('users', UserSchema);