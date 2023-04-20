const express = require('express');
const connectarDB= require("./config/db");
const cors = require("cors");




//Crear servidor
const app = express();

//Conectamos a la BD
connectarDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/productes', require('./routes/producte'));

app.use('/api/user', require('./routes/user'));

app.listen(4000, () => {
    console.log('El servidor esta corriendo perfectamente')
})