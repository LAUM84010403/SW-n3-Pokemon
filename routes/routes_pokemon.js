//ROUTES DE l'API POKEMON

//configuration
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();

//controlleurs
const controller = require('../controlleurs/pokemon.controllers.js');


//PAGE D'ACCEUIL DE /api/pokemon
router.get('/', (req, res) => {
    res.send("<h1>BOJUR SUL MON HAPI!</h1>")
});




//AFFICHER TOUT LES POKEMONS
router.get('/tous', controller.afficherTousPokemon);

//AFFICHER UN POKEMON
router.get('/:id', controller.afficherUnPokemon);

//AFFICHER LISTE POKEMON
router.get('/type/:type', controller.afficherListe);

//SUPPRIMER UN POKEMON
router.delete('/:id', controller.supprimerPokemon);

//MODIFIER POKEMON
router.put('/', controller.modifierPokemon);

//AJOUTER POKEMON
router.post('/', controller.ajouterPokemon);

//Afficher Page
module.exports = router;
