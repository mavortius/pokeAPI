import { Request, Response } from "express";

import { Pokemon } from "../models/pokemon.model";
import { WELCOME_MESSAGE } from "../constants/pokeApi.constants";

export class PokeService {
  public welcomeMessage(req: Request, res: Response) {
    res.status(200).send(WELCOME_MESSAGE);
  }

  public getAllPokemon(req: Request, res: Response) {
    Pokemon.find({}, (error: Error, pokemon: any) => {
      if (error) {
        res.send(error);
      }
      res.json(pokemon);
    });
  }

  public addNewPokemon(req: Request, res: Response) {
    const newPokemon = new Pokemon(req.body);
    newPokemon.save((error: Error, pokemon: any) => {
      if (error) {
        res.send(error);
      }
      res.json(pokemon);
    });
  }

  public deletePokemon(req: Request, res: Response) {
    const pokemonID = req.params.id;
    Pokemon.findByIdAndDelete(pokemonID, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted ? "Deleted successfully" : "Pokemon not found :(";
      res.status(200).send(message);
    });
  }

  public updatePokemon(req: Request, res: Response) {
    const pokemonID = req.params.id;
    Pokemon.findOneAndUpdate(
      { _id: pokemonID },
      req.body,
      (error: Error, pokemon: any) => {
        if (error) {
          res.send(error);
        }
        res.json(pokemon);
      }
    );
  }
}
