import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Error {
  error: unknown;
  status: number;
  message: string;
  service: string;
  type: string;
}

//? Models Types
export interface VideogameModel
  extends Model<InferAttributes<VideogameModel>, InferCreationAttributes<VideogameModel>> {
  id: string;
  name: string;
  description: string;
  release_date: CreationOptional<Date>;
  rating: CreationOptional<number>;
  platforms: Array<string>;
}

export interface GenreModel extends Model<InferAttributes<GenreModel>, InferCreationAttributes<GenreModel>> {
  id: number;
  name: CreationOptional<string>;
  slug: CreationOptional<string>;
  image_background: CreationOptional<string>;
}

//? Rawg Types
export interface RawgGenre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
  games: {}[];
  games_count: number;
}
export interface GetRwagGenresResponse {
  results: RawgGenre[];
}

//?Types
export interface GenreI {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}