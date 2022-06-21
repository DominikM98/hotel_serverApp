import mongoose from 'mongoose';

const {Schema} = mongoose;

const mobileUsersSchema = new Schema ({
    phone_number: String,
    password: String,
    security_code: String
}, {
    collection: 'mobileUsers'
});

const mobileUsers = mongoose.model("mobileUsers", mobileUsersSchema);

export {mobileUsers}

