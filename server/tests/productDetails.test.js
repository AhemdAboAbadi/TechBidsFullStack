/* eslint-disable no-undef */
const request = require('supertest');
const {app} = require('../src/app');
const {build} = require('../src/config/dbBuild');
const {sequelize} = require('../src/config/connection');

beforeEach(() => build());

describe('product details tests', () => {
  test('get product returns a status code of 200', (done) => {
    request(app)
      .get('/api/product/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);

        const expected = {
          data: {
            id: 1,
            user_id: 1,
            winner_id: 1,
            category_id: 4,
            auc_amount: 400,
            auc_inc_amount: 50,
            end_date: '2022-11-29T14:34:03.800Z',
            name: 'LabTop',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsFAAF5nU8p12eycPHmPbcRKtb0_mZIOUwKA&usqp=CAU',
            description:
              'Microsoft Surface Laptop 4 13.5" Touch-Screen – AMD Ryzen 5 Surface Edition - 8GB Memory - 256GB Solid State Drive (Latest Model) - Platinum',
            is_open: true,
            is_used: false,
          },
        };

        const actual = res.body;
        expect(actual).toMatchObject(expected);
        return done();
      });
  });
});

afterAll(() => sequelize.close());
