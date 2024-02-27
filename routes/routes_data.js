//ROUTES DE l'API DATA

//configuration
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();

//controlleurs DATA
// const controller = require('../controlleurs/data.controllers.js');


//PAGE D'ACCEUIL DE /api/data
router.get('/', (req, res) => {
    res.send("<h1>CECI EST SÉCURISÉ</h1>")
});


module.exports = router;

