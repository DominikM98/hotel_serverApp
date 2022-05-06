import Hapi from '@hapi/hapi';
import Qs from 'qs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {Restaurant} from './schemas/restaurant.js';
import {Reservation} from './schemas/reservation.js';
import {Room} from './schemas/room.js';
import {Employee} from "./schemas/employee.js";
import {AnnualLeave} from "./schemas/annualLeave.js";
import {Bill} from "./schemas/bill.js";
import {Users} from "./schemas/users.js";
import {Client} from "./schemas/client.js";

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

//LOGIN
// sign up user
server.route({
    method:'POST',
    path: '/auth/signup',
    handler: async (request, h) => {
        const password = request.payload.password;
        const login = request.payload.login;

        //let hashedPass = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            login: request.payload.login,
            password: request.payload.password,
            role: request.payload.role
        });

        const token = jwt.sign(
            {login},
            "fn32iuhf392hf392hg3279gh32nvh82",
            {expiresIn: 360000});



        return h.response(newUser).code(200)
    }
});

// get all users
server.route({
    method:'GET',
    path: '/auth/users',
    handler: async (request, h) => {
        const getUsers = await Users.find({});
        return h.response(getUsers).code(200)
    }
});

//check that user is exists
server.route({
    method:'POST',
    path: '/auth/login',
    handler: async (request, h) => {
        const password = request.payload.password;
        const login = request.payload.login;

        let user = await Users.findOne({login: login});

        let isMatch = await bcrypt.compare(password, user.password);

        const token = jwt.sign(
            {login},
            
            "fn32iuhf392hf392hg3279gh32nvh82",
            {expiresIn: 360000});
        
        const u = {
            login: login,
            
            role: user.role
        };

       return h.response(u).code(200)
    }
});

//RESTAURANT
//show all item menu
server.route({
  method: 'GET',
  path: '/restaurant/showItems',
  handler: async (request, h) => {
      const getItemMenu = await Restaurant.find({});
      return h.response(getItemMenu).code(200);
  }

});

//add new item to menu
server.route({
    method: 'POST',
    path: '/restaurant/createItemMenu',
    handler: async (request, h) => {

        console.log(request.payload)
        const newItemMenu = await Restaurant.create({
            product_name: request.payload.product_name,
            ingredients: request.payload.ingredients,
            allergens: request.payload.allergens,
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
    path: '/restaurant/deleteItemMenu',
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

        console.log(request.payload);
        const newReservation = await Reservation.create({
            first_name: request.payload.first_name,
            last_name: request.payload.last_name,
            check_in: request.payload.check_in,
            check_out: request.payload.check_out,
            parking: request.payload.parking,
            breakfast: request.payload.breakfast,
            car_registration: request.payload.car_registration,
            room_number: request.payload.room_number,
            number_of_people: request.payload.number_of_people,
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

        console.log(request.payload)
        const newRoom = await Room.create({
            floor_number: request.payload.floor_number,
            room_number: request.payload.room_number,
            room_name: request.payload.room_name,
            number_of_people: request.payload.number_of_people,
            type_of_beds: request.payload.type_of_beds,
            smoking: request.payload.smoking,
            price: request.payload.price
        });
        return h.response(newRoom).code(200);
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

        console.log(request.payload)
        const newEmployee = await Employee.create({
            first_name: request.payload.first_name,
            last_name: request.payload.last_name,
            pesel_number: request.payload.pesel_number,
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


//ANNUAL LEAVE
//get all annual leave
server.route({
    method: 'GET',
    path: '/employee/showAnnualLeave',
    handler: async (request, h) =>{

        const getAnnualLeave = await AnnualLeave.find({});
        return h.response(getAnnualLeave).code(200);
    }
});

//add new annual leave
server.route({
    method: 'POST',
    path: '/employee/createAnnualLeave',
    handler: async (request, h) => {

        console.log(request.payload)
        const newAnnualLeave = await AnnualLeave.create({
            first_name: request.payload.first_name,
            last_name: request.payload.last_name,
            position: request.payload.position,
            from_date: request.payload.from_date,
            to_date: request.payload.to_date,
            length_day: request.payload.length_day
        });
        return h.response(newAnnualLeave).code(200);
    }
});

//delete annual leave
server.route({
   method: 'DELETE',
   path: '/employee/deleteAnnualLeave',
   handler: async (request, h) => {
       const id = request.query.id;
       const deleteAnnualLeave = await AnnualLeave.findOne({_id:id}).remove();
       return h.response(deleteAnnualLeave).code(200);
   }
});

//BILL
//get all bills
server.route({
    method: 'GET',
    path: '/restaurant/showBill',
    handler: async (request, h) =>{

        const getBill = await Bill.find({});
        return h.response(getBill).code(200);
    }
});

//add new bill
server.route({
    method: 'POST',
    path: '/restaurant/createBill',
    handler: async (request, h) => {

        console.log(request.payload)
        const newBill = await Bill.create({
            order: [{
                product_name: request.payload.product_name,
                product_weight: request.payload.product_weight,
                product_price: request.payload.product_price,
                min_quantity: request.payload.min_quantity
            }],
            total_price: request.payload.total_price,
            discount_value: request.payload.discount_value
        });
        return h.response(newBill).code(200);
    }
});

//CLIENT
//show all client
server.route({
    method:'GET',
    path: '/client/showClients',
    handler: async (request, h) => {
        const getClient = await Client.find({});
        return h.response(getClient).code(200);
    }
});

//add new client
server.route({
    method: 'POST',
    path: '/client/createClient',
    handler: async (request, h) => {

        console.log(request.payload)
        const newClient = await Client.create({
            first_name: request.payload.first_name,
            last_name: request.payload.last_name,
            address: request.payload.address,
            email_address: request.payload.email_address,
            phone_number: request.payload.phone_number
        });

        return h.response(newClient).code(200);
    }
});

//delete client
server.route({
   method: 'DELETE',
   path: '/client/deleteClient',
    handler: async (request, h) => {
        const id = request.query.id;
        const deleteClient = await Client.findOne({_id:id}).remove();
        return h.response(deleteClient).code(200);
    }
});