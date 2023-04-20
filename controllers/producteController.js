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
        const { ProdAfegits, ProdDescripcio, ProdID, ProdImatge, ProdNom, ProdPreu, ProdTalla } = req.body;
        let producte = await Producte.findById(req.params.id);

        if(!producte){
            res.status(404).json({ msg: 'El producte no existeix'})
        }

        producte.ProdAfegits = ProdAfegits;
        producte.ProdDescripcio = ProdDescripcio;
        producte.ProdID = ProdID;
        producte.ProdImatge = ProdImatge;
        producte.ProdNom = ProdNom;
        producte.ProdPreu = ProdPreu;
        producte.ProdTalla = ProdTalla;

        producte = await Producte.findOneAndUpdate({ _id: req.params.id }, producte, {new:true});
        res.json(producte);

    }catch (error){
        console.log(error);
        res.status(500).send('Hi ha un error');
    }
}

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