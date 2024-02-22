// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API USERS

const bcrypt = require('bcrypt');

//Base de donnée
const db = require('../.src/config/db.js');

module.exports = {

creerUtilisateurBD: (nom, courriel, mot_de_passe, apiCle) => {
    const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE courriel = ?';
    const insertQuery = 'INSERT INTO users(nom, courriel, cle_api, mot_de_passe) VALUES (?, ?, ?, ?)';
    const values = [nom, courriel, apiCle];

    return new Promise((resolve, reject) => {
        // Vérification de l'adresse e-mail unique
        db.query(checkQuery, [courriel], (err, result) => {
            if (err) {
                reject(err);
            } else {
                // Si l'adresse e-mail existe déjà, renvoyer une erreur
                if (result[0].count > 0) {
                    reject(err);
                } else {
                    // Hachage du mot de passe avec BCrypt
                    bcrypt.hash(mot_de_passe, 10, (err, hash) => {
                        if (err) {
                            reject(err);
                        } else {
                            // Insertion de l'utilisateur avec le mot de passe haché
                            values.push(hash);
                            db.query(insertQuery, values, (err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            });
                        }
                    });
                }
            }
        });
    });
},

verifierCleUnique: (apiKey) => {
    return new Promise((resolve, reject) => {
        // Requête SQL pour vérifier si la clé API est unique
        const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE cle_api = ?';
        db.query(checkQuery, [apiKey], (err, result) => {
            if (err) {
                reject(err);
            } else {
                // Résout avec un booléen indiquant si la clé est unique ou non
                
                resolve(result[0].count === 0);
            }
        });
    });
}

};

