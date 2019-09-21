/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import userData from "./setup";
import { suite1, suite2 } from "./testSuites";

chai.use(chaiHttp);
chai.should();
describe("User log in", () => {
    suite1("login invalid", () => {
        it("Should log in without input", (done) => {
            chai.request(app)
                .post("/api/v1/auth/login")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
                });
        });
        it("Should log in with invalid input", (done) => {
            chai.request(app)
                .post("/api/v1/auth/login")
                .send(userData.login1)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
                });
        });
        it("Should log in with invalid email", (done) => {
            chai.request(app)
                .post("/api/v1/auth/login")
                .send(userData.login2)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
                });
        });
        it("Should log in with wrong password", (done) => {
            chai.request(app)
                .post("/api/v1/auth/login")
                .send(userData.login3)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
                });
        });
        it("Should log in to unverified account", (done) => {
            chai.request(app)
                .post("/api/v1/auth/login")
                .send(userData.login4)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(403);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
                });
        });
    })
    suite2("login verified account", () => {
        it("Should log in successful", (done) => {
            chai.request(app)
                .post("/api/v1/auth/login")
                .send(userData.login5)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    if (err) return done();
                    done();
        })
    })
})
})
