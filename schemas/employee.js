import mongoose from 'mongoose';

const {Schema} = mongoose;

const employeeSchema = new Schema({
   first_name: String,
   last_name: String,
   address: String,
   email: String,
   phone_number: Number,
   position: String,
   name_bank: String,
   account_number: Number,
   login: String,
   password: String
}, {
   collection: 'employee'
});

const Employee = mongoose.model("Employee", employeeSchema);

export {Employee}