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

//AJOUT POKEMON QUI MARCHE
router.post('/', (req, res) => {

    const nom = req.body.nom;
    const type_primaire = req.body.type_primaire;
    const type_secondaire = req.body.type_secondaire;
    const pv = req.body.pv;
    const attaque = req.body.attaque;
    const defense = req.body.defense;

    if(!nom){
        return res.status(400).json({
            erreur: "Le format des données est invalide",
            champ_manquant: ["nom"]
    });
    }


    if (!nom || !type_primaire || !type_secondaire || pv === undefined || attaque === undefined || defense === undefined) {
        return res.status(400).json({
            erreur: "Le format des données est invalide",
            champ_manquant: ["nom", "type_primaire", "type_secondaire", "pv", "attaque", "defense"]
        });
    } else {
        const query = 'INSERT INTO pokemon(nom, type_primaire, type_secondaire, pv, attaque, defense) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [nom, type_primaire, type_secondaire, pv, attaque, defense];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'ajout du Pokémon :', err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else {
                // Renvoyer directement le tableau de résultats
                res.status(201).json({
                    message: `Le Pokémon ${nom} a été ajouté avec succès`,
                    pokemon: {
                        nom,
                        type_primaire,
                        type_secondaire,
                        pv,
                        attaque,
                        defense
                    }
                });
            }
        });
    }
});


module.exports = router;
