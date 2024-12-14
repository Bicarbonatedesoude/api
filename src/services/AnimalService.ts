import AnimalRepo from '../repos/AnimalRepo'; 
import { IAnimal } from '../models/Animal';
import { RouteError } from '../common/classes';
import HttpStatusCodes from '../common/HttpStatusCodes';

// Variables
export const ANIMAL_NON_TROUVE_ERR = 'Animal non trouvé';
export const ANIMAL_AJOUTER_ERREUR = 'Erreur lors de l\'ajout de l\'animal';
export const ANIMAL_MISE_A_JOUR_ERREUR = 'Erreur lors de la mise à jour de l\'animal';
export const ANIMAL_SUPPRIMER_ERREUR = 'Erreur lors de la suppression de l\'animal';

// Méthode pour obtenir tous les animaux
async function obtenirTousAnimaux(): Promise<IAnimal[]> {
  try {
    return await AnimalRepo.getAll();
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les animaux:', error);
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ANIMAL_AJOUTER_ERREUR);
  }
}

async function obtenirAnimalParId(id: string): Promise<IAnimal | null> {
  try {
    const animal = await AnimalRepo.getOne(id);
    if (!animal) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, ANIMAL_NON_TROUVE_ERR);
    }
    return animal;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'animal par ID:', error);
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ANIMAL_AJOUTER_ERREUR);
  }
}

async function obtenirAnimalParNom(nom: string): Promise<IAnimal | null> {
  try {
    let animal = await AnimalRepo.getOneNom(nom);
    if (!animal) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, ANIMAL_NON_TROUVE_ERR);
    }
    return animal;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'animal par nom:', error);
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ANIMAL_AJOUTER_ERREUR);
  }
}

// Méthode pour ajouter un animal
async function ajouterAnimal(animal: IAnimal): Promise<void> {
  try {
    await AnimalRepo.add(animal);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'animal:', error);
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ANIMAL_AJOUTER_ERREUR);
  }
}

// Méthode pour mettre à jour un animal
async function mettreAJourAnimal(animal: IAnimal): Promise<void> {
  try {
    await AnimalRepo.update(animal);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'animal:', error);
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ANIMAL_MISE_A_JOUR_ERREUR);
  }
}

// Méthode pour supprimer un animal
async function supprimerAnimal(id: string): Promise<void> {
  try {
    await AnimalRepo.delete(id);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'animal:', error);
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ANIMAL_SUPPRIMER_ERREUR);
  }
}

// Méthode pour obtenir des animaux par poids
async function obtenirAnimauxParPoids(min: number, max: number): Promise<IAnimal[]> {
  try {
    return await AnimalRepo.getOnePoids(min, max);
  } catch (error) {
    console.error('Erreur lors de la récupération des animaux par poids:', error);
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ANIMAL_AJOUTER_ERREUR);
  }
}

// Exportation
export default {
  obtenirTousAnimaux,
  obtenirAnimalParId,
  obtenirAnimalParNom,
  ajouterAnimal,
  mettreAJourAnimal,
  supprimerAnimal,
  obtenirAnimauxParPoids,
} as const;
