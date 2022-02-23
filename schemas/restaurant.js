import mongoose from "mongoose";

const { Schema } = mongoose;

const restaurantSchema = new Schema({
    product_name: {type: String},
    ingredients: {type: String},
    product_weight: {type: String},
    product_price: {type: String},
    type_of_product: {type: String}
},{
    collection: 'itemMenu'
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export {Restaurant}
