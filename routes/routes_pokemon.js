const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
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

router.delete('/:id', (req, res) => {
    const pokemonId = parseInt(req.params.id);

    const infoQuery = 'SELECT * FROM pokemon WHERE id = ?';
    const deleteQuery = 'DELETE FROM pokemon WHERE id = ?';

    // Utilisation de Promise.all pour exécuter les deux requêtes en parallèle
    Promise.all([
        new Promise((resolve, reject) => {
            db.query(infoQuery, [pokemonId], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la récupération du pokémon :', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }),
        new Promise((resolve, reject) => {
            db.query(deleteQuery, [pokemonId], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la suppression du pokémon :', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    ])
    .then(([infoResult, deleteResult]) => {
        // Renvoyer le résultat de la requête SELECT
        res.status(200).json(infoResult);
    })
    .catch(err => {
        // Gérer les erreurs
        res.status(500).json({ error: 'Erreur serveur' });
    });
});

app.use(express.json());
app.use(bodyParser.json());
//AJOUT POKEMON QUI NE MARCHE PAS
router.post('/', (req, res) => {

    console.log(req.body);

    const nom = "Test"
    const type_primaire = "Grass";
    const type_secondaire = "Fire";
    const pv = 2;
    const attaque = 3;
    const defense = 4;

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
