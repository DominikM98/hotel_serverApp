import mongoose from 'mongoose';

const {Schema} = mongoose;

const reviewHotelSchema = new Schema ({
    number_booking: String,
    about_hotel: String,
    reception_service: Number,
    restaurant_service: Number,
    room_service: Number,
    interior_room: Number,
    equipment_room: Number,
    good_things: String,
    bad_things: String,
    recommend: String,
    more_data: String
}, {
    collection: 'reviewHotel'
});

const reviewHotel = mongoose.model("reviewHotel", reviewHotelSchema);

export {reviewHotel}

