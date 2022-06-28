import { Team } from "../models/team.js";
import { Profile } from "../models/profile.js";
import  * as indexController from "./index.js"

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

      res.render('teams/index', {
        myFavorites: favorites,
        myTeam: myTeams,
        title: "Teams"
      });

    })
    .catch(err => {
      console.log(err)
      console.log("I Did the Error thing");
      indexController.index;
      
    });
};

function newTeam(req, res) {

};

function createPokemon(req, res) {

};

function create(req, res) {

};

function show(req, res) {

};

function edit(req, res) {

};

// function editPokemon(req,res) {

// };

function update(req, res) {

};

function deleteTeam(req, res) {

};

// function deletePokemon(req,res) {

// };

export {
  index,
  newTeam as new,
  createPokemon,
  create,
  show,
  edit,
  update,
  deleteTeam as delete,
}