//* Types
import { ModelStatic } from 'sequelize';
import { GenreI, GenreModel } from '../types';

//* Dependencies
import utils from '../utils';

export default class GenreService {
  constructor(private readonly genre: ModelStatic<GenreModel>) {
    this.genre = genre;
  }

  //$ get all records of the model
  async getGenres(): Promise<GenreI[]> {
    try {
      const genres: GenreModel[] = await this.genre.findAll<GenreModel>();
      const result: GenreI[] = genres.map<GenreI>(({ dataValues: { id, name, slug, image_background } }) => ({
        id,
        name,
        slug,
        image_background,
      }));
      return result;
    } catch (e) {
      throw utils.ErrorHandler(e, 503, 'DBgenre', 'getGenres');
    }
  }

  //$ add records of the model by batch
  async addGenres(bulk: GenreI[]): Promise<void> {
    await this.genre.bulkCreate<GenreModel>(bulk as []).catch<never>(error => {
      throw utils.ErrorHandler(error, 503, 'DBgenre', 'addGenres');
    });
  }
}
