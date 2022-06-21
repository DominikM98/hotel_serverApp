import mongoose from 'mongoose';

const {Schema} = mongoose;

const annualLeaveSchema = new Schema({
    first_name: String,
    last_name: String,
    position: String,
    from_date   : String,
    to_date: String,
    length_day: {type: Number, default: 0}
}, {
    collection: 'annualLeave'
});

const AnnualLeave = mongoose.model("AnnualLeave", annualLeaveSchema);

export {AnnualLeave}