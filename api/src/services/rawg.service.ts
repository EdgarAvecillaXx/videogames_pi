//? DEPENDENDCIES
import axios from 'axios';
import { GetRwagGenresResponse, GenreI } from '../types';
import utils from '../utils';

//$ rawg Client
const { RAWG_API_KEY } = process.env;
const rawgClient = axios.create({
  baseURL: 'https://api.rawg.io/api/',
  headers: { 'Accept-Encoding': 'application/json' },
});

export default class RawgService {
  //$ get rawg Genres
  async getRawgGenres(): Promise<GenreI[]> {
    try {
      const {
        data: { results },
      } = await rawgClient.get<GetRwagGenresResponse>(`/genres?key=${RAWG_API_KEY}`);

      const data: GenreI[] = results.map(({ id, name, slug, image_background }) => ({
        id,
        name,
        slug,
        image_background,
      }));

      return data;
    } catch (e: any) {
      throw utils.ErrorHandler(e, 'RAWG', 'GET /genres', e?.message, 503);
    }
  }
}
