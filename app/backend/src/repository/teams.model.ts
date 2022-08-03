import Model from '../database/models/Team';
import { ITeamsModel } from '../protocols/interfaces';
import { TTeam } from '../protocols/types';

class TeamsModel implements ITeamsModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async readTeams(): Promise<TTeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async readTeamById(id: string): Promise<TTeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}

export default TeamsModel;
