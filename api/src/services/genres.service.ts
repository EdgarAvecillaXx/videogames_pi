import { Model } from 'sequelize';
import { ModelStatic } from 'sequelize';

export default class GenreService {
  declare genresModel;
  declare getGenres;
  constructor(genresModel: ModelStatic<Model<any, any>>) {
    this.genresModel = genresModel;
    this.getGenres = async () => {
      return await this.genresModel.findAll();
    };
  }
}
