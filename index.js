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
            res.send(result);
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
            const listItems = result.map(salutation => `<li>${salutation.message}</li>`);
            const html = `<ul>${listItems.join('')}</ul>`;
            res.json(html);
        }
    });
});



// On exporte le router pour pouvoir l'utiliser dans index.js
module.exports = router;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});