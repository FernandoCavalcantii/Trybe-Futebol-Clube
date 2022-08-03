import { StatusCodes } from 'http-status-codes';
import Match from '../database/models/Match';
import CustomError from '../helpers/CustomError';
import { IMatchesModel, IMatchesService } from '../protocols/interfaces';
import { TNewMatch, TUpdateScore } from '../protocols/types';

class MatchesService implements IMatchesService {
  matchesModel: IMatchesModel;

  constructor(model: IMatchesModel) {
    this.matchesModel = model;
  }

  async readMatches(): Promise<Match[]> {
    const matches = await this.matchesModel.readMatches();
    return matches;
  }

  async createMatch(match: TNewMatch): Promise<Match> {
    if (match.awayTeam === match.homeTeam) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }
    const newMatch = await this.matchesModel.createMatch(match);
    return newMatch;
  }

  async updateProgressFalse(id: string): Promise<void> {
    const [updateResult] = await this.matchesModel.updateProgressFalse(id);
    if (!updateResult) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Match ID not found or match already finished');
    }
  }

  async updateMatch(id: string, body: TUpdateScore) {
    const [updateResult] = await this.matchesModel.updateMatch(id, body);
    if (!updateResult) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Match ID not found or same match content');
    }
  }
}

export default MatchesService;
