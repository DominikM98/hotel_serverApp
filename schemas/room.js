import mongoose from 'mongoose';

const {Schema} = mongoose;

const roomSchema = new Schema ({
    floor_number: String,
    room_number: String,
    room_name: String,
    number_of_people: Number,
    type_of_beds: String,
    smoking: Boolean,
    price: Number
}, {
    collection: 'room'
});

const Room = mongoose.model("Room", roomSchema);

export {Room}
