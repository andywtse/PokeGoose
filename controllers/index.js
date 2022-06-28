import { Team } from "../models/team.js";
import { Profile } from "../models/profile.js";

function index(req, res) {

  let favorites=[];
  let myTeams=[];

  Profile.find({})
    .then(profile => {
      if( typeof profile.favorites !== 'undefined' ) {
        favorites = profile.favorites;
      }
      if( typeof profile.myTeams !== 'undefined' ) {
        myTeams = profile.myTeams;
      }
    })

  Team.find({})
    .then(teams => {
      res.render('index', {
        user: req.user ? req.user : null,
        allTeams: teams,
        favorites: favorites,
        myTeams: myTeams,
        title: "Home"
      });
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    });
};

export {
  index
}