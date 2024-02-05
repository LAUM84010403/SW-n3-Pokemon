console.log("Je suis prêt à commencer");
// Importer le module express
const express = require('express');
const mysql = require('mysql');
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();
const app = express();
const PORT = 3000;
const db = require("./.src/config/db.js");

app.get('/', (req, res) => {
    res.send("<h1>Mon premier serveur web n3 sur express !</h1>");
});


const routes = require('./routes/routes_pokemon.js');
app.use('/api/pokemon/', routes);


app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});