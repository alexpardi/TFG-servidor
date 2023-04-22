const mongoose = require('mongoose');

const ProducteSchema = mongoose.Schema({
    ProdID: {
        type: String,
        required: true,
        unique: true
    },
    ProdNom: {
        type: String,
        required: true,
        unique: true
    },
    ProdAfegits: {
        type: Number,
        required: true
    },
    ProdDescripcio: {
        type: String,
        required: true
    },
    ProdPreu: {
        type: Number,
        required: true
    },
    ProdTalla: {
        type: Number,
        required: true
    },
    ProdImatge: {
        type: String,
        required: true
    },
    /*fechaCreacion: {
        type:Date,
        default: Date.now()
    }*/
});

module.exports = mongoose.model('Producte', ProducteSchema);