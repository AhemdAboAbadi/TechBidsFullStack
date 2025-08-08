/* eslint-disable no-undef */
const request = require('supertest');
const {app} = require('../src/app');
const {build} = require('../src/config/dbBuild');
const {sequelize} = require('../src/config/connection');

beforeEach(() => build());

describe('filter products tests', () => {
  test('success', (done) => {
    request(app)
      .get('/api/products?status=ended&search=lap')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toStrictEqual({
          count: 1,
          productData: [
            {
              id: 6,
              name: 'Alienware m15 R6-198 LAPTOP',
              image: 'https://media.ldlc.com/r1600/ld/products/00/05/86/91/LD0005869128_1.jpg',
              description:
                'Intel Core i7-11800H 16 GB SSD 1 TB 15.6, Full HD 360 Hz NVIDIA GeForce RTX 3080 8 GB Wi-Fi AX/Bluetooth Webcam Windows 10 Home 64 bit',
              end_date: '2020-11-29T14:34:03.800Z',
              auc_amount: 520,
              is_open: false,
            },
          ],
        });
        return done();
      });
  });
});

afterAll(() => sequelize.close());
