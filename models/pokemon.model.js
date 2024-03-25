// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API POKEMON

//Base de donnée
//const db = require('../.src/config/db.js');
const db = require("../.src/config/db_pg.js");

//équivalent du main
module.exports = {

    obtenirTousPokemonDB: () => {
        return new Promise((resolve, reject) => {    
            const query = 'SELECT * FROM pokemon ORDER BY id';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    },
    obtenirUnPokemonDB: (pokemonId) => {
        return new Promise((resolve, reject) => {    
            const query = 'SELECT * FROM pokemon WHERE id = $1';
            const values = [pokemonId]

            db.query(query, values, (err, result) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }

                resolve(result.rows);
            });
        });
    },
    afficherListeBD: (typeTitre, offset) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT id, nom FROM pokemon
            WHERE type_primaire = $1 
            ORDER BY id
            LIMIT 25 OFFSET $2;`;
            const value = [typeTitre, offset]
                db.query(query, value, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                });
            });
    },
    supprimerPokemonDB: (pokemonId) => {
        const infoQuery = 'SELECT * FROM pokemon WHERE id = $1';
        const deleteQuery = 'DELETE FROM pokemon WHERE id = $1';

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
                            resolve(infoResult.rows);
                        }
                    });
                }
            });
        });
    },
    ajouterNouveauPokemonDB: (nom, type_primaire, type_secondaire, pv, attaque, defense) => {
        const query = 'INSERT INTO pokemon(nom, type_primaire, type_secondaire, pv, attaque, defense) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [nom, type_primaire, type_secondaire, pv, attaque, defense];

        return new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    },
    modifierPokemonDB: (id, nom, type_primaire, type_secondaire, pv, attaque, defense) => {
        const query = 'UPDATE pokemon SET nom = $1, type_primaire = $2, type_secondaire = $3, pv = $4, attaque = $5, defense = $6 WHERE id = $7';
        const values = [nom, type_primaire, type_secondaire, pv, attaque, defense, id];

        return new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    }

};