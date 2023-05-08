const Client = require ("../model/Client");

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs')
const Producte = require("../model/Producte");

exports.crearUsuari = async (req, res) => {
    try{
        const {UserName, UserMail, UserNameReal, UserContrasenya, LlistaProductes} = req.body;
        const user = new Client({
            UserName,
            UserMail,
            UserNameReal,
            UserContrasenya,
            LlistaProductes,
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
    }
}

exports.modificaUsuari = async (req, res) =>{
    try{
        const { ModUsuari, ModEmail, ModNom, ModContrasenya } = req.body;

        const user = await Client.findOne({UserName: ModUsuari})

        if(!user) {
            return res.status(404).send("L'usuari no existeix");
        }

        user.UserName = ModUsuari;
        user.UserMail = ModEmail;
        user.UserNameReal = ModNom;
        user.UserContrasenya = await bcrypt.hash(ModContrasenya, 10);

        userChanged = await Client.findOneAndUpdate({UserName: ModUsuari}, user, {new:true});
        res.json(userChanged);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.getUsuari = async (req, res, next) =>{

    /*const user = await User.findById(req.userID, { UserContrasenya: 0 });
    if(!user){
        return res.status(404).send('No user found');
    }

    res.json(user);*/

    try{
        let user = await Client.findById(req.params.id, {UserContrasenya: 0});

        if(!user){
            res.status(404).json({ msg: 'El usuari no existeix'})
        }

        res.json(user);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.Login = async (req, res, next) =>{
    const {UserName, UserContrasenya} = req.body;
    const user = await Client.findOne({UserName: UserName})

    if(!user) {
        return res.status(404).send("L'usuari no existeix");
    }

    //compara si la contrasenya es correcte
    let ContraValida = bcrypt.compareSync(UserContrasenya, user.UserContrasenya);
    if (!ContraValida){
        return res.status(404).json({auth: false, token: null});
    }

    //crear token
    const token = jwt.sign({id: user._id, UserName: UserName}, config.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24
    })

    res.json({ auth: true, token: token });
}