import { Router } from "express";
import * as teamController from "../controllers/teams.js";
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

// GET pokegoose.herokuapp.com/teams
router.get('/', isLoggedIn, teamController.index);

// GET pokegoose.herokuapp.com/teams/new
router.get('/new', isLoggedIn, teamController.new);

// GET pokegoose.herokuapp.com/teams/:id
router.get('/:id', teamController.show);

// GET pokegoose.herokuapp.com/teams/:id/edit
router.get('/:id/edit', isLoggedIn, teamController.edit);

// POST pokegoose.herokuapp.com/teams
router.post('/', isLoggedIn, teamController.create);

// POST pokegoose.herokuapp.com/teams/:id/pokemons
router.post('/:id/pokemons', isLoggedIn, teamController.createPokemon);

// PUT pokegoose.herokuapp.com/teams
router.put('/:id', isLoggedIn, teamController.update);

// PUT pokegoose.herokuapp.com/teams
router.patch('/:id/favorites', isLoggedIn, teamController.addToFavorites);

// DELETE pokegoose.herokuapp.com/teams/:id
router.delete('/:id', isLoggedIn, teamController.delete);

// DELETE pokegoose.herokuapp.com/teams/:id
router.delete('/:id/pokemons/:pokemonId', isLoggedIn, teamController.deletePokemon);

// DELETE pokegoose.herokuapp.com/teams/:id/favorites
router.delete('/:id/favorites', isLoggedIn, teamController.removeFromFavorites);



export {
  router
}