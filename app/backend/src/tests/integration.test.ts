import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe } from 'mocha';

// @ts-ignore
import * as chaiHttp from 'chai-http';
import { app } from '../app';

import UsersModel from '../database/models/User';
import databaseMock from './database-mock/databaseMock';
import TeamsModel from '../database/models/Team';
import { matchesMock, newMatchMock, updateFailure, updateSuccess } from './database-mock/matchesMock';
import MatchesModel from '../database/models/Match';
import { awayLeaderboardMock, homeLeaderboardMock, leaderboardMock } from './database-mock/leaderboardsMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Tests', () => {
  const loginRequest = {
    email: 'admin@admin.com',
    password: 'secret_admin'
  };
  const noEmailLoginRequest = {
    password: 'secret_admin'
  };
  const wrongPassLoginRequest = {
    email: 'admin@admin.com',
    password: 'wrong'
  };
  const wrongEmailLoginRequest = {
    email: 'wrong',
    password: 'secret_admin'
  };


  describe('A sucessfull post request to /login', () => {
    before(async () => {
      sinon
        .stub(UsersModel, "findOne")
        .resolves(databaseMock[0] as any);

    });

    after(() => {
      (UsersModel.findOne as sinon.SinonStub).restore();
    });
    it('1- Responds, in success, with status 200 and a token', () => {
      return chai
        .request(app)
        .post('/login')
        .send(loginRequest)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(typeof res.body.token).to.be.eql('string');
        });
    });
  });

  describe('A unsuccessfull /login request', () => {
    before(async () => {
      sinon
        .stub(UsersModel, "findOne")
        .resolves(null as any);

    });

    after(() => {
      (UsersModel.findOne as sinon.SinonStub).restore();
    });
    it('1- Without username or password, responds with status 400 and a message: "All fields must be filled"', () => {
      return chai
        .request(app)
        .post('/login')
        .send(noEmailLoginRequest)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.be.eql('All fields must be filled');
        });
    });

    it('2- With an incorrect password, responds with status 401 and a message: "Incorrect email or password"', () => {
      return chai
        .request(app)
        .post('/login')
        .send(wrongPassLoginRequest)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.be.eql('Incorrect email or password');
        });
    });

    it('3- With an incorrect email, responds with status 401 and a message: "Incorrect email or password"', () => {
      return chai
        .request(app)
        .post('/login')
        .send(wrongEmailLoginRequest)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.be.eql('Incorrect email or password');
        });
    });
  });
  describe('A successfull get request to /login/validate', () => {


    it('1- Responds with status 200 and a object with a "role" property', () => {
      return chai
        .request(app)
        .post('/login')
        .send(loginRequest)
        .then((res) => res.body.token)
        .then((token) => chai
          .request(app)
          .get('/login/validate')
          .set('Authorization', token)
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.role).to.be.eql('admin');
          }));
    });
  });
  describe('A unsuccessfull get request to /login/validate', () => {
    it('1- Responds, when token is not passed, with status 403 and message "Token must be a valid token"', () => {
      return chai
        .request(app)
        .get('/login/validate')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.be.eql('Token must be a valid token');
        });
    });
    it('2- Responds, when token is expired or invalid, with status 403 and message "Token must be a valid token"', () => {
      return chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', '1234')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.be.eql('Token must be a valid token');
        });
    });
  });

  describe('If a get request to /teams', () => {
    before(async () => {
      sinon
        .stub(TeamsModel, "findAll")
        .resolves(databaseMock[3] as any);
    });

    after(() => {
      (TeamsModel.findAll as sinon.SinonStub).restore();
    });
    it('1- Responds, in success, with teams and status 200', () => {
      return chai
        .request(app)
        .get('/teams')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql(databaseMock[3]);
        });
    });
  });

  describe('If a get request to /teams/:id', () => {
    describe('In success', () => {
      before(async () => {
        sinon
          .stub(TeamsModel, "findByPk")
          .resolves(databaseMock[2] as any);
      });

      after(() => {
        (TeamsModel.findByPk as sinon.SinonStub).restore();
      });
      it('1- Responds with a team and status 200', () => {
        return chai
          .request(app)
          .get('/teams/1')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.eql(databaseMock[2]);
          });
      });
    });

    describe('In failure', () => {
      before(async () => {
        sinon
          .stub(TeamsModel, "findByPk")
          .resolves(null as any);
      });

      after(() => {
        (TeamsModel.findByPk as sinon.SinonStub).restore();
      });
      it('1- Responds with status 404 and message "Team ID not found"', () => {
        return chai
          .request(app)
          .get('/teams/1')
          .then((res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.be.eql('Team ID not found');
          });
      });
    });
  });

  describe('A successfull post request to /matches', () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(matchesMock as any);

    });

    after(() => {
      (MatchesModel.findAll as sinon.SinonStub).restore();
    });
    it('1- Responds with status 200 and with matches info', () => {
      return chai
        .request(app)
        .get('/matches')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql(matchesMock);
        });
    });
  });

  describe('If a post request to /matches', () => {
    const newMatchRequest = {
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
    };

    describe('In success', () => {
      before(async () => {
        sinon
          .stub(MatchesModel, "create")
          .resolves(newMatchMock as any);
      });

      after(() => {
        (MatchesModel.create as sinon.SinonStub).restore();
      });
      it('1- Responds with the new match and status 201', () => {
        return chai
          .request(app)
          .post('/login')
          .send(loginRequest)
          .then((res) => res.body.token)
          .then((token) => chai
            .request(app)
            .post('/matches')
            .set('Authorization', token)
            .send(newMatchRequest)
            .then((res) => {
              expect(res).to.have.status(201);
              expect(res.body).to.be.eql(newMatchMock);
            }));
      });
    });

    describe('In failure: when team ID doesn\'t exist', () => {
      before(async () => {
        sinon
          .stub(MatchesModel, "create")
          .throws(new Error('') as any);
      });

      after(() => {
        (MatchesModel.create as sinon.SinonStub).restore();
      });
      it('1- Responds with status 404 and message "There is no team with such id!"', () => {
        return chai
          .request(app)
          .post('/login')
          .send(loginRequest)
          .then((res) => res.body.token)
          .then((token) => chai
            .request(app)
            .post('/matches')
            .set('Authorization', token)
            .send(newMatchRequest)
            .then((res) => {
              expect(res).to.have.status(404);
              expect(res.body.message).to.be.eql('There is no team with such id!');
            }));
      });
    });

    describe('In failure: when homeTeam and awayTeam ID\'s are the same', () => {
      const sameIdMatchRequest = {
        homeTeam: 1,
        homeTeamGoals: 1,
        awayTeam: 1,
        awayTeamGoals: 1,
      };
      it('1- Responds with status 401 and message "It is not possible to create a match with two equal teams"', () => {
        return chai
          .request(app)
          .post('/login')
          .send(loginRequest)
          .then((res) => res.body.token)
          .then((token) => chai
            .request(app)
            .post('/matches')
            .set('Authorization', token)
            .send(sameIdMatchRequest)
            .then((res) => {
              expect(res).to.have.status(401);
              expect(res.body.message).to.be.eql('It is not possible to create a match with two equal teams');
            }));
      });
    });
  });

  describe('If a patch request to /matches/:id/finish', () => {
    describe('In success', () => {
      before(async () => {
        sinon
          .stub(MatchesModel, "update")
          .resolves(updateSuccess as any);
      });

      after(() => {
        (MatchesModel.update as sinon.SinonStub).restore();
      });
      it('1- Responds with a message "Finished" and status 200', () => {
        return chai
          .request(app)
          .patch('/matches/1/finish')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.be.eql('Finished');
          });
      });
    });

    describe('In failure', () => {
      before(async () => {
        sinon
          .stub(MatchesModel, "update")
          .resolves(updateFailure as any);
      });

      after(() => {
        (MatchesModel.update as sinon.SinonStub).restore();
      });
      it('1- Responds with a message "Match ID not found or match already finished" and status 404', () => {
        return chai
          .request(app)
          .patch('/matches/1/finish')
          .then((res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.be.eql('Match ID not found or match already finished');
          });
      });
    });
  });

  describe('If a patch request to /matches/:id', () => {
    describe('In success', () => {
      before(async () => {
        sinon
          .stub(MatchesModel, "update")
          .resolves(updateSuccess as any);
      });

      after(() => {
        (MatchesModel.update as sinon.SinonStub).restore();
      });
      it('1- Responds with a message "Match updated" and status 200', () => {
        return chai
          .request(app)
          .patch('/matches/1')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.be.eql('Match updated');
          });
      });
    });

    describe('In failure', () => {
      before(async () => {
        sinon
          .stub(MatchesModel, "update")
          .resolves(updateFailure as any);
      });

      after(() => {
        (MatchesModel.update as sinon.SinonStub).restore();
      });
      it('1- Responds with a message "Match ID not found or match already finished" and status 404', () => {
        return chai
          .request(app)
          .patch('/matches/1')
          .then((res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.be.eql('Match ID not found or same match content');
          });
      });
    });
  });

  describe('A sucessfull get request to /leaderboard/home', () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(matchesMock as any);

      sinon
        .stub(TeamsModel, "findAll")
        .resolves(databaseMock[3] as any);
    });

    after(() => {
      (MatchesModel.findAll as sinon.SinonStub).restore();
      (TeamsModel.findAll as sinon.SinonStub).restore();
    });

    it('1- Responds, in success, with status 200 and and home leaderboard', () => {
      return chai
        .request(app)
        .get('/leaderboard/home')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql(homeLeaderboardMock);
        });
    });
  });

  describe('A sucessfull get request to /leaderboard/away', () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(matchesMock as any);

      sinon
        .stub(TeamsModel, "findAll")
        .resolves(databaseMock[3] as any);
    });

    after(() => {
      (MatchesModel.findAll as sinon.SinonStub).restore();
      (TeamsModel.findAll as sinon.SinonStub).restore();
    });

    it('1- Responds, in success, with status 200 and and away leaderboard', () => {
      return chai
        .request(app)
        .get('/leaderboard/away')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql(awayLeaderboardMock);
        });
    });
  });

  describe('A sucessfull get request to /leaderboard', () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(matchesMock as any);

      sinon
        .stub(TeamsModel, "findAll")
        .resolves(databaseMock[3] as any);
    });

    after(() => {
      (MatchesModel.findAll as sinon.SinonStub).restore();
      (TeamsModel.findAll as sinon.SinonStub).restore();
    });

    it('1- Responds, in success, with status 200 and and leaderboard', () => {
      return chai
        .request(app)
        .get('/leaderboard')
        .then((res) => {
          console.log(res);
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql(leaderboardMock);
        });
    });
  });
});

