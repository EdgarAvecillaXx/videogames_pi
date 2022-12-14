//* Types
import { NextFunction, Request, Response } from 'express';
import { ModelStatic } from 'sequelize';
import { VideogameModel, RawgServiceType, videogameServiceType, VideogameDetailI } from 'types';
//* Dependencies
import { Videogame } from 'db';
import services from 'services';
import utils from 'utils';
export default function VideogamesController() {}

//$ GET/ videogames
VideogamesController.getVideogames = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //$ RAWG instance
    const rawgService: RawgServiceType = new services.RawgService();
    const data = await rawgService.getRawgVideogames();

    //$ BD instance
    const videogameService: videogameServiceType = new services.VideogameService(
      Videogame as ModelStatic<VideogameModel>
    );
    const data2 = await videogameService.getVideogames();
    data.push(...data2);

    res.status(200).send(data);
  } catch (e: any) {
    if (!e.status) e = utils.ErrorHandler(e, 502, 'GET /videogames', 'controller');
    next(e);
  }
};

//$ GET/ videogames/idVideogame
VideogamesController.getVideogameById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { idVideogame } = req.params;
  try {
    let videogame: VideogameDetailI;

    //$ DB Instance
    if (idVideogame.startsWith('EA')) {
      const videogameService: videogameServiceType = new services.VideogameService(
        Videogame as ModelStatic<VideogameModel>
      );
      videogame = await videogameService.getVideogame(idVideogame);

      //$ RAWG instance
    } else {
      const rawgService: RawgServiceType = new services.RawgService();
      console.log(idVideogame);
      videogame = await rawgService.getRawgVideogameById(idVideogame);
    }
    res.status(200).send(videogame);
  } catch (e: any) {
    if (!e.status) e = utils.ErrorHandler(e, 502, `GET /videogames/${idVideogame}`, 'controller');
    next(e);
  }
};

//$ POST/ videogames
VideogamesController.addVideogame = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  //TODO: validar parametros
  try {
    //$DB Instance
    const videogameService: videogameServiceType = new services.VideogameService(
      Videogame as ModelStatic<VideogameModel>
    );
    const addVideogame: { msg: string } = await videogameService.addVideogame(req.body);

    res.status(200).json(addVideogame);
  } catch (e: any) {
    if (!e.status) e = utils.ErrorHandler(e, 502, 'POST /videogames', 'controller');
    next(e);
  }
};
