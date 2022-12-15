import DataTypes, { Sequelize } from 'sequelize';
import { VideogameModel } from 'types';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
export default (sequelize: Sequelize): void => {
  // defino el modelo
  sequelize.define<VideogameModel>(
    'Videogame',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        set(value) {
          this.setDataValue('id', 'EA' + value);
        },
        validate: {
          notEmpty: true,
          len: [2, 10],
          isAlphanumeric: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 500],
        },
      },
      release_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: true,
          min: 0,
          max: 5,
          len: [1, 3],
        },
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 10],
          isStringArray(value: []) {
            value.forEach(platform => {
              if (typeof platform !== 'string') throw new Error('platform must be string');
            });
          },
        },
      },
    },
    { timestamps: false }
  );
};
