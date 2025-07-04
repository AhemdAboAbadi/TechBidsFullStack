/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../src/app');
const { build } = require('../src/config/dbBuild');
const { sequelize } = require('../src/config/connection');

beforeEach(() => build());

describe('Add Product Controller', () => {
  test('add product with 200 status', (done) => {
    request(app)
      .post('/api/products')
      .set('Cookie', [`token=${process.env.TOKEN}`])
      .send({
        name: 'testfsd',
        category_id: 1,
        auc_amount: 123,
        auc_inc_amount: 12,
        end_date: '2021-12-12 12:12:12',
        image: 'dasdasdas',
        is_used: false,
        description: 'dasdasdas',
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
      .send({
        name: '',
        category_id: 1,
        auc_amount: '',
        auc_inc_amount: 12,
        end_date: '2021-12-12 12:12:12',
        image: '',
        is_used: false,
        description: 'dasdasdas',
      })
      .set('Cookie', [`token=${process.env.TOKEN}`])
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  test('unauthorized user', (done) => {
    request(app)
      .post('/api/products')
      .send({
        name: '',
        category_id: 1,
        auc_amount: '',
        auc_inc_amount: 12,
        end_date: '2021-12-12 12:12:12',
        image: '',
        is_used: false,
        description: 'dasdasdas',
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

afterAll(() => sequelize.close());
