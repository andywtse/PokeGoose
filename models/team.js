import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true},
  icon: String,
  moves: { 
    type: [String],
    required: true
  }
},{
  timestamps: true
});

const teamSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  title: { type: String, required: true},
  description: String,
  pokemon: [ pokemonSchema ] 
},{
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

export {
  Team
}
