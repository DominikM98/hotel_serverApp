import mongoose from 'mongoose';

const {Schema} = mongoose;

const employeeSchema = new Schema({
   first_name: String,
   last_name: String,
   pesel_number: String,
   address: String,
   email: String,
   phone_number: {type: Number, default: 0},
   position: String,
   name_bank: String,
   account_number: String,
   login: String,
   password: String
}, {
   collection: 'employee'
});

const Employee = mongoose.model("Employee", employeeSchema);

export {Employee}