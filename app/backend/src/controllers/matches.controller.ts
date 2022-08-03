import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../protocols/interfaces';

class MatchesController {
  matchesService: IMatchesService;

  constructor(service: IMatchesService) {
    this.matchesService = service;
  }

  readMatches = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.matchesService.readMatches();
      return res.status(StatusCodes.OK).json(matches);
    } catch (err) {
      next(err);
    }
  };

  createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const newMatch = await this.matchesService.createMatch(body);
      return res.status(StatusCodes.CREATED).json(newMatch);
    } catch (err) {
      next(err);
    }
  };

  updateProgressFalse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.matchesService.updateProgressFalse(id);
      return res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  };

  updateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { body } = req;
      await this.matchesService.updateMatch(id, body);
      return res.status(StatusCodes.OK).json({ message: 'Match updated' });
    } catch (err) {
      next(err);
    }
  };
}

export default MatchesController;
