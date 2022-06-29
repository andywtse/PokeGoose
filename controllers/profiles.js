import { Profile } from "../models/profile.js";
import * as indexController from "./index.js"

function index(req,res) {
  Profile.findById(req.user.profile._id)
    .populate('myTeams')
    .then(profile => {
      const hasTeams = typeof profile.myTeams !== 'undefined'
      res.render('profiles/index', {
        title: "Profile",
        profile,
        hasTeams
      });

    })
    .catch(err => {
      console.log(err)
      indexController.index;
    });
};

function show(req,res) {
  Profile.findById(req.params.id)
    .populate('myTeams')
    .then(profile => {
      const hasTeams = typeof profile.myTeams !== 'undefined'
      const isSelf = (req.params.id) === (req.user.profile._id)
      console.log(isSelf)
      if( isSelf ) {
        index(req,res);
      } else {
        res.render('profiles/show', {
          title: "Profile",
          profile,
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