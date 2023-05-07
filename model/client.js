const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserName: {
        type: String,
        unique: true
    },
    UserMail: {
        type:String
    },
    UserNameReal: {
        type: String
    },
    UserContrasenya: {
        type: String
    },
    LlistaProductes: {
        type: Array
    },

});

module.exports = mongoose.model('Client', UserSchema);