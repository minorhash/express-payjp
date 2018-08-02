var url = 'http://localhost:3023';

var app = require('../app'),
  chai = require('chai'),
  request = require('supertest'),
  age = require('superagent'),
  expect = chai.expect;

describe('GET', function() {
  it('get shop', function(done) {
    request(app)
      .get('/shop')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
        //console.log(res.req)
      });
  });
  // agmt
  it('get agmt', function(done) {
    request(app)
      .get('/shop/note/agmt')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
        //console.log(res.req)
      });
  });
  // agmt
  it('get notation', function(done) {
    request(app)
      .get('/shop/note/notation')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
        //console.log(res.req)
      });
  });
  it('get guide', function(done) {
    request(app)
      .get('/shop/note/guide')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
        //console.log(res.req)
      });
  });

  // 
  it('get adr', function(done) {
    request(app)
      .get('/shop/usr/adr')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
        //console.log(res.req._header)
      });
  });
  //
  it('get pal', function(done) {
    request(app)
      .get('/shop/paypal')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
        //console.log(res.req._header)
      });
  });

  it('get can', function(done) {
    request(app)
      .get('/shop/paypal/cancel')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
        //console.log(res.req._header)
      });
  });

  it('get cart', function(done) {
    request(app)
      .get('/shop/cart')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
        //console.log(res.req._header)
      });
  });

  it('get history', function(done) {
    request(app)
      .get('/shop/history')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('get my', function(done) {
    request(app)
      .get('/shop/my')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });


}); //describe
