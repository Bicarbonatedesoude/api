import './pre-start'; 
import logger from 'jet-logger';
import EnvVars from '@src/common/EnvVars';
import server from './server';
import { connect } from 'mongoose';


const SERVER_START_MSG = 'Express server started on port: ' + EnvVars.Port.toString();

// Connexion à la base de données MongoDB
connect(EnvVars.MONGODB_URI)
  .then(() => { 
    logger.info('Successfully connected to MongoDB');
    server.listen(EnvVars.Port, () => {
      logger.info(SERVER_START_MSG);
    });
  })
  .catch((err) => {
    logger.err('Failed to connect to MongoDB', err);
     process.exit(1);
  });
