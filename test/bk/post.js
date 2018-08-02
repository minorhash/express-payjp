var url = 'http://localhost:3023';

var app = require('../app'),
  chai = require('chai'),
  request = require('supertest'),
  age = require('superagent'),
  expect = chai.expect;

describe('POST', function() {
  it('post', function(done) {
    request(app)
      .post('/shop')
      .type('form')
      .send({
        method: 'post',
        email: 'successful.payment@paidy.com',
        pss: '2112',
      })
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
