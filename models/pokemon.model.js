// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API POKEMON

//Base de donnée
const db = require('../.src/config/db.js');

//équivalent du main
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
    afficherListeBD: (typeTitre, offset) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT id, nom FROM pokemon WHERE type_primaire = ? ORDER BY id LIMIT 10 OFFSET ?`;
            const value = [typeTitre, offset]
                db.query(query, value, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
    },
    supprimerPokemonDB: (pokemonId) => {
        const infoQuery = 'SELECT * FROM pokemon WHERE id = ?';
        const deleteQuery = 'DELETE FROM pokemon WHERE id = ?';

        return new Promise((resolve, reject) => {
            db.query(deleteQuery, [pokemonId], (err, deleteResult) => {
                if (err) {
                    console.error('Erreur lors de la suppression du pokémon :', err);
                    reject(err);
                } else {
                    db.query(infoQuery, [pokemonId], (err, infoResult) => {
                        if (err) {
                            console.error('Erreur lors de la récupération du pokémon :', err);
                            reject(err);
                        } else {
                            resolve(infoResult);
                        }
                    });
                }
            });
        });
    },
    ajouterNouveauPokemonDB: (nom, type_primaire, type_secondaire, pv, attaque, defense) => {
        const query = 'INSERT INTO pokemon(nom, type_primaire, type_secondaire, pv, attaque, defense) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [nom, type_primaire, type_secondaire, pv, attaque, defense];

        return new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    modifierPokemonDB: (id, nom, type_primaire, type_secondaire, pv, attaque, defense) => {
        const query = 'UPDATE pokemon SET nom = ?, type_primaire = ?, type_secondaire = ?, pv = ?, attaque = ?, defense = ? WHERE id = ?';
        const values = [nom, type_primaire, type_secondaire, pv, attaque, defense, id];

        return new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

};