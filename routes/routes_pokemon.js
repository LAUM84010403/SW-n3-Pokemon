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

router.post('/', (req, res) => {
    // Récupérez les données du corps de la requête
    const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;

    // Vérifiez si toutes les données requises sont présentes
    if (!nom || !type_primaire || !type_secondaire || pv === undefined || attaque === undefined || defense === undefined) {
        // Envoyez une réponse avec un code d'erreur 400 si des données sont manquantes
        return res.status(400).json({
            erreur: "Le format des données est invalide",
            champ_manquant: ["nom", "type_primaire", "type_secondaire", "pv", "attaque", "defense"]
        });
    }

    // Simulez l'ajout du Pokémon à la "base de données"
    const nouveauPokemon = {
        nom,
        type_primaire,
        type_secondaire,
        pv,
        attaque,
        defense
    };

    pokemonDatabase.push(nouveauPokemon);

    const query = 'INSERT INTO pokemon(nom, type_primaire, type_secondaire, pv, attaque, defense) VALUES (' 
        + nom +', '+ type_primaire +', '+ type_secondaire +', '+ pv +', '+ attaque +', '+ defense + ');'

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

    // Répondez avec un code de statut 201 et le nouveau Pokémon ajouté
    res.status(201).json({
        message: `Le Pokémon ${nom} a été ajouté avec succès`,
        pokemon: nouveauPokemon
    });
});



module.exports = router;
