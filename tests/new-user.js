import mongoose from "mongoose";
import {mobileUsers} from "../schemas/mobileUsers.js";

import chai from 'chai';
import chaiHttp from "chai-http";
import server from "../server.js";
let should = chai.should();

chai.use(chaiHttp);
describe("DELETE mobile user", () => {
    it('should show mobile users ', function () {
        let id = '';
        chai.request('http://localhost:3000')
            .get('/mobileAuth/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.length.should.be.eql(1);
            });
    });

    it('should delete user from mobile app', function () {
        let id = '62ecfa6e1f7969663be36721';
        chai.request('http://localhost:3000')
            .delete(id)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
            });
    });
});