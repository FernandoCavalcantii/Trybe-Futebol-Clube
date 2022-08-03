import { StatusCodes } from 'http-status-codes';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import CustomError from '../helpers/CustomError';
import { IMatchesModel } from '../protocols/interfaces';
import { TNewMatch, TUpdateScore } from '../protocols/types';

class MatchesModel implements IMatchesModel {
  constructor(private model = Match) {
    this.model = model;
  }

  async readMatches(): Promise<Match[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    console.log(matches);
    return matches;
  }

  async createMatch(match: TNewMatch): Promise<Match> {
    try {
      const inProgressMatch = {
        ...match,
        inProgress: true,
      };
      const newMatch = await this.model.create(inProgressMatch);
      return newMatch;
    } catch (err) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }
  }

  async updateProgressFalse(id: string): Promise<[number, Match[]]> {
    const updateResult = await this.model.update({ inProgress: false }, { where: { id } });
    return updateResult;
  }

  async updateMatch(id: string, body: TUpdateScore): Promise<[number, Match[]]> {
    const { homeTeamGoals, awayTeamGoals } = body;
    const updateResult = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return updateResult;
  }
}

export default MatchesModel;
