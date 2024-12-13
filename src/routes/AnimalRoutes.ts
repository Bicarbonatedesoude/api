/**
 * Routes pour gérer les opérations liées aux animaux.
 */

import { Router } from 'express';
import AnimalService from './AnimalService';
import Paths from '../common/Paths';
import HttpStatusCodes from '../common/HttpStatusCodes';
import { IAnimal } from '@src/models/Animal';
import { IReq, IRes } from './common/types';

const route = Router();

// **** Définition des routes **** //

/**
 * Récupère tous les animaux.
 */
route.get(Paths.Animal.Get, async (_: IReq, res: IRes) => {
  const animaux = await AnimalService.obtenirTousAnimaux();
  return res.status(HttpStatusCodes.OK).json({ animaux });
});

/**
 * Récupère un animal spécifique par son ID.
 */
route.get('/:id', async (req: IReq, res: IRes) => {
  const animal = await AnimalService.obtenirAnimalParId(req.params.id as string);
  if (animal) {
    return res.status(HttpStatusCodes.OK).json({ animal });
  }
  return res.status(HttpStatusCodes.NOT_FOUND).json({ error: 'Animal non trouvé' });
});

/**
 * Récupère un animal spécifique par son nom.
 */
route.get(Paths.Animal.GetByNom, async (req: IReq, res: IRes) => {
  const animal = await AnimalService.obtenirAnimalParNom(req.params.nom as string);
  if (animal) {
    return res.status(HttpStatusCodes.OK).json({ animal });
  }
  return res.status(HttpStatusCodes.NOT_FOUND).json({ error: 'Animal non trouvé' });
});

/**
 * Ajoute un nouvel animal.
 */
route.post(Paths.Animal.Add, async (req: IReq, res: IRes) => {
  let { animal } = req.body;
  animal = await AnimalService.ajouterAnimal(animal as IAnimal);
  return res.status(HttpStatusCodes.CREATED).json({ animal });
});

/**
 * Met à jour un animal existant.
 */
route.put(Paths.Animal.Update, async (req: IReq, res: IRes) => {
  let { animal } = req.body;
  animal = await AnimalService.mettreAJourAnimal(animal as IAnimal);
  return res.status(HttpStatusCodes.OK).json({ animal });
});

/**
 * Supprime un animal spécifique.
 */
route.delete(Paths.Animal.Delete, async (req: IReq, res: IRes) => {
  const id = req.params.id;
  await AnimalService.supprimerAnimal(id as string);
  return res.status(HttpStatusCodes.OK).json({ message: "L'animal a été supprimé" });
});

// **** Export **** //
export default route;
