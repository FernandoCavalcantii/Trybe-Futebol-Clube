export type Token = {
  token: string,
};

export type LoginInfo = {
  username: string,
  password: string,
};

export type TUser = {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
};

export type TTeam = {
  id: number,
  teamName: string,
};

export type TNewMatch = {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number;
};

export type TStringMatch = {
  homeTeam: string,
  awayTeam: string,
  homeTeamGoals: string,
  awayTeamGoals: string;
};

export type TUpdateScore = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export type TTeamInfo = {
  id: number,
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number;
};
