import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, test } from "mocha";
// @ts-ignore
import * as chaiHttp from 'chai-http';
import UsersModel from '../../../repository/users.model';
import User from '../../../database/models/User';
import databaseMock from '../../database-mock/databaseMock';

chai.use(chaiHttp);

const expect = chai.expect;

const usersModel = new UsersModel();

describe("Tests", () => {
  describe("If usersModel", () => {
    const email = "admin@admin.com";

    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(databaseMock[0] as any);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
    test("1- Returns a user", async () => {
      const result = await usersModel.readUserByEmail(email);

      expect(result).to.be.eql(databaseMock[0]);
    });
  });
});
