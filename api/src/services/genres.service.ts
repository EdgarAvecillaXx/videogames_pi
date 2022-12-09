//? Dependencies
import { Model, ModelStatic } from 'sequelize';
import { GenreI } from '../types';
import utils from '../utils';

export default class DBService {
  constructor(private readonly Model: ModelStatic<Model>) {
    this.Model = Model;
  }

  //$ get all records of the model
  async getRecords(): Promise<GenreI[]> {
    const records: Model[] = await this.Model.findAll().catch(error => {
      throw utils.ErrorHandler(error, 'DB', 'getRecords', error?.message, 503);
    });
    return records as unknown as GenreI[];
  }

  //$ add records of the model by batch
  async addBulk(bulk: GenreI[]): Promise<void> {
    await this.Model.bulkCreate(bulk as []).catch(error => {
      throw utils.ErrorHandler(error, 'DB', 'addBulk', error?.message, 503);
    });
  }
}
