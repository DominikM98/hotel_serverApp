import mongoose from 'mongoose';

const {Schema} = mongoose;

const clientSchema = new Schema({
    first_name: String,
    last_name: String,
    address: String,
    email_address: String,
    phone_number: {type: Number, default: 0}
}, {
    collection: 'client'
});

const Client = mongoose.model("Client", clientSchema);

export {Client}