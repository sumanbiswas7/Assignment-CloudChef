import serverless from "serverless-http";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { AUTHOR } from "utils";
import animalRoutes from "./routes/animal.route";

export const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/animal", animalRoutes);

app.get("/", (req: Request, res: Response) => {
   res.json({
      AUTHOR,
      working: true,
      message: `Hello World`,
      secret: `SECRET: ${process.env.SECRET} 🤫`,
   });
});

export const handler = serverless(app);
