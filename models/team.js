import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  title: { type: String, required: true},
  description: String,
  pokemon: [ { type: mongoose.Schema.Types.ObjectId, ref: 'CustomPokemon' } ]
},{
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

export {
  Team
}
