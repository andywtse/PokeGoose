import mongoose from "mongoose";

const pokemonObjectSchema = new mongoose.Schema({
  name: String,
  icon: String,
  moves: []
},{
  timestamps: true
});

const Pokemon = mongoose.model('Pokemon', pokemonObjectSchema);

export {
  Pokemon
}