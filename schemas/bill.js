import mongoose from 'mongoose';

const {Schema} = mongoose;

const billSchema = new Schema ({
    order: [
        {
            product_name: String,
            ingredients:  String,
            allergens: String,
            product_weight:  {type: Number, default: 0},
            product_price: {type: Number, default: 0},
            type_of_product:  String,
            min_quantity: {type: Number, default: 0},
            max_quantity: {type: Number, default: 300}
        }
    ],
    total_price: {type: Number, default: 0},
    discount_value: {type: Number, default: 0}
}, {
    collection: 'bill'
});

const Bill = mongoose.model("Bill", billSchema);

export {Bill}

