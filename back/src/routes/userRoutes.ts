import { verifyToken } from "../config/auth.config";
import { userController } from "../controllers/userController"

export const setUserRoute = (app) => {

    // Appelle de la méthode verifyToken de "auth.config.ts"
    // Si le token est valide, activer la requête
    // Sinon renvoyer erreur
    app.get("/users", verifyToken, userController.findAll);
    app.get("/users/:id", verifyToken, userController.findById);
}