const Client = require ("../model/Client");
const Producte = require("../model/Producte");

exports.afegirCistell = async (req, res) => {
    try{
        const {UserName, LlistaProductes, TallaProducte} = req.body;
        const user = await Client.findOne({UserName: UserName})
        if(!user) {
            return res.status(404).send("L'usuari no existeix");
        }
        user.LlistaCistell.push(LlistaProductes);
        user.LlistaTallaCistell.push(TallaProducte);
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

exports.getTalles = async (req, res) => {
    try{
        let user = await Client.findById(req.params.id);

        if(!user){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        var talles = [];
        for (let i=0; i < user.LlistaTallaCistell.length; i++){
            talles.push(await user.LlistaTallaCistell[i]);
        }

        res.json(talles);

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
        user.LlistaTallaCistell.splice(index, 1);

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

            if(client.LlistaTallaCistell[i] =="TU"){
                producte.ProdAfegits = producte.ProdAfegits - 1;
            }
            if(client.LlistaTallaCistell[i] =="S"){
                producte.ProdAfegitsS = producte.ProdAfegitsS - 1;
            }
            if(client.LlistaTallaCistell[i] =="M"){
                producte.ProdAfegitsM = producte.ProdAfegitsM - 1;
            }
            if(client.LlistaTallaCistell[i] =="L"){
                producte.ProdAfegitsL = producte.ProdAfegitsL - 1;
            }
            if(client.LlistaTallaCistell[i] =="XL"){
                producte.ProdAfegitsXL = producte.ProdAfegitsXL - 1;
            }
            if(client.LlistaTallaCistell[i] =="37"){
                producte.ProdAfegits37 = producte.ProdAfegits37 - 1;
            }
            if(client.LlistaTallaCistell[i] =="38"){
                producte.ProdAfegits38 = producte.ProdAfegits38 - 1;
            }
            if(client.LlistaTallaCistell[i] =="39"){
                producte.ProdAfegits39 = producte.ProdAfegits39 - 1;
            }
            if(client.LlistaTallaCistell[i] =="40"){
                producte.ProdAfegits40 = producte.ProdAfegits40 - 1;
            }
            if(client.LlistaTallaCistell[i] =="41"){
                producte.ProdAfegits41 = producte.ProdAfegits41 - 1;
            }
            if(client.LlistaTallaCistell[i] =="42"){
                producte.ProdAfegits42 = producte.ProdAfegits42 - 1;
            }
            if(client.LlistaTallaCistell[i] =="43"){
                producte.ProdAfegits43 = producte.ProdAfegits43 - 1;
            }
            if(client.LlistaTallaCistell[i] =="44"){
                producte.ProdAfegits44 = producte.ProdAfegits44 - 1;
            }
            if(client.LlistaTallaCistell[i] =="45"){
                producte.ProdAfegits45 = producte.ProdAfegits45 - 1;
            }




            producte = await Producte.findOneAndUpdate({ _id: client.LlistaCistell[i] }, producte, {new:true});
            client.LlistaCompresAnteriors.push(client.LlistaCistell[i]);
        }
        client.LlistaCistell= [];
        client.LlistaTallaCistell=[]
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