import { Team } from "../models/team.js";

function index(req, res) {
  Team.find({})
    .then(teams => {
      res.render('community/index', {
        teams,
        title: "Community",
        pokemons: teams.pokemons
      });
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    });
};

function show(req, res) {
  Team.findById(req.params.id)
    .then(team => {
      res.render(`teams/${req.params.id}`, {
        title: team.title,
        team,
        pokemons: team.pokemons
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    });
};


export {
  index,
  show
}