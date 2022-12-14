import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import GenreService from 'services/genres.service';
import RawgService from 'services/rawg.service';
import VideogameService from 'services/videogame.service';

//? Error types
export interface Error {
  error: unknown;
  status: number;
  message: string;
  service: string;
  type: string;
}

//? Models types
export interface VideogameModel
  extends Model<InferAttributes<VideogameModel>, InferCreationAttributes<VideogameModel>> {
  id: string;
  name: string;
  description: string;
  release_date: CreationOptional<Date>;
  rating: CreationOptional<number>;
  platforms: Array<string>;
}

export class GenreModel extends Model<InferAttributes<GenreModel>, InferCreationAttributes<GenreModel>> {
  id: number;
  name: CreationOptional<string>;
  slug: CreationOptional<string>;
  image_background: CreationOptional<string>;
}

//? Rawg Types
export interface RawgServiceType extends RawgService {}

export interface RawgGenre extends GenreI {
  games: {}[];
  games_count: number;
}

export interface RawgVideogame extends VideogameI {
  released: Date;
  background_image: string;
  genres: Array<string>;
}

export interface RawgGenreResponse {
  count: number;
  next: string;
  previous: string;
  results: RawgGenre[];
}

export interface RawgVideogameResponse {
  count: number;
  next: string;
  previous: string;
  results: RawgVideogame[];
}

//? DB types
export interface DBServiceType extends GenreService {}

export interface videogameServiceType extends VideogameService {}
export interface GenreI {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

export interface VideogameI {
  id: string;
  name: string;
  image_background?: string;
  genres: Array<string>;
}

export interface VideogameDetailI extends VideogameI {
  description: string;
  platforms: Array<String>;
  rating: number;
  release_date: Date;
}
