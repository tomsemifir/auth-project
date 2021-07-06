import express from 'express';
import { setMongoConnection } from './config/mongo.config';
import cors from 'cors';
import { setAuthRoutes } from './routes/authRoutes';
import { setUserRoute } from './routes/userRoutes';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

//Lancement du serveur Node
app.listen(port, () => {
    console.log(`Serveur listening on port : ${port}`);
})

//Connexion à la base de donnée
setMongoConnection();

//Définition des routes
setAuthRoutes(app);
setUserRoute(app);