import { Team } from "../models/team.js";
import { Profile } from "../models/profile.js";

function index(req, res) {

  let favorites = [];
  let myTeams = [];

  Team.find({})
    .populate('pokemon')
    .then(teams => {
      const loggedIn = (typeof req.user !== 'undefined');
      if (loggedIn) {
        Profile.findById(req.user.profile._id)
          .populate('favorites')
          .populate({
            path: 'favorites',
            populate: {
              path: 'pokemon',
              model: 'CustomPokemon'
            }
          })
          .populate('myTeams')
          .populate({
            path: 'myTeams',
            populate: {
              path: 'pokemon',
              model: 'CustomPokemon'
            }
          })
          .then(profile => {
            if (typeof profile.favorites !== 'undefined') {
              favorites = profile.favorites;
            }
            if (typeof profile.myTeams !== 'undefined') {
              myTeams = profile.myTeams;
            }

            res.render('index', {
              user: req.user,
              allTeams: teams,
              favorites: favorites,
              myTeams: myTeams,
              loggedIn,
              title: "Home"
            });
          })
          .catch(err => {
            console.log(err)
            res.redirect('/')
          });
      } else {
        res.render('index', {
          user: req.user ? req.user : null,
          allTeams: teams,
          loggedIn,
          title: "Home"
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    });
};

export {
  index
}