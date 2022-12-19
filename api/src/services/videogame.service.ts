//? Dependencies
import { ModelStatic } from 'sequelize';
import { Genre } from 'db';
import { VideogameI, VideogameModel, VideogameDetailI } from 'types';
import utils from 'utils';

export default class VideogameService {
  constructor(private readonly videogame: ModelStatic<VideogameModel>) {
    this.videogame = videogame;
  }

  //$get all records from the DB
  async getVideogames(name?: unknown): Promise<VideogameI[]> {
    const videogames: VideogameModel[] = await this.videogame

      .findAll<VideogameModel>({
        where: name ? { name: name as string } : undefined,
        attributes: ['id', 'name'],
        include: { model: Genre, attributes: ['name'], through: { attributes: [] } },
      })
      .catch<never>(error => {
        throw utils.ErrorHandler(error, 503, 'DBvideogame', 'getVideogames');
      });

    return videogames as unknown as VideogameI[];
  }

  //$ Get Videogame By Id
  async getVideogame(id: string): Promise<VideogameDetailI> {
    const videogame: VideogameModel | null = await this.videogame
      .findOne<VideogameModel>({
        where: { id: id },
        include: { model: Genre, attributes: ['name'], through: { attributes: [] } },
      })
      .catch<never>(error => {
        throw utils.ErrorHandler(error, 503, 'DBvideogame', 'getVideogameById');
      });

    return videogame as unknown as VideogameDetailI;
  }

  async addVideogame(videogame: any, genres: any): Promise<{ msg: string }> {
    await (await this.videogame.create(videogame)).setGenres(genres).catch<never>(error => {
      throw utils.ErrorHandler(error, 503, 'DBvideogame', 'addVideogame');
    });
    return { msg: 'The game has been created succesfully' };
  }
}
