import serverless from "serverless-http";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import nodeRoutes from "./routes/node.route";

export const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/node", nodeRoutes);

app.get("/", (req: Request, res: Response) => {
   res.json({
      working: true,
      message: `Hello World`,
      secret: `SECRET: ${process.env.SECRET} 🤫`,
   });
});

export const handler = serverless(app);
