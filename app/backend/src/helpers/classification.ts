import { TNewMatch, TStringMatch, TTeamInfo } from '../protocols/types';
import MatchesModel from '../repository/matches.model';
import TeamsModel from '../repository/teams.model';

const teamsModel = new TeamsModel();
const matchesModel = new MatchesModel();

const rawTeamsInfo = async () => {
  const teams = await teamsModel.readTeams();
  const raw = teams.map(({ id, teamName: name }) => ({
    id,
    name,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  }));

  return raw;
};

const rawMatches = async () => {
  const matches = await matchesModel.readMatches();
  const raw = matches.map(({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress }) => ({
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress,
  }));

  return raw;
};

let classificationChart: TTeamInfo[] = [];

const insertHomeTeamStatus = (id: number, match: TNewMatch) => {
  const team = classificationChart[id];
  if (Number(match.homeTeamGoals > Number(match.awayTeamGoals))) {
    team.totalPoints += 3;
  } else {
    team.totalPoints += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
  }
  team.totalGames += 1;
  team.totalVictories += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
  team.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
  team.totalLosses += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
  team.goalsFavor += match.homeTeamGoals;
  team.goalsOwn += match.awayTeamGoals;
  team.goalsBalance = team.goalsFavor - team.goalsOwn;
  team.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
};

const insertAwayTeamStatus = (id: number, match: TNewMatch) => {
  const team = classificationChart[id];
  if (Number(match.awayTeamGoals > Number(match.homeTeamGoals))) {
    team.totalPoints += 3;
  } else {
    team.totalPoints += match.awayTeamGoals === match.homeTeamGoals ? 1 : 0;
  }
  team.totalGames += 1;
  team.totalVictories += match.awayTeamGoals > match.homeTeamGoals ? 1 : 0;
  team.totalDraws += match.awayTeamGoals === match.homeTeamGoals ? 1 : 0;
  team.totalLosses += match.awayTeamGoals < match.homeTeamGoals ? 1 : 0;
  team.goalsFavor += match.awayTeamGoals;
  team.goalsOwn += match.homeTeamGoals;
  team.goalsBalance = team.goalsFavor - team.goalsOwn;
  team.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
};

const convertMatchValuesToNumber = (match: TStringMatch) => ({
  homeTeam: Number(match.homeTeam),
  homeTeamGoals: Number(match.homeTeamGoals),
  awayTeam: Number(match.awayTeam),
  awayTeamGoals: Number(match.awayTeamGoals),
});

const sortedClassification = (chart: TTeamInfo[]) => chart.sort((teamA, teamB) => {
  if (teamA.totalPoints > teamB.totalPoints) return -1;
  if (teamA.totalPoints < teamB.totalPoints) return 1;

  if (teamA.totalVictories > teamB.totalVictories) return -1;
  if (teamA.totalVictories < teamB.totalVictories) return 1;

  if (teamA.goalsBalance > teamB.goalsBalance) return -1;
  if (teamA.goalsBalance < teamB.goalsBalance) return 1;

  if (teamA.goalsFavor > teamB.goalsFavor) return -1;
  if (teamA.goalsFavor < teamB.goalsFavor) return 1;

  if (teamA.goalsOwn < teamB.goalsOwn) return -1;
  if (teamA.goalsOwn > teamB.goalsOwn) return 1;

  return 0;
});

const classification = async (home: boolean, away: boolean) => {
  const teams = await rawTeamsInfo();
  const matches = await rawMatches();
  classificationChart = teams;
  matches.forEach((match) => {
    if (!match.inProgress) {
      const homeTeamIndex = classificationChart.indexOf(
        classificationChart.find((team) => team.id === Number(match.homeTeam)) as TTeamInfo,
      );
      const awayTeamIndex = classificationChart.indexOf(
        classificationChart.find((team) => team.id === Number(match.awayTeam)) as TTeamInfo,
      );

      if (home) insertHomeTeamStatus(homeTeamIndex, convertMatchValuesToNumber(match));
      if (away) insertAwayTeamStatus(awayTeamIndex, convertMatchValuesToNumber(match));
    }
  });

  return sortedClassification(classificationChart);
};

export default classification;
