import { Router } from "express";
import { upload_node } from "../controllers/node.controller";

const route = Router();

route.post("/", upload_node);

export default route;
