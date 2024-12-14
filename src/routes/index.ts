import { Router, Request, Response, NextFunction } from 'express';
import jetValidator from 'jet-validator';
import Paths from '../common/Paths';
import AnimalRoutes from '../routes/AnimalRoutes';
import HttpStatusCodes from '../common/HttpStatusCodes';

// **** Variables **** //

const apiRouter = Router(),
      validate = jetValidator();

// Middleware de validation pour Animal
function validateAnimal(req: Request, res: Response, next: NextFunction) {
    if (!req.body || !req.body.animal) {
        res.status(HttpStatusCodes.BAD_REQUEST)
           .send({ error: 'Données animal requises' })
           .end();
        return;
    }
    next();
}

// Routes pour les animaux
const animalRouter = Router();
animalRouter.get(Paths.Animal.Get, AnimalRoutes.getAll);
animalRouter.get(Paths.Animal.GetByNom, AnimalRoutes.getById);
animalRouter.get(Paths.Animal.GetByPoids, AnimalRoutes.getByName);
animalRouter.post(Paths.Animal.Add, validateAnimal, AnimalRoutes.add);
animalRouter.put(Paths.Animal.Update, validateAnimal, AnimalRoutes.update);
animalRouter.delete(Paths.Animal.Delete, validate(['id', 'string', 'params']), AnimalRoutes.delete);

// Ajout des routes pour les animaux dans l'API principale
apiRouter.use(Paths.Animal.Base, animalRouter);

// Route de base pour vérifier le statut de l'API
apiRouter.get(Paths.Base, (req: Request, res: Response) => {
    res.json({ message: "Bienvenue sur l'API 2e Chance!" });
});

// **** Export default **** //

export default apiRouter;
