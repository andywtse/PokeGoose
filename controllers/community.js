import { Team } from "../models/team.js";
import * as indexController from "./index.js"

function index(req, res) {
  Profile.find({})
  .populate('pokemon')
    .then(profile => {
      res.render('community/index', {
        profile,
        title: "Community"
      });
    })
    .catch(err => {
      console.log(err)
      indexController.index;
    });
};

function show(req, res) {
  Team.findById(req.params.id)
  .populate('pokemon')
    .then(team => {
      res.render(`teams/${req.params.id}`, {
        title: team.title,
        team
      })
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