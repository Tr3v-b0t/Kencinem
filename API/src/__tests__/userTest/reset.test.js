/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import userData from "./setup";
import { suite3 } from "./testSuites";

chai.use(chaiHttp);
chai.should();
describe("User reset password", () => {
    suite3("Reset password", () => {
        it("Should log in without input", (done) => {

        })
    })
})