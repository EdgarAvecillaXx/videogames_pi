import { Request, Response } from 'express';
import { Genre } from '../db';
import services from '../services';

export default class GenresController {
  static async getGenres(req: Request, res: Response) {
    const genreService = new services.GenreService(Genre);
    const genres = await genreService.getGenres();
    res.status(200).json(genres);
    //1 primero validamos si genres de db esta vacio //$ Validador
    //2 si esta vacio llamamos al servicio de rawg, //$ Servicio rawg
    //2.1 si llamamos al servicio de rawg, llenamos el servicio de bd //$ servicio bd
    //3 si tiene info llamamos al servicio de la bd //$ servicio bd
  }
}

/*
  + Obtiene todos los tipos de generos 
  + en primera instancia debe traerlos de rawg 
  + Una vez guardados en la base utilizarlos desde ahi 
*/
