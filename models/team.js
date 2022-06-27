import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true},
  icon: String,
  move1: {type: String, required: true},
  move2: String,
  move3: String,
  move4: String
},{
  timestamps: true
});

const teamSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  title: { type: String, required: true},
  description: String,
  pokemon: {
    type:[ pokemonSchema ],
    validate: [arrayLimit, 'Team exceeds the limit of 6 pokemon']
  }
},{
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

function arrayLimit(val) {
  return val.length <= 6;
};

export {
  Team
}
