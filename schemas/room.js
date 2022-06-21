import mongoose from 'mongoose';

const {Schema} = mongoose;

const roomSchema = new Schema ({
    floor_number: String,
    room_number: String,
    room_name: String,
    number_of_people: {type: Number, default: 0},
    type_of_beds: String,
    smoking: String,
    price: {type: Number, default: 0}
}, {
    collection: 'room'
});

const Room = mongoose.model("Room", roomSchema);

export {Room}

