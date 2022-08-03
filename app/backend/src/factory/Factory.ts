import LeaderboardsController from '../controllers/leaderboards.controller';
import MatchesController from '../controllers/matches.controller';
import TeamsController from '../controllers/teams.controller';
import MatchesModel from '../repository/matches.model';
import TeamsModel from '../repository/teams.model';
import LeaderboardsService from '../services/leaderboards.service';
import MatchesService from '../services/matches.service';
import TeamsService from '../services/teams.service';

class Factory {
  teamsFactory = (): TeamsController => {
    const model = new TeamsModel();
    const service = new TeamsService(model);
    const controller = new TeamsController(service);

    return controller;
  };

  matchesFactory = (): MatchesController => {
    const model = new MatchesModel();
    const service = new MatchesService(model);
    const controller = new MatchesController(service);

    return controller;
  };

  leaderboardsFactory = (): LeaderboardsController => {
    const service = new LeaderboardsService();
    const controller = new LeaderboardsController(service);

    return controller;
  };
}

export default Factory;
