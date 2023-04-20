const User = require ("../model/User");

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs')

exports.crearUsuari = async (req, res) => {
    try{
        const {UserName, UserMail, UserNameReal, UserContrasenya} = req.body;

        const user = new User({
            UserName,
            UserMail,
            UserNameReal,
            UserContrasenya,
        })

        //encriptar Password
        user.UserContrasenya = await bcrypt.hash(UserContrasenya, 10);
        await user.save();

        //crear token
        const token = jwt.sign({id: user._id}, config.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24 * 365
        })

        res.json({auth: true, token});

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.modificaUsuari = async (req, res, next) =>{

    const user = await User.findById(req.userID, { UserContrasenya: 0 });
    if(!user){
        return res.status(404).send('No user found');
    }

    res.json(user);
}


exports.Login = async (req, res, next) =>{
    const {UserName, UserContrasenya} = req.body;
    const user = await User.findOne({UserName: UserName})

    if(!user) {
        return res.status(404).send("L'usuari no existeix");
    }

    //compara si la contrasenya es correcte
    let ContraValida = bcrypt.compareSync(UserContrasenya, user.UserContrasenya);
    if (!ContraValida){
        return res.status(404).json({auth: false, token: null});
    }

    //crear token
    const token = jwt.sign({id: user._id}, config.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 * 365
    })

    res.json({ auth: true, token });
}
