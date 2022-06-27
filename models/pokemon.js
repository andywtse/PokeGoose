import mongoose from "mongoose";

const pokemonSchema = new Schema({
  name: { type: String, required: true},
  icon: String,
  move1: {type: String, required: true},
  move2: String,
  move3: String,
  move4: String
},{
  timestamps: true
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema)

export {
  Pokemon
}