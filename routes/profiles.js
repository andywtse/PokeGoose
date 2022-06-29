import { Router } from "express";
import * as profileController from "../controllers/profiles.js";
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

// GET pokegoose.herokuapp.com/profiles
router.get('/', isLoggedIn, profileController.index);

// GET pokegoose.herokuapp.com/profiles
router.get('/:id', isLoggedIn, profileController.show);



export {
  router
}