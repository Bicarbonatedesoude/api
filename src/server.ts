
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import cors from 'cors';
import dotenv from 'dotenv';

import 'express-async-errors';

import BaseRouter from './routes'; 
import AnimalRoutes from './routes/AnimalRoutes'; 
import Paths from './common/Paths';
import EnvVars from './common/EnvVars';
import HttpStatusCodes from './common/HttpStatusCodes';
import { RouteError } from './common/classes';
import { NodeEnvs } from './common/misc';

dotenv.config();

// **** Variables **** //
const app = express();

// **** Configuration Middleware **** //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(EnvVars.CookieProps.Secret));

app.use(
  cors({
    origin: ['http://localhost:3008'], 
    credentials: true, 
  })
);


if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

app.use((req, _, next) => {
  logger.info(`[${req.method}] ${req.path}`);
  next();
});

// **** Routes **** //

app.use(Paths.Base, BaseRouter);
app.use(Paths.Animal.Base, BaseRouter);

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

const PORT = EnvVars.Port || 3008; 
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
