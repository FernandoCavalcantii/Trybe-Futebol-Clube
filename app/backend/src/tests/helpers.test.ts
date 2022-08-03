import * as chai from 'chai';
import { describe, test } from "mocha";
// @ts-ignore
import * as chaiHttp from 'chai-http';
import decryptPass from '../helpers/decryptPass';
import noPassUserObj from '../helpers/noPassUserObj';

chai.use(chaiHttp);

const expect = chai.expect;

describe("Tests", () => {
  describe("If decryptPass", () => {
    test("1- Returns 'true', when passed the right password", async () => {
      const rightPassword = 'secret_admin';
      const dbPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

      const result = decryptPass(rightPassword, dbPassword);

      expect(result).to.be.true;
    });
  });

  describe("If errorSwitch", () => {
    test("1- Returns 'true', when passed the right password", async () => {
      const rightPassword = 'secret_admin';
      const dbPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

      const result = decryptPass(rightPassword, dbPassword);

      expect(result).to.be.true;
    });
  });

  describe("If noPassUserObj", () => {
    const user = {
      id: 1,
      username: 'test',
      role: 'test',
      email: 'test',
    };
    test("1- Returns an formatted user object", async () => {
      const id = 1;
      const string = 'test';
      const result = noPassUserObj(id, string, string, string);

      expect(result).to.be.eql(user);
    });
  });
});
