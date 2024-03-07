import { Router } from "express";
import { get_nodes, upload_node } from "../controllers/node.controller";

const route = Router();

route.post("/", upload_node);
route.get("/", get_nodes);

export default route;
