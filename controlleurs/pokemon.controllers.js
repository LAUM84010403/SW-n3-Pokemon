// controller.js

const model = require('../models/pokemon.model');

module.exports = {

    afficherTousPokemon: (req, res) => {
        model.obtenirTousPokemonDB()
            .then(result => {
                // Convertir les résultats en une chaîne de caractères avec un retour à la ligne entre chaque entrée
                const formattedResult = result.map(pokemon => `
                    <div>
                        <p><strong>Nom:</strong> ${pokemon.nom} --- <strong>ID:</strong> ${pokemon.id}</p>
                        <p><strong>Type primaire:</strong> ${pokemon.type_primaire} / ${pokemon.type_secondaire ? pokemon.type_secondaire : 'N/A'} </p>
                        <tr>
                            <td><p><strong>PV:</strong> ${pokemon.pv}</p></td>
                            <td><p><strong>Attaque:</strong> ${pokemon.attaque}</p></td>
                            <td><p><strong>Défense:</strong> ${pokemon.defense}</p></td>
                        </tr>
                    </div>
                    <hr>
                `).join('');

                // Renvoyer la chaîne formatée
                res.send(formattedResult);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des pokémons :', error);
                res.status(500).json({ error: 'Erreur serveur' });
            });
    },
    afficherUnPokemon: (req, res) => {
        const pokemonId = parseInt(req.params.id);

        model.obtenirUnPokemonDB(pokemonId)

            .then(result => {
                // Renvoyer directement le tableau de résultats
                res.send(result);
                // Résultat: [{"id":64,"nom":"Paras","type_primaire":"Bug","type_secondaire":"Grass","pv":35,"attaque":70,"defense":55}]
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des pokémons :', error);
                res.status(500).json({ error: 'Erreur serveur' });
            });
    },
    supprimerPokemon: (req, res) => {
        const pokemonId = parseInt(req.params.id);

        model.supprimerPokemonDB(pokemonId)
            .then(deletedPokemon => {
                res.send("La disparition de l'être voulu s'est bien passé!^^")
                res.status(200).json(deletedPokemon);
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du pokémon :', error);
                res.status(500).json({ error: 'Erreur serveur' });
            });
    },
    ajouterPokemon: (req, res) => {
        const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;

        if (!nom || !type_primaire || !type_secondaire || pv === undefined || attaque === undefined || defense === undefined) {
            return res.status(400).json({
                erreur: "Le format des données est invalide",
                champ_manquant: ["nom", "type_primaire", "type_secondaire", "pv", "attaque", "defense"]
            });
        } else {
            model.ajouterNouveauPokemonDB(nom, type_primaire, type_secondaire, pv, attaque, defense)
                .then(result => {
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
                })
                .catch(error => {
                    console.error('Erreur lors de l\'ajout du Pokémon :', error);
                    res.status(500).json({ error: 'Erreur serveur' });
                });
        }
    },
    modifierPokemon: (req, res) => {
        const { id, nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;

        if (!id || !nom || !type_primaire || !type_secondaire || pv === undefined || attaque === undefined || defense === undefined) {
            return res.status(400).json({
                erreur: "Le format des données est invalide",
                champ_manquant: ["id", "nom", "type_primaire", "type_secondaire", "pv", "attaque", "defense"]
            });
        } else {
            model.modifierPokemonDB(id, nom, type_primaire, type_secondaire, pv, attaque, defense)
                .then(result => {
                    res.status(200).json({
                        message: `Le Pokémon avec l'ID ${id} a été mis à jour avec succès`,
                        pokemon: {
                            id,
                            nom,
                            type_primaire,
                            type_secondaire,
                            pv,
                            attaque,
                            defense
                        }
                    });
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour du Pokémon :', error);
                    res.status(500).json({ error: 'Erreur serveur' });
                });
        }
    }
};
