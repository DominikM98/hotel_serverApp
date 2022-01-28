//MAIN ROUTER

//load route user
const clientRouters = require('./client');
const roomRouters = require('./rooms');
const addressRouters = require('./addresses');
const employeeRouters = require('./employees');
const reservationRouters = require('./reservation');
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
  reservationRouters();
  transactionRouters(app,fs);
};

module.exports = appRouter;
