server.route({
    method: 'GET',
    path: '/abra',
    handler: function(request, h){
        return 'Hello';
    }
});