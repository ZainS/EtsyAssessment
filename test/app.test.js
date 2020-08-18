const chai = require('chai');
const assert = require('chai').assert
const chaiHttp = require('chai-http');

let server = require('../app.js');
chai.use(chaiHttp);

describe('Test api endpoint accesibility ', () => {
  
  it('test the status code', (done) => {
    chai.request(server)
      .post('/api')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({shopIDs:"[3,3,4]"})
      .end((err, res) => {
        assert( res.status == 200, "actual status is '"+ res.status+"'")
        done();
      });
  });
  it('test the output"', (done) => {
    chai.request(server)
      .post('/api')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({shopIDs:"[3,3,4,17048745]"})
      .end((err, res) => {
          assert( res.text.length>10 , "actual text is '"+ res.text+"'")
          done();
      
      });
  });
});