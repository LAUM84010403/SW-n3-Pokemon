//PAGE DE BASE DE LA PAGE, C'EST ICI QUE TOUT COMMENCE

console.log("Je suis prêt à commencer");

const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./.src/config/db.js");

//initier swagger-ui + DOCUMENTATIONS
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./.src/config/documentation.json');
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Demo API"
};
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

//ACCEUIL
app.get('/', (req, res) => {
    res.send("<h1>Mon premier serveur web n3 sur express !</h1>");
});

//ROUTES POKEMON
const routes = require('./routes/routes_pokemon.js');
app.use('/api/pokemon/', routes);




app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});