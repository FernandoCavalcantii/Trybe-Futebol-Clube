import { NextFunction, Request, Response } from 'express';
import Match from '../database/models/Match';
import { TNewMatch, TTeam, TTeamInfo, TUpdateScore, TUser } from './types';

export interface IUsersModel {
  readUserByEmail(email: string): Promise<TUser | null>;
}

export interface ITeamsModel {
  readTeams(): Promise<TTeam[]>;
  readTeamById(id: string): Promise<TTeam | null>;
}

export interface ITeamsService {
  readTeams(): Promise<TTeam[]>;
  readTeamById(id: string): Promise<TTeam>;
}

export interface ITeamsController {
  readTeams(req: Request, res: Response, next: NextFunction): Promise<void>;
  readTeamById(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IMatchesModel {
  readMatches(): Promise<Match[]>;
  createMatch(match: TNewMatch): Promise<Match>;
  updateProgressFalse(id: string): Promise<[number, Match[]]>;
  updateMatch(id: string, body: TUpdateScore): Promise<[number, Match[]]>;
}

export interface IMatchesService {
  readMatches(): Promise<Match[]>;
  createMatch(match: TNewMatch): Promise<Match>;
  updateProgressFalse(id: string): Promise<void>;
  updateMatch(id: string, body: TUpdateScore): Promise<void>;
}

export interface IMatchWithNames extends Match {
  teamHome: {
    teamName: string;
  },
  teamAway: {
    teamName: string;
  };
}

export interface ILeaderboardsService {
  readHomeLeaderboards(): Promise<Omit<TTeamInfo, 'id'>[]>;
  readAwayLeaderboards(): Promise<Omit<TTeamInfo, 'id'>[]>;
  readLeaderboards(): Promise<Omit<TTeamInfo, 'id'>[]>;
}
