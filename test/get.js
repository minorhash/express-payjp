var url = 'http://localhost:3000';

var app = require('../app'),
  chai = require('chai'),
  request = require('supertest'),
  age = require('superagent'),
  expect = chai.expect;

var arr=[
"paypal/pay"
]

//var arr = [
  //'usr/adr',
  //'note/agmt',
  //'cart',
  //'note/guide',
  //'history',
  //'my',
  //'note/notation',
  //'usr/sig',
  //'paypal/pay'
//];

describe('GET', function() {
  //
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    it('===== get =====', function(done) {
      request(app)
        .get('/shop/' + arr[i])
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          done();
          //console.log(res.req)
        });
    });
  }
}); //describe
