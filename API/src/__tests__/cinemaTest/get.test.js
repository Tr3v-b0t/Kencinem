/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);
chai.should();
describe('Get cinemas successful cinemas', () => {
    describe('Get cinemas successful cinemas', () => {
        it('Should get all cinemas', (done) => {
            chai.request(app)
            .get('/api/v1/cinema')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                if (err) return done();
                done();
            });
        });
        it('Should get successful specific  cinema', (done) => {
        chai.request(app)
            .get('/api/v1/cinema/1')
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            if (err) return done();
            done();
            });
    });
    });
    describe('Get cinemas unsuccessful cinemas', () => {
        it('Should get all cinemas', (done) => {
            chai.request(app)
            .get('/api/v1/cinema')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                if (err) return done();
                done();
            });
        });
        it('Should get unsuccessful specific cinema', (done) => {
        chai.request(app)
            .get('/api/v1/cinema/1')
            .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            if (err) return done();
            done();
            });
    });
    });
});
