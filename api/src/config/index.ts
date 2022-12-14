//* Dependencies
import { config } from 'dotenv';
import path from 'path';

//? Obtain enviromental variables for development enviroment
if (process.env.NODE_ENV !== 'production') {
  config({ path: path.join(__dirname, '../../.env') });
}
