import DataTypes, { Sequelize } from 'sequelize';
import { Genre } from '../types';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
export default (sequelize: Sequelize): void => {
  // defino el modelo
  sequelize.define<Genre>('genre', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
};
