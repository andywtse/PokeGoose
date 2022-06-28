import { Router } from "express";
import * as teamController from "../controllers/teams.js";
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

// GET pokegoose.herokuapp.com/teams
router.get('/', isLoggedIn, teamController.index);

// GET pokegoose.herokuapp.com/teams/new
router.get('/new', isLoggedIn, teamController.new);

// GET pokegoose.herokuapp.com/teams/:id
router.get('/:id', isLoggedIn, teamController.show);

// GET pokegoose.herokuapp.com/teams/:id/edit
router.get('/:id/edit', isLoggedIn, teamController.edit);

// // GET pokegoose.herokuapp.com/teams/new
// router.get('/:id/pokemon/new', isLoggedIn, teamController.newPokemon);

// // GET pokegoose.herokuapp.com/teams/:id/:pokemonId/edit
// router.get('/:id/:pokemonId/edit', isLoggedIn, teamController.editPokemon);

// GET pokegoose.herokuapp.com/teams
router.post('/', isLoggedIn, teamController.create);

// // GET pokegoose.herokuapp.com/teams/:id/pokemons
// router.get('/:id/pokemons', isLoggedIn, teamController.createPokemon);

// GET pokegoose.herokuapp.com/teams/:id
router.delete('/:id', isLoggedIn, teamController.delete);

// GET pokegoose.herokuapp.com/teams
router.put('/:id', isLoggedIn, teamController.index);


export {
  router
}