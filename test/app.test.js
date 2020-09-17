const app = require('../app');
const store = require('../playstore-data');
const supertest= require('supertest');
const expect = require('chai').expect;


describe('GET /apps', () => {
  //console.log(store);
  it('should provide the play-store data on apps', ()=> {
    return supertest(app)
      .get('/apps')
      .expect(200, store);
  });

  it('should return an error for a 400 status if mistyped', ()=>{
    return supertest(app)
      .get('/aps')
      .expect(404);

  }
  );

  it('should return items based on genre', ()=>{
    // console.log(store[0]);
    return supertest(app)
      .get('/apps')
      .query('search=strategy')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res =>{
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.include({"Genres": "Strategy"});
      });
  }
  );

  it('should sort items by rating', ()=>{
    return supertest(app)
      .get('/apps')
      .query('sort=Rating')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res =>{
        expect(res.body).to.be.an('array');
        let sorted =true;
        let i =0;

        while (i < res.body.length -1){
          const lowRating = res.body[i];
          const highRating = res.body[i+1];
          console.log(lowRating.Rating);
          console.log(highRating.Rating);

          if(highRating.Rating < lowRating.Rating){
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
        // expect(res.body[4]=(res.body[1]));

      });
  });

  it('should sort items by name', ()=>{
    return supertest(app)
      .get('/apps')
      .query('sort=App')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res =>{
        expect(res.body).to.be.an('array');
        let sorted =true;
        let i= 0;

        while(i< res.body.length-1){
          const alpha =res.body[i];
          const beta =res.body[i+1];
          console.log(alpha.App);
          console.log(beta.App);
          if(alpha.App > beta.App){
            sorted =false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});