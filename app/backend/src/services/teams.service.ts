import { StatusCodes } from 'http-status-codes';
import CustomError from '../helpers/CustomError';
import { ITeamsModel, ITeamsService } from '../protocols/interfaces';
import { TTeam } from '../protocols/types';

class TeamsService implements ITeamsService {
  teamsModel: ITeamsModel;

  constructor(model: ITeamsModel) {
    this.teamsModel = model;
  }

  async readTeams(): Promise<TTeam[]> {
    const teams = await this.teamsModel.readTeams();
    return teams;
  }

  async readTeamById(id: string): Promise<TTeam> {
    const team = await this.teamsModel.readTeamById(id);
    if (!team) throw new CustomError(StatusCodes.NOT_FOUND, 'Team ID not found');
    return team;
  }
}

export default TeamsService;
