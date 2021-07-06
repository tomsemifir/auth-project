import { authController } from "../controllers/authController"

export const setAuthRoutes = (app) => {

    app.post("/auth/signup", authController.signup);
    app.post("/auth/signin", authController.signin);
}