/**
 * Point d'entrée principal pour l'application.
 * Configuration du serveur Express et démarrage.
 */

import app from './src/server';
import logger from 'jet-logger';

// Port par défaut
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
  logger.info(`Serveur démarré sur le port ${PORT}`);
});
// src/index.ts
console.log('Hello, World!');

