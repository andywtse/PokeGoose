import mongoose from "mongoose";

const customPokemonSchema = new mongoose.Schema({
  name: { type: String, required: true},
  icon: String,
  moves: { 
    type: [String],
    required: true
  }
},{
  timestamps: true
});

const CustomPokemon = mongoose.model('CustomPokemon', customPokemonSchema);

export { 
  CustomPokemon
}