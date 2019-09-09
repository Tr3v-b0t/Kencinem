/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);
chai.should();
describe('Get movies successful Movies', () => {
    describe('Get movies successful Movies', () => {
        it('Should get all movies', (done) => {
            chai.request(app)
            .get('/api/v1/movie')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                if (err) return done();
                done();
            });
        });
        it('Should get successful specific  movie', (done) => {
        chai.request(app)
            .get('/api/v1/movie/1')
            .end((err, res) => {
                console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            if (err) return done();
            done();
            });
    });
    });
    describe('Get movies unsuccessful Movies', () => {
        it('Should get all movies', (done) => {
            chai.request(app)
            .get('/api/v1/movie')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                if (err) return done();
                done();
            });
        });
        it('Should get unsuccessful specific movie', (done) => {
        chai.request(app)
            .get('/api/v1/movie/1')
            .end((err, res) => {
                console.log(res.body);
            res.should.have.status(404);
            res.body.should.be.a('object');
            if (err) return done();
            done();
            });
    });
    });
});
