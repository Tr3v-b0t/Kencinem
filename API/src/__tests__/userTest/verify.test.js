/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import userData from "./setup";

chai.use(chaiHttp);
let token;

describe("verify user", () => {
    before((done) => {
        chai.request(app)
            .post("/api/v1/auth/signup")
            .send(userData.verify)
            .end((err, res) => {
                token = res.body.data.token;
                done();
            });
    });

    it("verify user successfully", (done) => {
        chai.request(app)
            .get(`/api/v1/auth/verify?token=${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                if (err) return done();
                done();
            });
    });

    it("Should not verify twice", (done) => {
        chai.request(app)
            .get(`/api/v1/auth/verify?token=${token}`)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.a("object");
                if (err) return done();
                done();
            });
    });

    it("Should verify with invalid token", (done) => {
        chai.request(app)
            .get(`/api/v1/auth/verify?token=123248488`)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a("object");
                if (err) return done();
                done();
            });
    });

});
