const Server = require('../server');

Server.server.route({
    method: 'GET',
    path: '/reservation/showReservation',
    handler: function (request, h) {

        let collection = client.db("hotel_management").collection("reservation");
        return collection.find({}).toArray()
    }
});