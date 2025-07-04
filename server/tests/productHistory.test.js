/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../src/app');
const { build } = require('../src/config/dbBuild');
const { sequelize } = require('../src/config/connection');

beforeEach(() => build());

describe('product details tests', () => {
  test('get product returns a status code of 200', (done) => {
    request(app)
      .get('/api/product/1/history')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const expected = {
          data: [
            {
              id: 1,
              user_id: 1,
              product_id: 1,
              date: '2022-11-29T14:34:03.800Z',
              amount: 400,
            },
          ],
        };
        const actual = res.body;
        expect(actual).toMatchObject(expected);
        return done();
      });
  });
});
afterAll(() => sequelize.close());
