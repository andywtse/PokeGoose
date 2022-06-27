import { Router } from "express";
import * as communityController from "../controllers/community.js";

const router = Router();

// GET pokegoose.herokuapp.com/community
router.get('/', communityController.index);

// GET pokegoose.herokuapp.com/community
router.get('/:id', communityController.show);


export {
  router
}
