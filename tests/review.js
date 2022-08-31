import mongoose from "mongoose";
import {reviewHotel} from '../schemas/reviewHotel.js';

import chai from 'chai';
import chaiHttp from 'chai-http'
import server from '../server.js';
let should = chai.should();

chai.use(chaiHttp);
describe('GET reviews', () => {
    it('should GET all the reviews', function () {
        chai.request('http://localhost:3000')
            .get('/showReviewsHotel')
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            })
    });
});