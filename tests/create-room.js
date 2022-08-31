import mongoose from "mongoose";
import {Room} from "../schemas/room.js";

import chai from 'chai';
import chaiHttp from "chai-http";
import server from "../server.js";
let should = chai.should();

chai.use(chaiHttp);
describe('POST room', () => {
    it('should POST room to the management system', function () {
        let room = {
            floor_number: "II",
            room_number: "202",
            room_name: "Double room",
            number_of_people: 2,
            type_of_beds: "Single",
            smoking: "No",
            price: 250.00
        };

        chai.request("http://localhost:3000")
            .post("/room/createRoom")
            .send(room)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done()
            });
    });
});