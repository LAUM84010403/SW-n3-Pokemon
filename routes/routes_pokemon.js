const express = require('express');

const mysql = require('mysql');
const router = express.Router();
const app = express();

const db = require("../.src/config/db.js");



router.get('/', (req, res) => {
    res.send("<h1>BOJUR SUL MON HAPI!</h1>")
});

router.get('/tous', (req, res) => {
    const query = 'SELECT * FROM pokemon ORDER BY id';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des pokémons :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            // Convertir les résultats en une chaîne de caractères avec un retour à la ligne entre chaque entrée
            const formattedResult = result.map(pokemon => JSON.stringify(pokemon, null, 2)).join('<br> <br>');

            // Renvoyer la chaîne formatée
            res.send(formattedResult);
        }
    });
});

router.get('/:id', (req, res) => {
    const pokemonId = parseInt(req.params.id);

    const query = 'SELECT * FROM pokemon WHERE id = ' + pokemonId + ';'

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des pokémons :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            // Renvoyer directement le tableau de résultats
            res.send(result);
                // Résultat: [{"id":64,"nom":"Paras","type_primaire":"Bug","type_secondaire":"Grass","pv":35,"attaque":70,"defense":55}]
        }
    });
});

module.exports = router;
