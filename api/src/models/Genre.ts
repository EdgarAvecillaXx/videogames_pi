import DataTypes, { Sequelize } from 'sequelize';
import { GenreModel } from '../types';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
export default (sequelize: Sequelize): void => {
  // defino el modelo
  sequelize.define<GenreModel>(
    'genre',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
          isNumeric: true,
          notNull: true,
          len: [1, 5],
        },
      },
      name: {
        type: DataTypes.STRING(30),
        validate: {
          is: /^[A-Z][^A-Z]*$/g,
          notEmpty: true,
          len: [5, 30],
          isAlpha: true,
        },
      },
      slug: {
        type: DataTypes.STRING(30),
        validate: {
          isAlpha: true,
          isLowercase: true,
          len: [5, 30],
        },
      },
      image_background: {
        type: DataTypes.STRING(100),
        validate: {
          isUrl: true,
          notEmpty: true,
          len: [30, 100],
        },
      },
    },
    { timestamps: false }
  );
};
