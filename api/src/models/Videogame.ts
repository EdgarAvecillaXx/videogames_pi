import DataTypes, { Sequelize } from 'sequelize';
import { VideogameModel } from '../types';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
export default (sequelize: Sequelize): void => {
  // defino el modelo
  sequelize.define<VideogameModel>('videogame', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      set(value) {
        this.setDataValue('id', 'HENRY' + value);
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  });
};
