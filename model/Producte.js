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
    ProdDescripcio: {
        type: String,
        required: true
    },
    ProdPreu: {
        type: Number,
        required: true
    },
    ProdTipus: {
        type: String,
        required: true
    },
    ProdEsport: {
        type: Array,
        required: true
    },
    ProdMarca: {
        type: String,
        required: true
    },
    ProdImatge: {
        type: String,
        required: true
    },


    ProdAfegits: {
        type: Number,
    },
    ProdAfegitsS: {
        type: Number,
    },
    ProdAfegitsM: {
        type: Number,
    },
    ProdAfegitsL: {
        type: Number,
    },
    ProdAfegitsXL: {
        type: Number,
    },
    ProdAfegits37: {
        type: Number,
    },
    ProdAfegits38: {
        type: Number,
    },
    ProdAfegits39: {
        type: Number,
    },
    ProdAfegits40: {
        type: Number,
    },
    ProdAfegits41: {
        type: Number,
    },
    ProdAfegits42: {
        type: Number,
    },
    ProdAfegits43: {
        type: Number,
    },
    ProdAfegits44: {
        type: Number,
    },
    ProdAfegits45: {
        type: Number,
    },

    /*fechaCreacion: {
        type:Date,
        default: Date.now()
    }*/
});

module.exports = mongoose.model('Producte', ProducteSchema);