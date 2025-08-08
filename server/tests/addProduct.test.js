/* eslint-disable no-undef */
const request = require('supertest');
const {app} = require('../src/app');
const {build} = require('../src/config/dbBuild');
const {sequelize} = require('../src/config/connection');

beforeEach(() => build());

describe('Add Product Controller', () => {
  test('add product with 200 status', (done) => {
    request(app)
      .post('/api/products')
      .set('Cookie', [`token=${process.env.TOKEN}`])
      .send({
        name: 'Test Product',
        image: 'https://example.com/image.jpg',
        description: 'dasdasdas',
        category_id: 1,
        auc_amount: 100,
        auc_inc_amount: 10,
        end_date: '2025-12-31T23:59:59.000Z',
        is_used: false,
      })
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  test('validation error', (done) => {
    request(app)
      .post('/api/products')
      .set('Cookie', [`token=${process.env.TOKEN}`])
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

afterAll(() => sequelize.close());
