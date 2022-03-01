import mongoose from "mongoose";

const { Schema } = mongoose;

const restaurantSchema = new Schema({
    product_name: String,
    ingredients:  String,
    product_weight:  Number,
    product_price:  Number,
    type_of_product:  String,
    min_quantity: {type: Number, default: 0},
    max_quantity: Number
},{
    collection: 'itemMenu'
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export {Restaurant}
