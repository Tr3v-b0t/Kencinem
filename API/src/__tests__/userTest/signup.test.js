/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import userData from "./setup";

chai.use(chaiHttp);
chai.should();
describe("User sign up", () => {
    describe("sign up users", () => {
        it("Should sign up without input", (done) => {
            chai.request(app)
                .post("/api/v1/auth/signup")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
                });
        });
        it("Should sign up with invalid input", (done) => {
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(userData.invalidDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
                });
        });

        it("Should sign up user successfully", (done) => {
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(userData.signup)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
                });
        });

        it("Should test doubleuser sign up", (done) => {
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(userData.signup)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
                });
        });
   });
});
