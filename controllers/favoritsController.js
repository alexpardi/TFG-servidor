const Client = require ("../model/Client");

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs')
const favorits = require("../model/favorits");
const Producte = require("../model/Producte");

exports.afegirFavorits = async (req, res) => {
    /*try{
        const {UserName, UserMail, UserNameReal, UserContrasenya} = req.body;
        const user = new Client({
            UserName,
            UserMail,
            UserNameReal,
            UserContrasenya,
        })
        //encriptar Password
        user.UserContrasenya = await bcrypt.hash(UserContrasenya, 10);
        await user.save();
        //crear token
        const token = jwt.sign({id: user._id, UserName: UserName}, config.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24
        })
        res.json({auth: true, token});
    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }*/
}

exports.getFavorits = async (req, res) => {
    try{
        let favorit = await Client.findById(req.params.id);

        if(!favorit){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        res.json(favorit);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}