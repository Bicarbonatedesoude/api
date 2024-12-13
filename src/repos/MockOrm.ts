import jsonfile from 'jsonfile';
import { IAnimal } from '../models/Animal'; // Assure-toi que le chemin est correct

// **** Variables **** //
const NOM_FICHIER_BD = 'base_de_donnees.json';

// **** Types **** //
interface IBd {
  animaux: IAnimal[];
}

// **** Fonctions **** //

/**
 * Récupère le contenu JSON du fichier de base de données.
 */
async function ouvrirBaseDeDonnees(): Promise<IBd> {
  try {
    return await jsonfile.readFile(__dirname + '/' + NOM_FICHIER_BD) as IBd;
  } catch (erreur) {
    console.error('Erreur lors de la lecture du fichier de base de données :', erreur);
    throw erreur; // Rejette l'erreur pour que l'appelant puisse la gérer
  }
}

/**
 * Met à jour le fichier avec les nouvelles données.
 */
async function enregistrerBaseDeDonnees(bd: IBd): Promise<void> {
  try {
    await jsonfile.writeFile(__dirname + '/' + NOM_FICHIER_BD, bd);
  } catch (erreur) {
    console.error('Erreur lors de l\'écriture dans le fichier de base de données :', erreur);
    throw erreur; // Rejette l'erreur pour que l'appelant puisse la gérer
  }
}

// **** Export par défaut **** //
export default {
  ouvrirBaseDeDonnees,
  enregistrerBaseDeDonnees,
} as const;
