const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserName: {
        type: String,
        unique: true
    },
    LlistaProductes: {
        type: Array
    },


});

module.exports = mongoose.model('favorits', UserSchema);