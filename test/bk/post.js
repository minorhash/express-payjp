var url = 'http://localhost:3023';

var app = require('../app'),
  chai = require('chai'),
  request = require('supertest'),
  age = require('superagent'),
  expect = chai.expect;

var arr=[
    "item:id"
]

describe('=== POST TEST===', function() {
  //
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    it('post', function(done) {
      request(app)
.post('/shop/' + arr[i])
.expect(function(res){
res.body.title="items"
})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          done();
          //console.log(res.req)
        });
    });
  }
}); //describe
