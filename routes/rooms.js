const roomsRouters = (app, fs) => {
  // variables
  const dataPath = './data/rooms.json';

  var roomsId = 0;

  // helper methods
     const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
         fs.readFile(filePath, encoding, (err, data) => {
             if (err) {
                 throw err;
             }

             callback(returnJson ? JSON.parse(data) : data);
         });
     };

     const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

         fs.writeFile(filePath, fileData, encoding, (err) => {
             if (err) {
                 throw err;
             }

             callback();
         });
     };

  // READ
  app.get('/rooms', (req, res) => {

    fs.readFile(dataPath, 'utf8', (er,data) => {

      console.log("CLIENTS: ",data);

      res.send(JSON.parse(data));
    });
  });

  // CREATE
   app.post('/rooms/new', (req, res) => {

       readFile(data => {

         if (Object.keys(data).length === 0) {
           roomsId = 1;
         }else{
           roomsId++;
         }

           // add the new user
           data[roomsId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send('New room added');
           });
       },
           true);
   });


  // UPDATE
   app.put('/room/:id', (req, res) => {

       readFile(data => {

           // add the new user
           roomsId = req.params["id"];
           //const newUserId = uniqid();
           data[roomsId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Room number id:${roomsId} has been updated `);
           });
       },
           true);
   });

   // DELETE
   app.delete('/room/:id', (req, res) => {

       readFile(data => {

           // add the new user
          roomsId = req.params["id"];
           delete data[roomsId];

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Room number id:${roomsId} has been removed`);
           });
       },
           true);
   });

};

module.exports = roomsRouters;
