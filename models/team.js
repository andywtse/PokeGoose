import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  title: { type: String, required: true},
  description: String,
  pokemon: {
    type:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' } ],
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
