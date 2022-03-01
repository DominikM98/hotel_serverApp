import Hapi from '@hapi/hapi';
import Qs from 'qs';
import mongoose from 'mongoose';

import {Restaurant} from './schemas/restaurant.js';
import {Reservation} from './schemas/reservation.js';
import {Room} from './schemas/room.js';
import {Employee} from "./schemas/employee.js";

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


const uri = "mongodb+srv://DominikM98:ZIOMekpl50@hotelmanagement.7bg2w.mongodb.net/hotel_management?retryWrites=true&w=majority";
const init = async () => {

 mongoose.connect(uri, (error) =>{
     if (error){
         console.error("Connect error", error);
     }else{
         console.info("Connect with database established", uri);
     }
 });

  await server.start();
};

init();


//RESTAURANT
//show all item menu
server.route({
  method: 'GET',
  path: '/restauration/showItems',
  handler: async (request, h) => {
      const getItemMenu = await Restaurant.find({});
      return h.response(getItemMenu).code(200);
  }
});

//add new item to menu
server.route({
    method: 'POST',
    path: '/restauration/createItemMenu',
    handler: async (request, h) => {
        const newItemMenu = await Restaurant.create({
            product_name: request.payload.product_name,
            ingredients: request.payload.ingredients,
            product_weight: request.payload.product_weight,
            product_price: request.payload.product_price,
            type_of_product: request.payload.type_of_product,
            min_quantity: request.payload.min_quantity,
            max_quantity: request.payload.max_quantity
        });
        return h.response(newItemMenu).code(200);
    }
});

//delete item from menu
server.route({
    method: 'DELETE',
    path: '/restauration/deleteItemMenu',
    handler: async (request, h) => {

        const id = request.query.id;
        const delItemMenu = await Restaurant.findOne({_id: id}).remove();
        return h.response(delItemMenu).code(200);
    }
});



//RESERVATIONS
//show all reservations
server.route({
    method: 'GET',
    path: '/reservation/showReservations',
    handler: async (request, h) => {
        const getReservation = await Reservation.find({});
        return h.response(getReservation).code(200);
    }
});

//add new reservation
server.route({
    method: 'POST',
    path: '/reservation/createReservation',
    handler: async (request, h) => {

        const newReservation = await Reservation.create({
            first_name: request.payload.first_name,
            last_name: request.payload.last_name,
            check_in: request.payload.check_in,
            check_out: request.payload.check_out,
            parking: request.payload.parking,
            breakfast: request.payload.breakfast,
            car_registration: request.payload.car_registration,
            number_room: request.payload.number_room,
            booking_price: request.payload.booking_price
        });
        return h.response(newReservation).code(200);
    }
});

//delete reservation
server.route({
    method: 'DELETE',
    path: '/reservation/deleteReservation',
    handler: async (request, h) => {

        const id = request.query.id;
        const delReservation = await Reservation.findOne({_id: id}).remove();
        return h.response(delReservation).code(200);
    }
});


//ROOMS
//show all rooms
server.route({
    method: 'GET',
    path: '/room/showRooms',
    handler: async (request, h) => {
        const getRoom = await Room.find({});
        return h.response(getRoom).code(200);
    }
});

//add new room
server.route({
    method: 'POST',
    path: '/room/createRoom',
    handler: async (request, h) => {

        const newRoom = await Room.create({
            floor_number: request.payload.floor_number,
            room_number: request.payload.room_number,
            room_name: request.payload.room_name,
            number_of_people: request.payload.number_of_people,
            type_of_beds: request.payload.type_of_beds,
            smoking: request.payload.smoking,
            price: request.payload.price,
            available: request.payload.available
        });
        return h.response(newRoom).code(200);
    }
});

//edit room
server.route({
    method: 'PUT',
    path: '/room/updateRoom',
    handler: async (request, h) => {

        const id = request.query.id;
        const updateRoom = await Room.findByIdAndUpdate({_id:id}, {
            floor_number: request.payload.floor_number,
            room_number: request.payload.room_number,
            room_name: request.payload.room_name,
            number_of_people: request.payload.number_of_people,
            type_of_beds: request.payload.type_of_beds,
            smoking: request.payload.smoking,
            price: request.payload.price,
            available: request.payload.available
        });
        return h.response(updateRoom).code(200);
    }
});

//delete room
server.route({
    method: 'DELETE',
    path: '/room/deleteRoom',
    handler: async (request, h) => {

        const id = request.query.id;
        const delRoom = await Room.find({_id: id}).remove();
        return h.response(delRoom).code(200);
    }
});

//EMPLOYEE
//get all employess
server.route({
    method: 'GET',
    path: '/employee/showEmployees',
    handler: async (request, h) => {

        const getEmployees = await Employee.find({});
        return h.response(getEmployees).code(200);
    }
});

//add new employee
server.route({
    method: 'POST',
    path: '/employee/createEmployee',
    handler: async (request, h) => {

        const newEmployee = await Employee.create({
            first_name: request.payload.first_name,
            last_name: request.payload.last_name,
            address: request.payload.address,
            email: request.payload.email,
            phone_number: request.payload.phone_number,
            position: request.payload.position,
            name_bank: request.payload.name_bank,
            account_number: request.payload.account_number,
            login: request.payload.login,
            password: request.payload.password
        });
        return h.response(newEmployee).code(200);
    }
});

//delete employee
server.route({
   method: 'DELETE',
   path: '/employee/deleteEmployee',
   handler: async (request, h) => {

       const id = request.query.id;
       const delEmployee = await Employee.findOne({_id: id}).remove();
       return h.response(delEmployee).code(200);
   }
});
