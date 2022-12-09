import { Request, Response } from 'express';
import { ModelStatic, Model } from 'sequelize';
import services from '../services';

export default class GenresController {
  constructor(private readonly Genre: ModelStatic<Model>) {
    this.Genre = Genre;
  }
  async getGenres(req: Request, res: Response) {
    //$ BD Genre service
    const genreService = new services.GenreService(this.Genre);
    let genres = await genreService.getRecords();
    if (!genres.length) {
      //$ RAWG Genre Service
      const rawgGenreService = new services.RawgService();
      genres = await rawgGenreService.getRawgGenres();
      await genreService.addBulk(genres);
    }
    res.status(200).send(genres);
  }
}

/*
  + Obtiene todos los tipos de generos 
  + en primera instancia debe traerlos de rawg 
  + Una vez guardados en la base utilizarlos desde ahi 
*/
