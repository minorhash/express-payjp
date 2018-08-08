var url = 'http://localhost:3023';

var app = require('../app'),
  chai = require('chai'),
  request = require('supertest'),
  age = require('superagent'),
  expect = chai.expect;

//var arr=[
//"paypal/cancel"
//]

var arr = [
  'usr/adr',
  'note/agmt',
  'cart',
  'note/guide',
  'history',
  'my',
  'note/notation',
  'usr/sig',
<<<<<<< HEAD
  'paypal/pay'
=======
>>>>>>> 6a98d2122084016e1c899e6bdddc186701dda640
];

describe('GET', function() {
  //
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    it('get', function(done) {
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
