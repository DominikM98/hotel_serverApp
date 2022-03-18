import mongoose from 'mongoose';

const {Schema} = mongoose;

const reservationSchema = new Schema({
    first_name: String,
    last_name: String,
    check_in: String,
    check_out: String,
    parking: Boolean,
    breakfast: Boolean,
    car_registration: String,
    room_number: String,
    number_of_people: Number,
    booking_price: Number
},{
    collection: 'reservation'
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export {Reservation}

