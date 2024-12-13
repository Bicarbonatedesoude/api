import { Router } from 'express';
import express from 'express';
import AnimalRoutes from './AnimalRoutes';
import Paths from '../common/Paths';

const app = express();
const port = 3000;
const router = Router();

// Ajoutez vos routes ici
router.use('/animaux', AnimalRoutes);

export default router
// Middleware
app.use(express.json());

// Routes principales
app.use(Paths.Animal.Base, AnimalRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
