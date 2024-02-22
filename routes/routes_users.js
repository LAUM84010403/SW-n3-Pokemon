//ROUTES DE l'API USAGERS

//configuration
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();

//controlleurs USERS
const controller = require('../controlleurs/users.controllers.js');


//PAGE D'ACCEUIL DE /api/pokemon
router.get('/', (req, res) => {
    res.send("<h1>BOJUR SUL MON HAPI, HUTYLISATEUX!</h1>")
});

router.post('/', controller.creerUtilisateur);

module.exports = router;


