import mongoose, { Schema, model} from 'mongoose';

// Interface pour le vaccin
interface IVaccin {
  vaccin: string;
  dateVaccin: Date; 
}

// Interface pour l'animal
export interface IAnimal {
  _id?: string;
  nom: string;
  type: string;
  race: string;
  age: number;
  poids: number;
  sterilise: boolean;
  dateNaissance: Date;
  historiqueVaccins?: IVaccin[];  
  observations?: string;  
}

// Schéma pour l'historique des vaccins
const VaccinSchema: Schema = new Schema({
  vaccin: { type: String, required: true },
  dateVaccin: { type: Date, required: true }
});

// Schéma pour un animal
const AnimalSchema: Schema = new Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true },
  race: { type: String, required: true },
  age: { type: Number, required: true },
  poids: { type: Number, required: true },
  sterilise: { type: Boolean, required: true },
  dateNaissance: { type: Date, required: true },
  historiqueVaccins: { type: [VaccinSchema], required: false }, 
  observations: { type: String }
});

// Export du modèle
const Animal = mongoose.model<IAnimal>('Animal', AnimalSchema);
export default Animal;
