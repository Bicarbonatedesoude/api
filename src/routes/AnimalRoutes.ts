/**
 * Routes pour gérer les opérations liées aux animaux.
 */

import { Router } from 'express';
import AnimalService from '../services/AnimalService';
import Paths from '../common/Paths';
import HttpStatusCodes from '../common/HttpStatusCodes';
import { IAnimal } from '@src/models/Animal';
import { IReq, IRes } from './common/types';

async function getAll(_: IReq, res: IRes) {
  const animaux = await AnimalService.obtenirTousAnimaux();
  return res.status(HttpStatusCodes.OK).json({ animaux });
}

async function getById(req: IReq, res: IRes) {
  const animal = await AnimalService.obtenirAnimalParId(req.params.id as string);
  if (animal) {
    return res.status(HttpStatusCodes.OK).json({ animal });
  }
  return res.status(HttpStatusCodes.NOT_FOUND).json({ error: 'Animal non trouvé' });
}

async function getByName(req: IReq, res: IRes) {
  const animal = await AnimalService.obtenirAnimalParNom(req.params.nom as string);
  if (animal) {
    return res.status(HttpStatusCodes.OK).json({ animal });
  }
  return res.status(HttpStatusCodes.NOT_FOUND).json({ error: 'Animal non trouvé' });
}

async function add(req: IReq, res: IRes) {
  let { animal } = req.body;
  animal = await AnimalService.ajouterAnimal(animal as IAnimal);
  return res.status(HttpStatusCodes.CREATED).json({ animal });
}

async function update(req: IReq, res: IRes) {
  let { animal } = req.body;
  animal = await AnimalService.mettreAJourAnimal(animal as IAnimal);
  return res.status(HttpStatusCodes.OK).json({ animal });
}

async function delete_(req: IReq, res: IRes) {
  const id = req.params.id;
  await AnimalService.supprimerAnimal(id as string);
  return res.status(HttpStatusCodes.OK).json({ message: "L'animal a été supprimé" });
}

// **** Export default **** //
export default {
  getAll,
  getById,
  getByName,
  add,
  update,
  delete: delete_,
};
