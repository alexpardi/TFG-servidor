const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserName: {
        type: String,
        unique: true
    },
    UserMail: {
        type: String
    },
    UserNameReal: {
        type: String
    },
    UserContrasenya: {
        type: String
    },

});

module.exports = mongoose.model('User', UserSchema);