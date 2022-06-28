import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  description: String,
  favorites: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Team' } ],
  myTeams: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Team' } ]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
