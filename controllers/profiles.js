import { Profile } from "../models/profile.js";
import * as indexController from "./index.js"

function index(req, res) {
  Profile.find({}).sort('name')
    .populate('myTeams')
    .then(profiles => {
      const hasTeams = typeof profiles.myTeams !== 'undefined'
      res.render('profiles/index', {
        title: "Profile",
        profiles,
        hasTeams
      });

    })
    .catch(err => {
      console.log(err)
      indexController.index;
    });
};

function show(req, res) {
  Profile.findById(req.params.id)
    .populate('myTeams')
    .populate({
      path: 'myTeams',
      populate: {
        path: 'pokemon',
        model: 'CustomPokemon'
      }
    })
    .then(profile => {
      let hasTeams = typeof profile.myTeams !== 'undefined'
      const isSelf = (profile._id) === (req.user.profile._id)
      if (hasTeams && profile.myTeams.length === 0) {
        hasTeams = false;
      }
      if (isSelf) {
        index(req, res);
      } else {
        res.render('profiles/show', {
          title: "Profile",
          profile,
          teams: profile.myTeams,
          hasTeams,
          isSelf
        });
      }

    })
    .catch(err => {
      console.log(err)
      indexController.index;
    });
};

export {
  index,
  show
}