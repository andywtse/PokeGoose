import { Team } from "../models/team.js";
import * as indexController from "./index.js"

function index(req, res) {
  Team.find({})
  .populate('pokemon')
    .then(teams => {
      res.render('community/index', {
        teams,
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
        team,
        pokemons: team.pokemons
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