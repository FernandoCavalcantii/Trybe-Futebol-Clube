const homeLeaderboardMock = [{
  name: 'Internacional',
  totalPoints: 3,
  totalGames: 1,
  totalVictories: 1,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 3,
  goalsOwn: 1,
  goalsBalance: 2,
  efficiency: 100,
},
{
  name: "São Paulo",
  totalPoints: 3,
  totalGames: 1,
  totalVictories: 1,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 2,
  goalsOwn: 0,
  goalsBalance: 2,
  efficiency: 100,
},
{
  name: "Grêmio",
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
},
{
  name: "Santos",
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
}];

const awayLeaderboardMock = [
  {
    name: 'São Paulo',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0
  },
  {
    name: 'Internacional',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0
  },
  {
    name: 'Santos',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 3,
    goalsBalance: -2,
    efficiency: 0
  },
  {
    name: 'Grêmio',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 2,
    goalsBalance: -2,
    efficiency: 0
  }
];

const leaderboardMock = [
  {
    name: 'Internacional',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 1,
    goalsBalance: 2,
    efficiency: 100
  },
  {
    name: 'São Paulo',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 0,
    goalsBalance: 2,
    efficiency: 100
  },
  {
    name: 'Santos',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 3,
    goalsBalance: -2,
    efficiency: 0
  },
  {
    name: 'Grêmio',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 2,
    goalsBalance: -2,
    efficiency: 0
  }
];

export { homeLeaderboardMock, awayLeaderboardMock, leaderboardMock };