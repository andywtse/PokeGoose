import { Team } from "../models/team.js";
import { Profile } from "../models/profile.js";

function index(req, res) {

  let favorites=[];
  let myTeams=[];

  Team.find({})
    .then(teams => {
      const loggedIn = (typeof req.user !== 'undefined');
      if(loggedIn) {
        Profile.findById(req.user.profile._id)
        .populate('favorites')
        .populate('myTeams')
          .then(profile => {
            if( typeof profile.favorites !== 'undefined' ) {
              favorites = profile.favorites;
            }
            if( typeof profile.myTeams !== 'undefined' ) {
              myTeams = profile.myTeams;
            }

            console.log(favorites)
            console.log(myTeams)

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