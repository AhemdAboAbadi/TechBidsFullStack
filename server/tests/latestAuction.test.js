/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../src/app');
const { build } = require('../src/config/dbBuild');
const { sequelize } = require('../src/config/connection');

beforeEach(() => build());

describe('latest Auction routes', () => {
  test('success', (done) => {
    request(app)
      .get('/api/latest/auction')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          last3Auction: [
            {
              id: 7,
              user_id: 3,
              winner_id: 2,
              category_id: 1,
              auc_amount: 520,
              auc_inc_amount: 10,
              end_date: '2020-11-29T14:34:03.800Z',
              name: 'AirPods 3',
              image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73_AV2?wid=2000&hei=2000&fmt=jpeg&qlt=80&.v=1632861338000',
              description: 'Personalise them for free, Engrave a mix of emoji, text and numbers to make AirPods unmistakably yours. Only at Apple.',
              is_open: false,
              is_used: true,
            },
            {
              id: 6,
              user_id: 3,
              winner_id: 2,
              category_id: 4,
              auc_amount: 520,
              auc_inc_amount: 10,
              end_date: '2020-11-29T14:34:03.800Z',
              name: 'Alienware m15 R6-198 LAPTOP',
              image: 'https://media.ldlc.com/r1600/ld/products/00/05/86/91/LD0005869128_1.jpg',
              description: 'Intel Core i7-11800H 16 GB SSD 1 TB 15.6, Full HD 360 Hz NVIDIA GeForce RTX 3080 8 GB Wi-Fi AX/Bluetooth Webcam Windows 10 Home 64 bit',
              is_open: false,
              is_used: true,
            },
            {
              id: 5,
              user_id: 3,
              winner_id: 2,
              category_id: 3,
              auc_amount: 520,
              auc_inc_amount: 10,
              end_date: '2021-11-29T14:34:03.800Z',
              name: 'GOOGLE PIXEL 6',
              image: 'https://i.expansys.net/img/b/368026/google-pixel-6-5g-dual-sim.jpg',
              description: 'Google Pixel 6 5G Dual SIM Network Compatibility | 8GB RAM, 128GB Storage | 50 MP, (wide), PDAF, OIS, 12 MP, (ultrawide) | Li-Ion 4614 mAh, non-removable BATTERY',
              is_open: false,
              is_used: true,
            },
          ],
        });
        return done();
      });
  });
});

afterAll(() => sequelize.close());
