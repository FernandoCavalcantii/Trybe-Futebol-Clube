import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeamsController, ITeamsService } from '../protocols/interfaces';

class LoginController implements ITeamsController {
  teamsService: ITeamsService;

  constructor(service: ITeamsService) {
    this.teamsService = service;
  }

  readTeams = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teams = await this.teamsService.readTeams();
      res.status(StatusCodes.OK).json(teams);
    } catch (err) {
      next(err);
    }
  };

  readTeamById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const team = await this.teamsService.readTeamById(id);
      res.status(StatusCodes.OK).json(team);
    } catch (err) {
      next(err);
    }
  };
}

export default LoginController;
