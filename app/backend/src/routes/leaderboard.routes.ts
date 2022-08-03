import { NextFunction, Request, Response, Router } from 'express';
import Factory from '../factory/Factory';
// import authToken from '../middlewares/authToken';

const leaderboardRouter = Router();

const homeLeaderboardPath = '/leaderboard/home';
const awayLeaderboardPath = '/leaderboard/away';
const leaderboardPath = '/leaderboard';

const leaderboardsController = new Factory();

leaderboardRouter.get(homeLeaderboardPath, (req: Request, res: Response, next: NextFunction) => {
  leaderboardsController.leaderboardsFactory().readHomeLeaderboards(req, res, next);
});

leaderboardRouter.get(awayLeaderboardPath, (req: Request, res: Response, next: NextFunction) => {
  leaderboardsController.leaderboardsFactory().readAwayLeaderboards(req, res, next);
});

leaderboardRouter.get(leaderboardPath, (req: Request, res: Response, next: NextFunction) => {
  leaderboardsController.leaderboardsFactory().readLeaderboards(req, res, next);
});

export default leaderboardRouter;
