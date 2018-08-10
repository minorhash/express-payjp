var chai = require('chai'),
  chaiHttp = require('chai-http');

var server = require('../../../app');
var url = 'http://localhost:3023';
var should = chai.should();
var expect = chai.expect();
chai.use(chaiHttp);

describe('shop', function() {
  it('GET shop', function(done) {
    chai
      .request(url)
      .get('/shop')
      .end(function(err, res) {
        res.should.have.status(200);
        //console.log(res.text)
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET cart', function(done) {
    chai
      .request(url)
      .get('/shop/cart')
      .end(function(err, res) {
        res.should.have.status(200);
        //console.log(res)
        done();
      });
  });

  it('POST cart', function(done) {
    chai
      .request(url)
      .post('/shop/cart')
      .end(function(err, res) {
        res.should.have.status(200);
        //console.log(res)
        done();
      });
  });

  it('GET sig', function(done) {
    chai
      .request(url)
      .get('/shop/sig')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('GET adr', function(done) {
    chai
      .request(url)
      .get('/shop/adr')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('GET my', function(done) {
    chai
      .request(url)
      .get('/shop/my')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('post item', function(done) {
    chai
      .request(url)
      .post('/shop/item:id')
      .type('form')
      .send({
        _method: 'post',
        sku: '3411',
      })
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('GET pay', function(done) {
    chai
      .request(url)
      .get('/shop/sig')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});
