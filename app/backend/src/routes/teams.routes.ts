import { NextFunction, Request, Response, Router } from 'express';
import Factory from '../factory/Factory';

const teamsRouter = Router();

const teamsPath = '/teams';
const teamsIdPath = '/teams/:id';

const teamsController = new Factory();

teamsRouter.get(teamsPath, (_req: Request, res: Response, next: NextFunction) => {
  teamsController.teamsFactory().readTeams(_req, res, next);
});

teamsRouter.get(teamsIdPath, (req: Request, res: Response, next: NextFunction) => {
  teamsController.teamsFactory().readTeamById(req, res, next);
});

export default teamsRouter;
