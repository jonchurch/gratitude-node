var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var UserResetGUID = new Schema({
         userid: { type: String, required: true },
        GUID: { type: String, required: true },
        
        
        createDate: {
            type: Date,
            default: Date.now
        }
    });


    module.exports = mongoose.model('resetGUID', UserResetGUID);