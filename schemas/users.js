import mongoose from 'mongoose';

const {Schema} = mongoose;

const usersSchema = new Schema ({
    login: String,
    password: String,
    role: String
}, {
    collection: 'users'
});

const Users = mongoose.model("Users", usersSchema);

export {Users}

