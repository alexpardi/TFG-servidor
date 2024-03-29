const Client = require ("../model/Client");
const Producte = require("../model/Producte");

exports.afegirFavorits = async (req, res) => {
    try{
        const {UserName, LlistaProductes} = req.body;
        const user = await Client.findOne({UserName: UserName})
        if(!user) {
            return res.status(404).send("L'usuari no existeix");
        }
        var existeix = false;
        for (let i=0; i < user.LlistaFavorits.length; i++){
            if (user.LlistaFavorits[i] == LlistaProductes){
                existeix = true;
            }
        }
        if(!existeix){
            user.LlistaFavorits.push(LlistaProductes);
        }
        userChanged = await Client.findOneAndUpdate({UserName: UserName}, user, {new:true});
        res.json(userChanged);
    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.getFavorits = async (req, res) => {
    try{
        let user = await Client.findById(req.params.id);

        if(!user){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        var producte = [];
        for (let i=0; i < user.LlistaFavorits.length; i++){
            producte.push(await Producte.findById(user.LlistaFavorits[i]));
        }

        res.json(producte);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.eliminarFavorit = async (req, res) => {
    try{
        const {UserName, LlistaProductes} = req.body;
        const user = await Client.findOne({UserName: UserName})
        if(!user) {
            return res.status(404).send("L'usuari no existeix");
        }

        var index = user.LlistaFavorits.indexOf(LlistaProductes);
        user.LlistaFavorits.splice(index, 1);

        userChanged = await Client.findOneAndUpdate({UserName: UserName}, user, {new:true});
        res.json(userChanged);
    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}