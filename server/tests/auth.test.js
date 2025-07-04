/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../src/app');
const { build } = require('../src/config/dbBuild');
const { sequelize } = require('../src/config/connection');

beforeEach(() => build());

describe('auth tests', () => {
  test('with token', (done) => {
    request(app)
      .get('/api/auth/user')
      .set('Cookie', [`token=${process.env.TOKEN}`])
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).toBe(3);
        expect(res.body.name).toBe('test3');
        return done();
      });
  });
  test('without token', (done) => {
    request(app)
      .get('/api/auth/user')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe('You need to login or sign up');
        return done();
      });
  });
});

afterAll(() => sequelize.close());
