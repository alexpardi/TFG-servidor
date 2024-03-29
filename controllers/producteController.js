const Producte = require ("../model/Producte")



exports.crearProducte = async (req, res) => {
    try{
        let producte;

        producte = new Producte(req.body);
        await producte.save()
        res.send(producte);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

//tots els productes que hi ha a la BD
exports.obtenirProductes = async (req, res) => {
    try{
        const productes = await Producte.find();
        res.json(productes)
    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.actualitzarProducte = async (req, res) => {
    try{
        const { ProdDescripcio, ProdID, ProdImatge, ProdNom, ProdPreu, ProdTipus, ProdMarca, ProdEsport, ProdAfegits, ProdAfegitsS, ProdAfegitsM, ProdAfegitsL, ProdAfegitsXL, ProdAfegits37, ProdAfegits38, ProdAfegits39, ProdAfegits40, ProdAfegits41, ProdAfegits42, ProdAfegits43, ProdAfegits44, ProdAfegits45} = req.body;
        let producte = await Producte.findById(req.params.id);

        if(!producte){
            res.status(404).json({ msg: 'El producte no existeix'})
        }


        producte.ProdDescripcio = ProdDescripcio;
        producte.ProdID = ProdID;
        producte.ProdImatge = ProdImatge;
        producte.ProdNom = ProdNom;
        producte.ProdPreu = ProdPreu;
        producte.ProdTipus = ProdTipus;
        producte.ProdMarca = ProdMarca;
        producte.ProdEsport = ProdEsport;
        producte.ProdAfegits = ProdAfegits;
        producte.ProdAfegitsS = ProdAfegitsS;
        producte.ProdAfegitsM = ProdAfegitsM;
        producte.ProdAfegitsL = ProdAfegitsL;
        producte.ProdAfegitsXL = ProdAfegitsXL;
        producte.ProdAfegits37 = ProdAfegits37;
        producte.ProdAfegits38 = ProdAfegits38;
        producte.ProdAfegits39 = ProdAfegits39;
        producte.ProdAfegits40 = ProdAfegits40;
        producte.ProdAfegits41 = ProdAfegits41;
        producte.ProdAfegits42 = ProdAfegits42;
        producte.ProdAfegits43 = ProdAfegits43;
        producte.ProdAfegits44 = ProdAfegits44;
        producte.ProdAfegits45 = ProdAfegits45;

        producte = await Producte.findOneAndUpdate({ _id: req.params.id }, producte, {new:true});
        res.json(producte);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

//un unic producte per id
exports.obtenirProducte = async (req, res) => {
    try{
        let producte = await Producte.findById(req.params.id);

        if(!producte){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        res.json(producte);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.eliminarProducte = async (req, res) => {
    try{
        let producte = await Producte.findById(req.params.id);

        if(!producte){
            res.status(404).json({ msg: 'El producte no existeix'})
        }
        await Producte.findOneAndRemove({_id:req.params.id});

        res.json({msg: 'Producte eliminat correctament'});

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.desplegableG = async (req, res) => {
    try{
        let producte = await Producte.find({ProdEsport: req.params.esport});

        if(!producte){
            res.status(404).json({ msg: 'El producte no existeix'})
        }
        res.json(producte)
    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

exports.desplegableP = async (req, res) => {
    try{
        let producte = await Producte.find({ProdEsport: req.params.esport , ProdTipus: req.params.tipus});

        if(!producte){
            res.status(404).json({ msg: 'El producte no existeix'})
        }
        res.json(producte)
    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}