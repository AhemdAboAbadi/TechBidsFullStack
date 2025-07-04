/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../src/app');
const { build } = require('../src/config/dbBuild');
const { sequelize } = require('../src/config/connection');

beforeEach(() => build());

describe('all categories tests', () => {
  test('success', (done) => {
    request(app)
      .get('/api/categories')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toStrictEqual({
          categoriesData: [
            {
              id: 1,
              name: 'Accessories',
            },
            {
              id: 2,
              name: 'DeskTop',
            },
            {
              id: 3,
              name: 'Mobile',
            },
            {
              id: 4,
              name: 'LapTop',
            },
          ],
        });
        return done();
      });
  });
});

afterAll(() => sequelize.close());
