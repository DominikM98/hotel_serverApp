const reservationsRouters = (app, fs) => {
  // variables
  const dataPath = './data/reservations.json';

  var reservationsId = 0;

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
  app.get('/reservations', (req, res) => {

    fs.readFile(dataPath, 'utf8', (er,data) => {

      console.log("RESERVATIONS: ",data);

      res.send(JSON.parse(data));
    });
  });

  // CREATE
   app.post('/reservations/new', (req, res) => {

       readFile(data => {

         if (Object.keys(data).length === 0) {
           reservationsId = 1;
         }else{
           reservationsId++;
         }

           // add the new user
           data[reservationsId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send('New reservation added');
           });
       },
           true);
   });


  // UPDATE
   app.put('/reservation/:id', (req, res) => {

       readFile(data => {

           // add the new user
           reservationsId = req.params["id"];
           //const newUserId = uniqid();
           data[reservationsId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Reservation number id:${reservationsId} has been updated `);
           });
       },
           true);
   });

   // DELETE
   app.delete('/reservation/:id', (req, res) => {

       readFile(data => {

           // add the new user
          reservationsId = req.params["id"];
           delete data[reservationsId];

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Reservation number id:${reservationsId} has been removed`);
           });
       },
           true);
   });

};

module.exports = reservationsRouters;
