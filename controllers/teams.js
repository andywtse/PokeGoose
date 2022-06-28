import { Team } from "../models/team.js";
import { Profile } from "../models/profile.js";
import { Pokemon } from "../models/pokemon.js";
import { CustomPokemon } from "../models/custompokemon.js";
import * as indexController from "./index.js"

function index(req, res) {

  let favorites = [];
  let myTeams = [];

  Profile.findById(req.user.profile._id)
    .populate('favorites')
    .populate('myTeams')
    .then(profile => {

      if (typeof profile.favorites !== 'undefined') {
        favorites = profile.favorites;
      }
      if (typeof profile.myTeams !== 'undefined') {
        myTeams = profile.myTeams;
      }

      res.render('teams/index', {
        myFavorites: favorites,
        myTeam: myTeams,
        title: "Teams"
      });

    })
    .catch(err => {
      console.log(err)
      indexController.index;
    });
};

function newTeam(req, res) {
  Pokemon.find({}).sort('name')
  .then( pokemons => {
    res.render('teams/new', {
      title: "Create Team",
      pokemons
    })
  })
  .catch(err => {
    console.log(err)
    indexController.index;
  });
};

function newPokemon(req,res) {

};

function create(req, res) {
  req.body.owner = req.user.profile._id;
  Team.create(req.body)
  .then( team => {
    Profile.findById(team.owner)
      .then(profile=> {
        profile.myTeams.push(team._id);
        profile.save();
      })
    res.redirect(`/teams/${team._id}`);
  })
  .catch(err => {
    console.log(err)
    res.redirect('/teams/index')
  });
};

function createPokemon(req,res) {

};

function show(req, res) {
  Team.findById(req.params.id)
  .populate('pokemon')
  .then( team => {
    let isSelf = false;
    if(typeof req.user !== 'undefined'){
      isSelf = team.owner.equals(req.user.profile._id)
    }
    CustomPokemon.find({})
    .then(custom => {

      let customList = [];

      if( typeof custom !== 'undefined' ) {
        customList = custom;
      }

      res.render('teams/show', {
        title: "Team Detail",
        custom: customList,
        team,
        isSelf
      });
    })
    .catch(err => {
      console.log(err)
      indexController.index;
    });
  })
  .catch(err => {
    console.log(err)
    indexController.index;
  });
};

function edit(req, res) {

};

function update(req, res) {

};

function deleteTeam(req, res) {
  Team.findById(req.params.id)
  .then(team => {
    if (team.owner.equals(req.user.profile._id)){
      team.delete()
      .then(()=>{
        res.redirect('/teams');
      })
    } else {
      throw new Error ('NOT AUTHORIZED');
    }
    
  })
  .catch(err => {
    console.log(err)
    indexController.index;
  });
};

// function scrapePokemon() {
//   for (let i = 0; i < 1154; i++) {
//     axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
//       .then(response => {
//         req.body.name = response.data.name
//         req.body.icon = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${i}.png?raw=true`
//         let arrayMoves = []
//         response.data.moves.forEach(move => {
//           arrayMoves.push(move.move.name)
//         });
//         req.body.moves = arrayMoves
//         Pokemon.create(req.body)
//           .then(pokemon => {
//             res.redirect('/teams')
//           })
//           .catch(err => {
//             console.log(err)
//             indexController.index;
//           })
//       })
//       .catch(err => {
//         console.log(err)
//         indexController.index;
//       })
//   }
// }

export {
  index,
  newTeam as new,
  newPokemon,
  create,
  createPokemon,
  show,
  edit,
  update,
  deleteTeam as delete,
}