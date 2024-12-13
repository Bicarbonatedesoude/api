
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import cors from 'cors';
import dotenv from 'dotenv';

import 'express-async-errors';

import BaseRouter from './routes'; // Routes de base
import AnimalRoutes from './routes/AnimalRoutes'; // Import des routes pour les animaux
import Paths from './common/Paths';
import EnvVars from './common/EnvVars';
import HttpStatusCodes from './common/HttpStatusCodes';
import { RouteError } from './common/classes';
import { NodeEnvs } from './common/misc';

// Charger les variables d'environnement
dotenv.config();

// **** Variables **** //
const app = express();

// **** Configuration Middleware **** //

// Support pour JSON et URL Encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Analyse des cookies avec la clé définie dans le fichier .env
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Configuration CORS pour autoriser l'API depuis l'URL donnée
app.use(
  cors({
    origin: ['http://localhost:3008'], // Autoriser cette origine uniquement
    credentials: true, 
  })
);

// Middleware pour logger les requêtes HTTP en mode Développement
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Middleware de sécurité avec Helmet en mode Production
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Middleware global pour logger chaque requête
app.use((req, _, next) => {
  logger.info(`[${req.method}] ${req.path}`);
  next();
});

// **** Routes **** //

app.use(Paths.Base, BaseRouter); // Routes principales
app.use(Paths.Animal.Base, AnimalRoutes); // Routes pour les animaux avec configuration dynamique

app.use('/api', BaseRouter);
// **** Gestionnaire d'erreurs global **** //

app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Log des erreurs sauf en mode test
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
      logger.err(err, true);
    }

    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }

    return res.status(status).json({
      error: err.message,
      ...(EnvVars.NodeEnv === NodeEnvs.Dev.valueOf() && { stack: err.stack }),
    });
  }
);

// **** Lancer le serveur **** //

const PORT = EnvVars.Port || 3008; // Utiliser le port configuré ou 3000 par défaut
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// **** Export pour les tests ou réutilisation dans d'autres scripts **** //
export default app;
