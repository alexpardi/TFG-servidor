const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserName: {
        type: String
    },
    UserMail: {
        type:String
    },
    UserNameReal: {
        type: String
    },
    Pais: {
        type: String
    },
    Ciutat: {
        type: String
    },
    CodiPostal: {
        type: String
    },
    CarrerNum: {
        type: String
    },
    NumeroTelf: {
        type: String
    },
    LlistaProductes: {
        type: Array
    },
    TallaProductes:{
        type:Array
    },
    QuantitatProductes:{
        type:Array
    },
});

module.exports = mongoose.model('Comanda', UserSchema);