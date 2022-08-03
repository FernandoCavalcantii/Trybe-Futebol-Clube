import classification from '../helpers/classification';
import { ILeaderboardsService } from '../protocols/interfaces';
import { TTeamInfo } from '../protocols/types';
// import { TTeamInfo } from '../protocols/types';
// import MatchesModel from '../repository/matches.model';

// const matchesModel = new MatchesModel();

class LeaderboardsService implements ILeaderboardsService {
  homeClassification: Omit<TTeamInfo, 'id'>[];
  awayClassification: Omit<TTeamInfo, 'id'>[];
  classification: Omit<TTeamInfo, 'id'>[];

  async readHomeLeaderboards(): Promise<Omit<TTeamInfo, 'id'>[]> {
    const leaderboards = await classification(true, false);
    const noIdLeaderboards = leaderboards.map((team) => {
      const { id, ...noId } = team;
      return noId;
    });
    this.homeClassification = noIdLeaderboards;
    return this.homeClassification;
  }

  async readAwayLeaderboards(): Promise<Omit<TTeamInfo, 'id'>[]> {
    const leaderboards = await classification(false, true);
    const noIdLeaderboards = leaderboards.map((team) => {
      const { id, ...noId } = team;
      return noId;
    });
    this.awayClassification = noIdLeaderboards;
    return this.awayClassification;
  }

  async readLeaderboards(): Promise<Omit<TTeamInfo, 'id'>[]> {
    const leaderboards = await classification(true, true);
    const noIdLeaderboards = leaderboards.map((team) => {
      const { id, ...noId } = team;
      return noId;
    });
    this.classification = noIdLeaderboards;
    return this.classification;
  }
}

export default LeaderboardsService;
