import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/chiens');
    console.log("Connexion à MongoDB réussie");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
