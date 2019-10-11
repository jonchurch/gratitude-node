var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var UserResetGUID = new Schema({
        userid: { type: String, required: true},
        GUID: String,
        
        createDate: {
            type: Date,
            default: Date.now
        }
    });


    module.exports = mongoose.model('resetGUID', UserResetGUID);