import Hapi from '@hapi/hapi';
import Qs from 'qs';
import mongoose from 'mongoose';
//import {Restaurant} from './schemas/restaurant.js';

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
  query: {
    parser: (query) => Qs.parse(query)
  },
  routes:{
    cors:{
      origin: ['*']
    }
  }
});

const uri = "mongodb://localhost:27017/aaa";
const init = async () => {
 /* mongoose.connect(uri)
      .then(r => console.log(r, 'Connect successfully'))
      .catch((err) => console.log(err));*/

 mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

 var db = mongoose.connection;

 db.on('error', console.log.bind(console, 'error'));
 db.once('open', function() { console.log("Connect success")})

  await server.start();
};

init();


//RESTAURANT
//show all item menu
server.route({
  method: 'GET',
  path: '/restauration/showItems',
  handler: async (request, h) => {

    const test = 'test';
      const itemMenu =  Restaurant.findOne({type_of_product: 'Soup'});
      return itemMenu;


  }
});


/*
//RESERVATIONS
//show one of reservations
server.route({
  method: 'GET',
  path: '/reservation/showReservation',
  handler: function (request, h) {

    collection = client.db("hotel_management").collection("reservation");
    return collection.findOne({last_name: "Krzyżanowski"})
  }
});

//show all reservations
server.route({
  method: 'GET',
  path: '/reservation/showReservations',
  handler: function (request, h) {

    collection = client.db("hotel_management").collection("reservation");
    return collection.find({}).toArray()
  }
});

// create new reservation
server.route({
  method: 'POST',
  path: '/reservation/createReservation',
  handler: function (request, h) {

    return createListing(client, {
      first_name: request.payload.first_name,
      last_name: request.payload.last_name,
      check_in: request.payload.check_in,
      check_out: request.payload.check_out,
      breakfast: request.payload.breakfast,
      parking: request.payload.parking,
      car_registration: request.payload.car_registration,
      room_number: request.payload.room_number,
      booking_price: request.payload.booking_price
    });
  }
});

//delete reservation
server.route({
  method: 'DELETE',
  path: '/reservation/deleteReservation',
  handler: function(request, h){

  }
});


//RESTAURANT
//show all item menu
server.route({
  method: 'GET',
  path: '/restauration/showItems',
  handler: function (request, h) {

    collection = client.db("hotel_management").collection("itemMenu");
    console.log(collection)
    return collection.find({}).toArray()
  }
});

//add new item menu
server.route({
  method: 'POST',
  path: '/restauration/createItemMenu',
  handler: function (request, h) {

    collection = client.db("hotel_management").collection("itemMenu");
    return collection.insertOne({
      product_name: request.payload.product_name,
      ingredients: request.payload.ingredients,
      product_weight: request.payload.product_weight,
      product_price: request.payload.product_price,
      type_of_product: request.payload.type_of_product
    });

  }
});

//delete item from menu
server.route({
  method: 'DELETE',
  path: '/restauration/deleteItemMenu/{_id}',
  handler: function(request, h){

    const id = request.payload._id;
    collection = client.db("hotel_management").collection("itemMenu");
    return collection.deleteOne({_id: id})

  }
});



async function deleteListingByName(client, nameOfListing) {
  const result = await client.db("hotel_management").collection("itemMenu")
      .deleteOne({ _id: nameOfListing });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}


async function createListing(client, newListing){
  const result = await client.db("hotel_management").collection("reservation").insertOne(newListing);

  console.log(result);
  return result
}


process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});


const init = async () => {

  await client.connect();
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
*/
