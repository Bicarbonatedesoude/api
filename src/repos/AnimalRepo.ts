import Animal, { IAnimal } from '../models/Animal';

// Fonction pour récupérer tous les animaux
async function getAll(): Promise<IAnimal[]> {
  return await Animal.find();
}

// Fonction pour récupérer un animal par son ID
async function getOne(id: string): Promise<IAnimal | null> {
  return await Animal.findById(id);
}

// Fonction pour récupérer un animal par son nom
async function getOneNom(nom: string): Promise<IAnimal | null> {
  return await Animal.findOne({ nom });
}

// Fonction pour récupérer des animaux par leur poids
async function getOnePoids(min: number, max: number): Promise<IAnimal[]> {
  return await Animal.find({ poids: { $gte: min, $lte: max } });
}

// Fonction pour ajouter un animal
async function add(animal: IAnimal): Promise<IAnimal> {
  const nouveauAnimal = new Animal(animal);
  return await nouveauAnimal.save();
}

// Fonction pour mettre à jour un animal
async function update(animal: IAnimal): Promise<IAnimal> {
  const animalToUpdate = await Animal.findById(animal._id);
  if (!animalToUpdate) {
    throw new Error('Animal non trouvé');
  }

  animalToUpdate.nom = animal.nom;
  animalToUpdate.type = animal.type;
  animalToUpdate.race = animal.race;
  animalToUpdate.age = animal.age;
  animalToUpdate.poids = animal.poids;
  animalToUpdate.sterilise = animal.sterilise;
  animalToUpdate.dateNaissance = animal.dateNaissance;
  animalToUpdate.observations = animal.observations;

  return await animalToUpdate.save();
}

// Fonction pour supprimer un animal
async function delete_(id: string): Promise<void> {
  await Animal.findByIdAndDelete(id);
}

export default {
  getAll,
  getOne,
  getOneNom,
  getOnePoids,
  add,
  update,
  delete: delete_,
} as const;
