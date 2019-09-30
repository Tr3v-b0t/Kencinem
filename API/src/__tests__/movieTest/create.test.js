/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
// import userData from './setup';

chai.use(chaiHttp);
chai.should();

describe('create movie with error', () => {
	describe('sign up users', () => {
		it('Should sign up without input', (done) => {
			chai.request(app)
				.post('/api/v1/movie')
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					if (err) return done();
					done();
				});
		});
	});
});
