/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);
chai.should();
describe('Extra Routes', () => {
  it('Should confirm Home Route is working', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('Welcome to Kenya cinema API');
        if (err) return done();
        done();
      });
  });
});
