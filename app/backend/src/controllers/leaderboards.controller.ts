import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderboardsService } from '../protocols/interfaces';

class LeaderboardsController {
  leaderboardsService: ILeaderboardsService;

  constructor(service: ILeaderboardsService) {
    this.leaderboardsService = service;
  }

  readHomeLeaderboards = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboards = await this.leaderboardsService.readHomeLeaderboards();
      return res.status(StatusCodes.OK).json(leaderboards);
    } catch (err) {
      next(err);
    }
  };

  readAwayLeaderboards = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboards = await this.leaderboardsService.readAwayLeaderboards();
      return res.status(StatusCodes.OK).json(leaderboards);
    } catch (err) {
      next(err);
    }
  };

  readLeaderboards = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboards = await this.leaderboardsService.readLeaderboards();
      return res.status(StatusCodes.OK).json(leaderboards);
    } catch (err) {
      next(err);
    }
  };
}

export default LeaderboardsController;
