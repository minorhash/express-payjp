var url = 'http://localhost:3023';

var app = require('../../../app'),
  chai = require('chai'),
  request = require('supertest'),
  age = require('superagent'),
  expect = chai.expect;

let arr = [
  'history',"cart","my"
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
