//MAIN ROUTER

//load route user
const clientRouters = require('./clients');
const roomRouters = require('./rooms');
const addressRouters = require('./addresses');
const employeeRouters = require('./employees');
const reservationRouters = require('./reservations');
const transactionRouters = require('./transactions');


const appRouter = (app,fs) => {


  //empty routes
  app.get('/', (req,res) => {
    res.send('Hotel Management Node.js + express');
  });

  //run route module
  clientRouters(app,fs);
  roomRouters(app,fs);
  addressRouters(app,fs);
  employeeRouters(app,fs);
  reservationRouters(app,fs);
  transactionRouters(app,fs);
};

module.exports = appRouter;
