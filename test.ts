import connectDB from './src/repos/database';
import AnimalRepo from './src/repos/AnimalRepo';

// Connexion à la base de données
connectDB();

// Test d'insertion d'un animal
const testData = {
  nom: 'Rex',
  type: 'Chien',
  race: 'Labrador',
  age: 5,
  poids: 25,
  sterilise: true,
  dateNaissance: new Date('2018-01-01'),
  historiqueVaccins: [
    { vaccin: 'Vaccin Rage', dateVaccin: new Date('2023-06-15') },
    { vaccin: 'Vaccin Parvovirose', dateVaccin: new Date('2023-07-10') }
  ],
  observations: 'Chien très actif et sociable.',
};


AnimalRepo.add(testData)
  .then((animal) => {
    console.log('Animal créé :', animal);
  })
  .catch((error) => {
    console.error('Erreur lors de la création de l\'animal :', error);
  });
