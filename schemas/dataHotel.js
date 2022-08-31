import mongoose from 'mongoose';

const {Schema} = mongoose;

const dataHotelSchema = new Schema ({
    description: String,
    facilities:[{$name_convenience: String}],
    contact_with_dept: [
        {
            $dept_name: String,
            $more_info:  [
                {
                    $person_name: String,
                    $phone_number: Number,
                    $email_address: String
                }
            ]
        }
    ],
    company_data:
        {
            name_company: String,
            $address_company: [
                {
                    $street_and_number: String,
                    $city: String,
                    $postcode: String,
                    $country: String
                }
            ],
            phone_number: Number,
            fax_number: Number,
            email_address: String,
            NIP: String,
            REGON: Number
        }
}, {
    collection: 'dataHotel'
});

const dataHotel = mongoose.model("dataHotel", dataHotelSchema);

export {dataHotel}

