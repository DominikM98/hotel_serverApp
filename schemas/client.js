import mongoose from 'mongoose';

const {Schema} = mongoose;

const clientSchema = new Schema({
    first_name: String,
    last_name: String,
    address: String,
    email_address: String,
    phone_number: Number
}, {
    collection: 'client'
});

const Client = mongoose.model("Client", clientSchema);

export {Client}