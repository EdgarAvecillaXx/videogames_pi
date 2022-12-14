//* Types
import { NextFunction, Request, Response } from 'express';
import { DBServiceType, GenreI, RawgServiceType, GenreModel } from 'types';
import { ModelStatic } from 'sequelize';

//* Dependencies
import { Genre } from 'db';
import services from 'services';
import utils from 'utils';

export default function GenresController() {}

//? Obtain genres elemnts, from DB or RAWG
GenresController.getGenres = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    //$ BD Genre service
    const genreService: DBServiceType = new services.GenreService(Genre as ModelStatic<GenreModel>);
    let genres: GenreI[] = await genreService.getGenres();

    console.log(genres.length ? 'Serving from DB' : 'Serving from RAWG');
    if (!genres.length) {
      //$ RAWG Genre Service
      const rawgGenreService: RawgServiceType = new services.RawgService();
      genres = await rawgGenreService.getRawgGenres();
      await genreService.addGenres(genres);
    }

    res.status(200).send(genres);
  } catch (e: any) {
    if (!e.status) e = utils.ErrorHandler(e, 502, 'GET /genres', 'controller');
    next(e);
  }
};

/*
  + Obtiene todos los tipos de generos 
  + en primera instancia debe traerlos de rawg 
  + Una vez guardados en la base utilizarlos desde ahi 
*/
