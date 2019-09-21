import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import userData from "./setup";

chai.use(chaiHttp);
chai.should();
function suite1(name, tests) {
    describe(name, function () {
        before(function (done) {
            chai.request(app)
            .post("/api/v1/auth/signup")
            .send(userData.unverified)
            .end((err, res) => {
               let token = res.body.data.token;
                done();
            });
        });
        tests();
    });
}

function suite2(name, tests) {
    describe(name, function () {
        before(function (done) {
            chai.request(app)
            .post("/api/v1/auth/signup")
            .send(userData.verified)
            .end((err, res) => {
                let token = res.body.data.token;
                chai.request(app)
                .get(`/api/v1/auth/verify?token=${token}`)
                .end((err, res) => {
                    
                    if (err) return done();
                    done();
                });
            });
        });
        tests();
    });
}

function suite3(name, tests) {
    describe(name, function () {
        before(function (done) {
            chai.request(app)
            .post("/api/v1/auth/signup")
            .send(userData.resetUser)
            .end((err, res) => {
                let token = res.body.data.token;
                chai.request(app)
                .get(`/api/v1/auth/verify?token=${token}`)
                .end((err, res) => {
                    
                    if (err) return done();
                    done();
                });
            });
        });
        tests();
    });
}

export { suite1, suite2, suite3 };