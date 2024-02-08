// model.js

const db = require('../.src/config/db.js');

module.exports = {
    obtenirTousPokemonDB: () => {
        const query = 'SELECT * FROM pokemon ORDER BY id';
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    obtenirUnPokemonDB: (pokemonId) => {
        const query = 'SELECT * FROM pokemon WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, pokemonId, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },




};