import { Router } from "express";
import { get_animals } from "../controllers/animal.controller";

const route = Router();

// get all animals
route.get("/", get_animals);

export default route;
