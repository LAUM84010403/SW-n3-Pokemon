const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();

const controller = require('../controlleurs/pokemon.controllers.js');

const db = require("../.src/config/db.js");

router.get('/', (req, res) => {
    res.send("<h1>BOJUR SUL MON HAPI!</h1>")
});


//AFFICHER TOUT LES POKEMONS
router.get('/tous', controller.afficherTousPokemon);

//AFFICHER TOUT LES POKEMONS
router.get('/:id', controller.afficherUnPokemon);

//SUPPRIMER UN POKEMON
router.delete('/:id', controller.supprimerPokemon);

//MODIFIER POKEMON
router.put('/', controller.modifierPokemon);

//AJOUTER POKEMON
router.post('/', controller.ajouterPokemon);


module.exports = router;
