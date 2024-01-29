console.log("Je suis prêt à commencer");
// Importer le module express
const express = require('express');
const mysql = require('mysql')
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();

// Créer une application express
const app = express();
const PORT = 3000;

const db = require("../SW-n3-Pokemon/.src/config/db.js");

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
            // Renvoyer directement le tableau de résultats
            res.json(result);
        }
    });
});

router.get('/:id', (req, res) => {
    const pokemonId = parseInt(req.params.id);

    // Recherche du Pokémon dans la liste (exemple simple, remplacez par votre propre logique de recherche)
    const pokemon = pokemons.find(p => p.id === pokemonId);

    if (!pokemon) {
        // Si le Pokémon n'est pas trouvé, renvoyer une réponse 404 (Not Found)
        return res.status(404).json({ error: 'Pokémon non trouvé' });
    }

    // Si le Pokémon est trouvé, renvoyer les détails du Pokémon
    res.json(pokemon);
});



// On exporte le router pour pouvoir l'utiliser dans index.js
module.exports = router;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});