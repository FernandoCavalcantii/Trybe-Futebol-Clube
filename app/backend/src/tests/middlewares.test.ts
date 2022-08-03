import * as chai from 'chai';
import { describe, test } from "mocha";
import generateToken from '../middlewares/generateToken';
// @ts-ignore
import * as chaiHttp from 'chai-http';
// import ErrorMiddleware from '../helpers/ErrorMiddleware';

chai.use(chaiHttp);

const expect = chai.expect;

describe("Tests", () => {
  describe("If generateToken", () => {
    test("1- Returns a token", async () => {
      const noPassUser = {
        id: 1,
        username: 'Test',
        role: 'admin',
        email: 'admin@test.com',
      };

      const result = await generateToken(noPassUser);

      expect(typeof result).to.be.eql('string');
    });
  });
  // describe("If ErrorMiddleware", () => {
  //   test("1- Responds with code 401 and message 'Incorrect email or password'", async () => {


  //     const result = await generateToken(noPassUser);

  //     expect(typeof result).to.be.eql('string');
  //   });
  // });
});
