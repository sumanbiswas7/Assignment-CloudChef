import { Request, Response } from "express";
import mongoose from "mongoose";
import { HTTP_STATUS, HttpResponse } from "types";
import { isValidJson } from "utils";
import { Node } from "../models/node.model";

export async function upload_node(req: Request, res: Response) {
   const response = new HttpResponse({});
   try {
      const { nodes } = req.body;

      if (!nodes) {
         response.isError = true;
         response.status = HTTP_STATUS.BAD_REQUEST;
         response.message = `nodes is required in req.body`;
         return res.status(response.status).json(response);
      }

      if (isValidJson(nodes) === false) {
         response.isError = true;
         response.status = HTTP_STATUS.BAD_REQUEST;
         response.message = `given json file is not valid`;
         return res.status(response.status).json(response);
      }

      await mongoose.connect(process.env.DATABASE_URL);

      for (const node of nodes) {
         const newNode = new Node(node);
         await newNode.save();
      }

      await mongoose.disconnect();
      response.status = HTTP_STATUS.OK;
      return res.status(response.status).json(response);
   } catch (error) {
      response.isError = true;
      response.status = HTTP_STATUS.SERVICE_UNAVAILABLE;
      response.message = "Something went wrong";
      res.status(response.status).json(response);
   }
}
