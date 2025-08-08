/* eslint-disable no-undef */
const request = require('supertest');
const {app} = require('../src/app');
const {build} = require('../src/config/dbBuild');
const {sequelize} = require('../src/config/connection');

beforeEach(() => build());

describe('Sign in test with status code 201', () => {
  test('Sign in test with status code 201', (done) => {
    request(app)
      .post('/api/signIn')
      .send({email: 'mohammed@gmail.com', password: '123456789'})
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  test('Sign in test with validation', (done) => {
    request(app)
      .post('/api/signIn')
      .send({email: 'test2@gmail.com', password: '123'})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  test('Sign in test with wrong Password', (done) => {
    request(app)
      .post('/api/signIn')
      .send({email: 'mohammed@gmail.com', password: '123456789asd'})
      .expect(401)
      .expect('Content-Type', /json/)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});

afterAll(() => sequelize.close());
