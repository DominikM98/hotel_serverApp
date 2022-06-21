import mongoose from 'mongoose';

const {Schema} = mongoose;

const reservationSchema = new Schema({
    first_name: String,
    last_name: String,
    check_in: String,
    check_out: String,
    parking: String,
    car_registration: String,
    breakfast: String,
    quantity_breakfast: {type: Number, default: 0},
    mobile_reservation: String,
    phone_number: String,
    room_number: String,
    number_of_people: {type: Number, default: 0},
    booking_price: {type: Number, default: 0},
    more_information: String,
    address_mail: String
},{
    collection: 'reservation'
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export {Reservation}

