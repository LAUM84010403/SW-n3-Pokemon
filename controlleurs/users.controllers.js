// CODAGE(controlleurs) DE L'API USERS

//appel des manipulation de la base de donnée
const model = require('../models/users.model');

module.exports = {

    creerUtilisateur: (req, res) => {
        const { nom, courriel, mot_de_passe } = req.body;
        
        // Appel de la fonction verificationCleAPI qui retourne une promesse
        verificationCleAPI(8)
            .then(apiCle => { // Attendez que la promesse soit résolue
                console.log(apiCle); // Maintenant apiCle est résolu et contient la clé API générée
                if (!nom || !courriel || !mot_de_passe) {
                    return res.status(400).json({
                        erreur: "Le format des données est invalide",
                        champ_manquant: ["nom", "courriel", "mot_de_passe"]
                    });
                } else {
                    // Appel de la méthode du modèle pour créer un utilisateur avec la clé API générée
                    model.creerUtilisateurBD(nom, courriel, mot_de_passe, apiCle)
                        .then(result => {
                            res.status(201).json({
                                message: `L'utilisateur ${nom} a été ajouté avec succès`,
                                Cle_Api: apiCle
                            });
                        })
                        .catch(error => {
                            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
                            res.status(500).json({ error: 'Erreur serveur' });
                        });
                }
            })
            .catch(error => {
                console.error('Erreur lors de la génération de la clé API :', error);
                res.status(500).json({ error: 'Erreur serveur' });
            });
    },

};



function verificationCleAPI(length) {
    return new Promise((resolve, reject) => {
        let apiKey = generateApiKey(length); // Génère une nouvelle clé API

        // Demande au modèle de vérifier si la clé API est unique
        model.verifierCleUnique(apiKey)
            .then(isUnique => {
                if (isUnique) {
                    resolve(apiKey); // Si la clé est unique, résout avec la clé générée
                } else {
                    // Si la clé n'est pas unique, génère une nouvelle clé et vérifie à nouveau
                    verificationCleAPI(length).then(newApiKey => {
                        resolve(newApiKey);
                    }).catch(error => {
                        reject(error);
                    });
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}
function generateApiKey(length) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

