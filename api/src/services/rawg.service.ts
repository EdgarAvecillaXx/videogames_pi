//* Types
import { RawgGenreResponse, RawgVideogameResponse, GenreI, VideogameI, VideogameDetailI } from '../types';
//* DEPENDENDCIES
import axios from 'axios';
import utils from 'utils';

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
      } = await rawgClient.get<RawgGenreResponse>(`/genres?key=${RAWG_API_KEY}`);

      //$ transforms the genre Response to GenreI
      const data: GenreI[] = results.map<GenreI>(({ id, name, slug, image_background }) => ({
        id,
        name,
        slug,
        image_background,
      }));

      return data;
    } catch (e: any) {
      throw utils.ErrorHandler(e, 503, 'RAWG', 'GET /genres', e?.response?.data?.error);
    }
  }

  async getRawgVideogames(name?: unknown): Promise<VideogameI[]> {
    try {
      const res = [];
      if (name) {
        const {
          data: { results },
        } = await rawgClient.get<RawgVideogameResponse>(
          `/games?name=${name}&key=${RAWG_API_KEY}&page_size=15`
        );
        res.push(...results);
      } else {
        //$ Here it is used for loop to iterate to obtain 100 records from Rawg
        for (let i = 1; i < 6; i++) {
          const {
            data: { results },
          } = await rawgClient.get<RawgVideogameResponse>(`/games?key=${RAWG_API_KEY}&page=${i}`);
          //$ transform the videgame Repsonse to VideoGameI
          const data = results.map<VideogameI>(({ id, name, image_background, genres }) => ({
            id,
            name,
            image_background,
            genres,
          }));
          res.push(...data);
        }
      }
      return res;
    } catch (e: any) {
      throw utils.ErrorHandler(e, 503, 'RAWG', 'GET /videogames', e?.response?.data?.error);
    }
  }

  async getRawgVideogameById(id: string): Promise<VideogameDetailI> {
    try {
      let game: VideogameDetailI;
      const { data } = await rawgClient.get(`/games/${id}?key=${RAWG_API_KEY}`);
      game = {
        id: data.id,
        name: data.name,
        description: data.description,
        release_date: data.released,
        platforms: data.platforms.map(({ platform }: any) => platform.name),
        rating: data.rating,
        genres: data.genres.map((genre: GenreI) => ({
          id: genre.id,
          name: genre.name,
          slug: genre.slug,
          image_background: genre.image_background,
        })),
        image_background: data.image_background,
      };
      return game;
    } catch (e: any) {
      throw utils.ErrorHandler(e, 503, 'RAWG', `GET /videogames/${id}`, e?.response?.data?.error);
    }
  }
}
