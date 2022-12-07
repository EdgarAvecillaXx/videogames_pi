import { CreationOptional, InferAttributes, InferCreationAttributes, Model, ModelStatic } from 'sequelize';

export interface Error {
  status: number;
  message: string;
}

export interface Videogame extends Model<InferAttributes<Videogame>, InferCreationAttributes<Videogame>> {
  id: string;
  name: string;
  description: string;
  release_date: CreationOptional<Date>;
  rating: CreationOptional<number>;
  platforms: Array<string>;
}

export interface Genre extends Model<InferAttributes<Genre>, InferCreationAttributes<Genre>> {
  id: string;
  name: CreationOptional<string>;
}
