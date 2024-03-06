import { Request, Response } from "express";
import { HTTP_STATUS, HttpResponse } from "types";

const ANIMALS = [
   { id: 1, name: "Dog", species: "Canine", habitat: "Domestic" },
   { id: 2, name: "Cat", species: "Feline", habitat: "Domestic" },
   { id: 3, name: "Elephant", species: "Elephantidae", habitat: "Wild" },
   { id: 4, name: "Lion", species: "Panthera leo", habitat: "Wild" },
   { id: 5, name: "Monkey", species: "Primate", habitat: "Forest" },
];

export async function get_animals(_: Request, res: Response) {
   const response = new HttpResponse({});
   try {
      response.animals = ANIMALS;
      response.status = HTTP_STATUS.OK;
      return res.status(response.status).json(response);
   } catch (error) {
      response.isError = true;
      response.status = HTTP_STATUS.SERVICE_UNAVAILABLE;
      response.message = "Something went wrong";
      res.status(response.status).json(response);
   }
}
