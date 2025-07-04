/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../src/app');
const { build } = require('../src/config/dbBuild');
const { sequelize } = require('../src/config/connection');

beforeEach(() => build());

describe('top categories tests', () => {
  test('success', (done) => {
    request(app)
      .get('/api/categories/top')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toStrictEqual({
          categoriesData: [
            {
              id: 1,
              name: 'Accessories',
              image: 'https://i.ibb.co/B4D1MjZ/headphone-Background.jpg',
              productCount: '2',
            },
            {
              id: 2,
              name: 'DeskTop',
              image: 'https://www.linkpicture.com/q/desktop.png',
              productCount: '1',
            },
            {
              id: 3,
              name: 'Mobile',
              image: 'https://www.linkpicture.com/q/mobile_3.png',
              productCount: '2',
            },
            {
              id: 4,
              name: 'LapTop',
              image: 'https://i.ibb.co/nB3gpsz/labtop-Background.jpg',
              productCount: '2',
            },
          ],
        });
        return done();
      });
  });
});

afterAll(() => sequelize.close());
