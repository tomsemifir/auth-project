import { User } from "../models/user";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {

    /**
     * Méthode d'inscription.
     * Attend un utilisateur complet dans le body
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    signup = async (req, res, next) => {
        // Récupère l'utilisateur dans le body
        let user = req.body;

        try {
            // Chercher un utilisateur qui possède déjà cet email
            let userExist = await User.findOne({
                email: user.email
            });
            // Si on récupère un utilisateur , afficher erreur
            if (userExist) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            // "salt" est une chaine de caractère random
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            //Enregistrer l'utilisateur en base
            user = await User.create(user);

            const payload = {
                user: {
                    id: user.id
                }
            };

            // Génération du token, expire dans 10 000 ms
            jwt.sign(
                payload,
                // "RandomString" est la clé de chiffrage, générer une clé random dans les variables d'environnement
                "randomString", {
                expiresIn: 10000
            },
                // Si erreur , attraper l'erreur
                (err, token) => {
                    if (err) throw err;
                    // Sinon afficher le token
                    res.status(200).json({
                        token,
                        user : payload.user
                    });
                }
            );
            // Si une erreur est rencontrée pendant l'éxécution, l'afficher
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }

    /**
     * Méthode de connexion.
     * Attend un email et un password dans le body
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    signin = async (req, res, next) => {

        // Créer une variable email et une variable password qui prennent la valeur du body
        const { email, password } = req.body;

        try {
            // Chercher si l'utilisateur avec cet email existe
            let user: any = await User.findOne({
                email
            });
            // Si on ne trouve pas d'utilisateur, afficher erreur
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });

            // Vérifier que le mot de passe entré correspond au mot de passe en base de données
            const isMatch = await bcrypt.compare(password, user.password);

            // Si les mots de passes ne correspondent pas, afficher erreur
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });

            const payload = {
                user: {
                    id: user.id
                }
            };

            // Génération du token, expire dans 3 600 ms
            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600
                },
                // Si erreur, attraper l'erreur
                (err, token) => {
                    if (err) throw err;
                    // Sinon afficher le token
                    res.status(200).json({
                        token,
                        user : payload.user
                    });
                }
            );
            // Si une erreur s'est produite pendant l'éxécution, l'afficher
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }

}

export const authController = Object.freeze(new AuthController());


