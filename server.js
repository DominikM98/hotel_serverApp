
const { MongoClient } = require('mongodb'); //mongo db
const Hapi = require('@hapi/hapi');
const Qs = require('qs');


const uri = "mongodb+srv://DominikM98:ZIOMekpl50@hotelmanagement.7bg2w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

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

    return createListing(client, {
      product_name: request.payload.product_name,
      ingredients: request.payload.ingredients,
      product_weight: request.payload.product_weight,
      product_price: request.payload.product_price,
      type_of_product: request.payload.type_of_product
    });
  }
});

const init = async () => {

  await client.connect();
  await server.start();
  console.log('Server running on %s', server.info.uri);
};


async function findOneListing(client, nameOfListing) {
  const result = await client.db("hotel_management").collection("reservation").findOne({last_name: nameOfListing});

  if (result){
    console.log(result);
    return result
  }
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

init();