import { NextFunction, Request, Response, Router } from 'express';
import Factory from '../factory/Factory';
import authToken from '../middlewares/authToken';

const matchesRouter = Router();

const matchesPath = '/matches';
const matchesIdPath = '/matches/:id';
const matchesIdFinishPath = '/matches/:id/finish';

const matchesController = new Factory();

matchesRouter.get(matchesPath, (_req: Request, res: Response, next: NextFunction) => {
  matchesController.matchesFactory().readMatches(_req, res, next);
});

matchesRouter.post(matchesPath, authToken, (req: Request, res: Response, next: NextFunction) => {
  matchesController.matchesFactory().createMatch(req, res, next);
});

matchesRouter.patch(matchesIdFinishPath, (req: Request, res: Response, next: NextFunction) => {
  matchesController.matchesFactory().updateProgressFalse(req, res, next);
});

matchesRouter.patch(matchesIdPath, (req: Request, res: Response, next: NextFunction) => {
  matchesController.matchesFactory().updateMatch(req, res, next);
});

export default matchesRouter;
