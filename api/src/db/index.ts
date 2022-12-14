import 'config';
import { Sequelize, ModelStatic, Model } from 'sequelize';
import fs from 'fs';
import path from 'path';
const { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize: Sequelize = new Sequelize(DB as string, DB_USER as string, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  port: parseInt(DB_PORT as string),
  dialectOptions: {
    ssl: { require: true },
  },
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename: string = path.basename(__filename);

let modelDefiners: { default: (sequelize: Sequelize) => void }[] = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '../models'))
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts')
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, '../models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model.default(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
(sequelize.models as { [key: string]: ModelStatic<Model<any, any>> }) = Object.fromEntries(capsEntries);
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
export const { Videogame } = sequelize.models;
export const { Genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre, { through: 'VideogameGenres' });
Genre.belongsToMany(Videogame, { through: 'VideogameGenres' });

export const conn = sequelize;
