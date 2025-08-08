/* eslint-disable no-console */
require('env2')('.env');
const {join} = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {Server} = require('socket.io');
const http = require('http');
const router = require('./routes');
const {Auction, Product} = require('./models');
const {boomify} = require('./utils');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('user connection', socket.id);

  socket.on('joinRoom', (data) => {
    socket.join(data);
    console.log(`user with id : ${socket.id} join in room : ${data}`);
  });

  socket.on('sendPrice', async (data) => {
    try {
      console.log('New bid: =-=--=>>', data);
      const product = await Product.findByPk(data.room);
      product.auc_amount += product.auc_inc_amount;
      await product.save();

      await Auction.create({
        user_id: data.user_id,
        product_id: data.room,
        amount: product.auc_amount,
        date: data.date,
      });
      console.log('data.room=--=-', data.room);
      io.to(data.room).emit('receivePrice', {
        user_id: data.user_id,
        room: data.room,
        amount: product.auc_amount,
        date: data.date,
      });
    } catch (err) {
      throw boomify(500, 'Socket Error', 'Socket Error');
    }
  });

  socket.on('disconnect', () => {
    console.log('user Disconnected', socket.id);
  });
});

app.use(cors());
app.set('PORT', process.env.PORT || 8000);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api', router);

// Optional: Serve frontend if needed
// app.use(express.static(join(__dirname, "..", "..", "client", "build")));
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, "..", "..", "client", "build", "index.html"));
// });

module.exports = {app, server};
