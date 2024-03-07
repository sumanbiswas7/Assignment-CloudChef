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
      await Node.deleteMany(); // clear node colletion before uploading again

      for (const node of nodes) {
         const newNode = new Node(node);
         await newNode.save();
      }

      response.status = HTTP_STATUS.OK;
      return res.status(response.status).json(response);
   } catch (error) {
      console.log(error);
      response.isError = true;
      response.status = HTTP_STATUS.SERVICE_UNAVAILABLE;
      response.message = "Something went wrong";
      res.status(response.status).json(response);
   }
}

export async function get_nodes(_: Request, res: Response) {
   const response = new HttpResponse({});
   try {
      await mongoose.connect(process.env.DATABASE_URL);
      const nodes = await Node.find();
      response.status = HTTP_STATUS.OK;
      response.data = { nodes };
      return res.status(response.status).json(response);
   } catch (error) {
      console.log(error);
      response.isError = true;
      response.status = HTTP_STATUS.SERVICE_UNAVAILABLE;
      response.message = "Something went wrong";
      res.status(response.status).json(response);
   }
}
