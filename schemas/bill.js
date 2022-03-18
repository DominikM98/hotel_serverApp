import mongoose from 'mongoose';

const {Schema} = mongoose;

const billSchema = new Schema ({
    total_price: Number,
    discount_value: {type: Number, default: 0},
    cash_method: {type: Number, default: 0},
    card_method: {type: Number, default: 0},
    voucher_method: {type: Number, default: 0}
}, {
    collection: 'bill'
});

const Bill = mongoose.model("Bill", billSchema);

export {Bill}

