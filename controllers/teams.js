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
  Pokemon.find({name:req.body.name})
    .then( poke =>{
      req.body.icon = poke[0].icon;
      CustomPokemon.create(req.body)
      .then( pokemon => {
        Team.findById(req.params.id)
          .then(team=> {
            team.pokemon.push(pokemon);
            team.save()
            .then(()=>{
              res.redirect(`/teams/${team._id}`);
            })
          })
        })
      })
  .catch(err => {
    console.log(err)
    res.redirect('/teams/index')
  });
};

function show(req, res) {
  Team.findById(req.params.id)
  .populate('pokemon')
  .then( team => {
    let isSelf = false;
    let user = typeof req.user !== 'undefined'
    if(user){
      isSelf = team.owner.equals(req.user.profile._id)
    }
    Profile.findById(team.owner)
    .then(profile => {
      Pokemon.find({})
      .then(list=>{
        res.render('teams/show', {
          title: "Team Detail",
          team,
          pokemons: team.pokemon,
          list,
          profile,
          isSelf,
          user
        })

      })
    })
  })
  .catch(err => {
    console.log(err)
    indexController.index;
  });
};

function edit(req, res) {
  Team.findById(req.params.id)
  .then(team => {
    res.render('teams/edit', {
      title: "Edit Teams",
      team
    })
  })
  .catch(err => {
    console.log(err)
    indexController.index;
  });
};

function update(req, res) {
  Team.findByIdAndUpdate(req.params.id,req.body,{new:true})
  .then(team=>{
    res.redirect(`/teams/${team._id}`);
  })
  .catch(err => {
    console.log(err)
    indexController.index;
  });
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

function deletePokemon(req,res) {
  Team.findById(req.params.id)
  .then(team=>{
    team.pokemon.remove({_id:req.params.pokemonId});
    team.save().
    then(()=>{
      res.redirect(`/teams/${team._id}`);
    })
    
  })
  .catch(err => {
    console.log(err)
    indexController.index;
  });
}

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
  create,
  createPokemon,
  show,
  edit,
  update,
  deleteTeam as delete,
  deletePokemon
}