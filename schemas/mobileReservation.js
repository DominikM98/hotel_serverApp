import mongoose from 'mongoose';

const {Schema} = mongoose;

const mobileReservationSchema = new Schema({
    first_name: String,
    last_name: String,
    check_in: String,
    check_out: String,
    parking: String,
    breakfast: String,
    quantity_breakfast: {type: Number, default: 0},
    car_registration: String,
    number_of_rooms: {type: Number, default: 0},
    number_of_people: {type: Number, default: 0},
    phone_number: String,
    more_information: String
},{
    collection: 'mobileReservation'
});

const MobileReservation = mongoose.model('MobileReservation', mobileReservationSchema);

export {MobileReservation}

