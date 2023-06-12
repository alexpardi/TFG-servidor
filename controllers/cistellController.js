const Client = require ("../model/Client");
const Producte = require("../model/Producte");
const Comanda = require("../model/comanda")

exports.afegirCistell = async (req, res) => {
    try{
        const {UserName, LlistaProductes, TallaProducte} = req.body;
        const user = await Client.findOne({UserName: UserName})
        if(!user) {
            return res.status(404).send("L'usuari no existeix");
        }

        let existeix = false;
        for(let i=0; i< user.LlistaCistell.length; i++){
            if (user.LlistaCistell[i] == LlistaProductes){
                if(user.LlistaTallaCistell[i] == TallaProducte){
                    user.LlistaQuantitatCistell[i] = user.LlistaQuantitatCistell[i] + 1;
                    existeix = true;
                    break;
                }
            }
        }
        if(!existeix){
            user.LlistaCistell.push(LlistaProductes);
            user.LlistaTallaCistell.push(TallaProducte);
            user.LlistaQuantitatCistell.push(1);
        }
        user.ProdTCistell = user.ProdTCistell +1;

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

exports.getQuantitat = async (req, res) => {
    try{
        let user = await Client.findById(req.params.id);

        if(!user){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        var quantitat = [];
        for (let i=0; i < user.LlistaQuantitatCistell.length; i++){
            quantitat.push(await user.LlistaQuantitatCistell[i]);
        }

        res.json(quantitat);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.getProdTCistell = async (req, res) => {
    try{
        let user = await Client.findById(req.params.id);

        if(!user){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        res.json(user.ProdTCistell);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.eliminarCistell = async (req, res) => {
    try{
        const {UserName, LlistaProductes, TallaProducte} = req.body;
        const user = await Client.findOne({UserName: UserName})
        if(!user) {
            return res.status(404).send("L'usuari no existeix");
        }

        var index=0;
        for(let i=0; i<user.LlistaCistell.length; i++){
            if(user.LlistaCistell[i] == LlistaProductes){
                if(user.LlistaTallaCistell[i] == TallaProducte){
                    index = i;
                }
            }
        }

        user.LlistaCistell.splice(index, 1);
        user.LlistaTallaCistell.splice(index, 1);
        user.ProdTCistell = user.ProdTCistell - user.LlistaQuantitatCistell[index];
        user.LlistaQuantitatCistell.splice(index, 1);

        userChanged = await Client.findOneAndUpdate({UserName: UserName}, user, {new:true});
        res.json(userChanged);
    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.realitzarCompra = async (req, res) => {
    try{
        const {UserName, Pais, Ciutat, CodiPostal, CarrerNum, NumeroTelf}= req.body;
        const client = await Client.findOne({UserName: UserName})
        const LlistaProductes =[];
        const TallaProductes =[];
        const QuantitatProductes =[];

        var realitza= true;
        for (let i = 0; i < client.LlistaCistell.length; i++) {
            let producte = await Producte.findById(client.LlistaCistell[i]);


            if (!producte) {
                res.status(404).json({msg: 'El producte no existeix'})
            }

            if (client.LlistaTallaCistell[i] == "TU" && ((producte.ProdAfegits - client.LlistaQuantitatCistell[i]) >= 0)) {
                //producte.ProdAfegits = producte.ProdAfegits - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "S" && ((producte.ProdAfegitsS - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegitsS = producte.ProdAfegitsS - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "M" && ((producte.ProdAfegitsM - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegitsM = producte.ProdAfegitsM - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "L" && ((producte.ProdAfegitsL - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegitsL = producte.ProdAfegitsL - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "XL" && ((producte.ProdAfegitsXL - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegitsXL = producte.ProdAfegitsXL - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "37" && ((producte.ProdAfegits37 - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegits37 = producte.ProdAfegits37 - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "38" && ((producte.ProdAfegits38 - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegits38 = producte.ProdAfegits38 - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "39" && ((producte.ProdAfegits39 - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegits39 = producte.ProdAfegits39 - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "40" && ((producte.ProdAfegits40 - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegits40 = producte.ProdAfegits40 - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "41" && ((producte.ProdAfegits41 - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegits41 = producte.ProdAfegits41 - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "42" && ((producte.ProdAfegits42 - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegits42 = producte.ProdAfegits42 - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "43" && ((producte.ProdAfegits43 - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegits43 = producte.ProdAfegits43 - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "44" && ((producte.ProdAfegits44 - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegits44 = producte.ProdAfegits44 - numrep[i];
            } else if (client.LlistaTallaCistell[i] == "45" && ((producte.ProdAfegits45 - client.LlistaQuantitatCistell[i]) >=  0)) {
                //producte.ProdAfegits45 = producte.ProdAfegits45 - numrep[i];
            }else{
                realitza =false;
                res.status(404).json({ msg: 'No hi ha suficients productes.'})
            }
        }

        if(realitza) {
            for (let i = 0; i < client.LlistaCistell.length; i++) {
                let producte = await Producte.findById(client.LlistaCistell[i]);


                if (!producte) {
                    res.status(404).json({msg: 'El producte no existeix'})
                }

                if (client.LlistaTallaCistell[i] == "TU" && ((producte.ProdAfegits - client.LlistaQuantitatCistell[i]) >= 0)) {
                    producte.ProdAfegits = producte.ProdAfegits - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "S" && ((producte.ProdAfegitsS - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegitsS = producte.ProdAfegitsS - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "M" && ((producte.ProdAfegitsM - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegitsM = producte.ProdAfegitsM - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "L" && ((producte.ProdAfegitsL - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegitsL = producte.ProdAfegitsL - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "XL" && ((producte.ProdAfegitsXL - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegitsXL = producte.ProdAfegitsXL - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "37" && ((producte.ProdAfegits37 - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegits37 = producte.ProdAfegits37 - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "38" && ((producte.ProdAfegits38 - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegits38 = producte.ProdAfegits38 - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "39" && ((producte.ProdAfegits39 - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegits39 = producte.ProdAfegits39 - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "40" && ((producte.ProdAfegits40 - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegits40 = producte.ProdAfegits40 - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "41" && ((producte.ProdAfegits41 - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegits41 = producte.ProdAfegits41 - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "42" && ((producte.ProdAfegits42 - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegits42 = producte.ProdAfegits42 - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "43" && ((producte.ProdAfegits43 - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegits43 = producte.ProdAfegits43 - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "44" && ((producte.ProdAfegits44 - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegits44 = producte.ProdAfegits44 - client.LlistaQuantitatCistell[i];
                } else if (client.LlistaTallaCistell[i] == "45" && ((producte.ProdAfegits45 - client.LlistaQuantitatCistell[i]) >=  0)) {
                    producte.ProdAfegits45 = producte.ProdAfegits45 - client.LlistaQuantitatCistell[i];
                }/*else{
                    //realitza =false;
                    res.status(404).json({ msg: 'No hi ha suficients productes.'})
                }*/

                producte = await Producte.findOneAndUpdate({_id: client.LlistaCistell[i]}, producte, {new: true});
                client.LlistaCompresAnteriors.push(client.LlistaCistell[i]);
                client.TallaCompresAnteriors.push(client.LlistaTallaCistell[i]);

                LlistaProductes.push(client.LlistaCistell[i]);
                TallaProductes.push(client.LlistaTallaCistell[i]);
                QuantitatProductes.push(client.LlistaQuantitatCistell[i]);
            }

            let UserNameReal = client.UserNameReal;
            let UserMail = client.UserMail;
            let realitzada = "falso";

            const comanda = new Comanda({
                UserName,
                UserNameReal,
                UserMail,
                Pais,
                Ciutat,
                CodiPostal,
                CarrerNum,
                NumeroTelf,
                LlistaProductes,
                TallaProductes,
                QuantitatProductes,
                realitzada,
            })
            await comanda.save();

            client.LlistaCistell = [];
            client.LlistaTallaCistell = [];
            client.LlistaQuantitatCistell = [];
            client.ProdTCistell = 0;
            await Client.findOneAndUpdate({UserName: UserName}, client, {new: true});
        }
        res.json({msg: 'Compra realitzada'})

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

        res.json(producte);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.getTallaCompresAnteriors = async (req, res) => {
    try{
        let user = await Client.findById(req.params.id);

        if(!user){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        var producte = [];
        for (let i=0; i < user.TallaCompresAnteriors.length; i++){
            producte.push(user.TallaCompresAnteriors[i]);
        }

        res.json(producte);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}
