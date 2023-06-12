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
    LlistaFavorits: {
        type: Array
    },
    LlistaCistell: {
        type: Array
    },
    LlistaTallaCistell:{
        type:Array
    },
    LlistaQuantitatCistell:{
        type:Array
    },
    LlistaCompresAnteriors:{
        type: Array
    },
    TallaCompresAnteriors:{
        type: Array
    },
    ProdTCistell:{
        type: Number
    },

});

module.exports = mongoose.model('Client', UserSchema);