const Client = require ("../model/Client");
const Producte = require("../model/Producte");

exports.afegirCistell = async (req, res) => {
    try{
        const {UserName, LlistaProductes} = req.body;
        const user = await Client.findOne({UserName: UserName})
        if(!user) {
            return res.status(404).send("L'usuari no existeix");
        }
        user.LlistaCistell.push(LlistaProductes);
        userChanged = await Client.findOneAndUpdate({UserName: UserName}, user, {new:true});
        res.json(userChanged);
    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.getCistell = async (req, res) => {
    try{
        let user = await Client.findById(req.params.id);

        if(!user){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        var producte = [];
        for (let i=0; i < user.LlistaCistell.length; i++){
            producte.push(await Producte.findById(user.LlistaCistell[i]));
        }

        res.json(producte);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.eliminarCistell = async (req, res) => {
    try{
        const {UserName, LlistaProductes} = req.body;
        const user = await Client.findOne({UserName: UserName})
        if(!user) {
            return res.status(404).send("L'usuari no existeix");
        }

        var index = user.LlistaCistell.indexOf(LlistaProductes);
        user.LlistaCistell.splice(index, 1);

        userChanged = await Client.findOneAndUpdate({UserName: UserName}, user, {new:true});
        res.json(userChanged);
    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.realitzarCompra = async (req, res) => {
    try{
        const {UserName}= req.body;
        const client = await Client.findOne({UserName: UserName})

        for(let i=0; i<client.LlistaCistell.length; i++){
            let producte = await Producte.findById(client.LlistaCistell[i]);

            if(!producte){
                res.status(404).json({ msg: 'El producte no existeix'})
            }
            producte.ProdAfegits = producte.ProdAfegits - 1;
            producte = await Producte.findOneAndUpdate({ _id: client.LlistaCistell[i] }, producte, {new:true});
            client.LlistaCompresAnteriors.push(client.LlistaCistell[i]);
        }
        client.LlistaCistell= [];
        await Client.findOneAndUpdate({UserName: UserName}, client, {new:true});


    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.getCompresAnteriors = async (req, res) => {
    try{
        let user = await Client.findById(req.params.id);

        if(!user){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        var producte = [];
        for (let i=0; i < user.LlistaCompresAnteriors.length; i++){
            producte.push(await Producte.findById(user.LlistaCompresAnteriors[i]));
        }

        //Esto permite ordenar por Precio!! manejar para usarla en diferentes lados!!
        producte.sort(function (a, b) {
            if (a.ProdPreu > b.ProdPreu) {
                return 1;
            }
            if (a.ProdPreu < b.ProdPreu) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        //hasta aquí!!!

        res.json(producte);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}