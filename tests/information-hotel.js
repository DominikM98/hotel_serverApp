import mongoose from "mongoose";
import {dataHotel} from "../schemas/dataHotel.js";

import chai from 'chai';
import chaiHttp from "chai-http";
import server from "../server.js";
let should = chai.should();

chai.use(chaiHttp);
describe("PUT data", () => {
    it('should show information\'s', function () {
        chai.request("http://localhost:3000")
            .get("/showInformationHotel")
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
            })
    });

    it('should update information about hotel', function () {
        let newInfo = {
            description: "The hotel is located in the center of Wrocław. " +
                "We are only 500 meters from the main square.There is a shopping mall on the other side of the street." +
                "We have a large underground car park at your disposal.",
            facilities:[
                {$name_convenience: "Near beach"}, {$name_convenience: "Near supermarket"},
                {$name_convenience: "Swimpool"}, {$name_convenience: "SPA"},],
            contact_with_dept: [
                {
                    $dept_name: "Restaurant",
                    $more_info:  [
                        {
                            $person_name: "Waiters",
                            $phone_number: 14655987501,
                            $email_address: "waitersa@restaurant.hotel.com"
                        }
                    ]
                },
                {
                    $dept_name: "Marketing",
                    $more_info:  [
                        {
                            $person_name: "Oliwia Wołga",
                            $phone_number: 14655987511,
                            $email_address: "wolga.oliwia@marketing.hotel.com"
                        },
                        {
                            $person_name: "Oliwia Mak",
                            $phone_number: 14655987512,
                            $email_address: "mak.oliwia@marketing.hotel.com"
                        }
                    ]
                }
            ],
            company_data:
                {
                    name_company: "Hotel Hortex",
                    $address_company: [
                        {
                            $street_and_number: "Krzyżanowskiego 5",
                            $city: "Wrocław",
                            $postcode: "45-573",
                            $country: "Polska"
                        }
                    ],
                    phone_number: 14655987500,
                    fax_number: 14655987509,
                    email_address: "reception@reception.hotel.com",
                    NIP: "123-456-32-18",
                    REGON: 123456785
                }
        };

        chai.request('http://localhost:3000')
            .put("/createInformationHotel")
            .send(newInfo)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
            });
    });

});