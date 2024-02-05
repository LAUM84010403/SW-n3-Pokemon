console.log("Je suis prêt à commencer");
// Importer le module express
const express = require('express');
const mysql = require('mysql');
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();




//CONFIGURATION DE LA BASE DE DONNÉE
const db = require("../SW-n3-Pokemon/.src/config/db.js");



// Créer une application express
const app = express();
const PORT = 3000;

const ITEMS_PER_PAGE = 25;


app.get('/', (req, res) => {
    res.send("<h1>Mon premier serveur web n3 sur express !</h1>");
});

app.use('/api/pokemon', router);

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

router.get('/liste', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const typeFilter = req.query.type;

    // Construire la requête SQL en fonction des paramètres fournis
    let query = 'SELECT * FROM pokemon';

    if (typeFilter) {
        query += ` WHERE type_primaire = '${typeFilter}'`;
    }

    query += ` ORDER BY id LIMIT ${ITEMS_PER_PAGE} OFFSET ${(page - 1) * ITEMS_PER_PAGE};`;

    // Exécuter la requête SQL
    db.query(query, (err, result) => {
        const page = parseInt(req.query.page) || 1;
        const typeFilter = req.query.type;
    
        // Construire la requête SQL en fonction des paramètres fournis
        let query = 'SELECT * FROM pokemon';
    
        const params = [];
    
        if (typeFilter) {
            query += ' WHERE type_primaire = ?';
            params.push(typeFilter);
        }
    
        query += ' ORDER BY id LIMIT ? OFFSET ?;';
        params.push(ITEMS_PER_PAGE, (page - 1) * ITEMS_PER_PAGE);
    
        // Exécuter la requête SQL avec des paramètres
        db.query(query, params, (err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération des pokémons :', err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else {
                // Obtenir le nombre total de pokémons pour la pagination
                let totalPokemonsQuery = 'SELECT COUNT(*) AS total FROM pokemon';
    
                if (typeFilter) {
                    totalPokemonsQuery += ' WHERE type_primaire = ?';
                }
    
                // Exécuter la requête SQL pour le nombre total avec des paramètres
                db.query(totalPokemonsQuery, params.slice(0, params.length - 2), (err, totalCountResult) => {
                    if (err) {
                        console.error('Erreur lors de la récupération du nombre total de pokémons :', err);
                        res.status(500).json({ error: 'Erreur serveur' });
                    } else {
                        const totalItems = totalCountResult[0].total;
                        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
                        // Retourner la réponse au format JSON
                        res.json({
                            pokemons: result,
                            nombrePokemonTotal: totalItems,
                            page: page,
                            totalPage: totalPages
                        });
                    }
                });
            }
        });
    });
});



// On exporte le router pour pouvoir l'utiliser dans index.js
module.exports = router;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});