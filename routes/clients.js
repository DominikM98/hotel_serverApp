const userRouters = (app, fs) => {
  // variables
  const dataPath = './data/clients.json';

  var clientsId = 0;

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
  app.get('/clients', (req, res) => {

    fs.readFile(dataPath, 'utf8', (er,data) => {

      console.log("CLIENTS: ",data);

      res.send(JSON.parse(data));
    });
  });

  // CREATE
   app.post('/clients/new', (req, res) => {

       readFile(data => {

         if (Object.keys(data).length === 0) {
           clientsId = 1;
         }else{
           clientsId++;
         }

           // add the new user
           data[clientsId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send('New user added');
           });
       },
           true);
   });


  // UPDATE
   app.put('/client/:id', (req, res) => {

       readFile(data => {

           // add the new user
           clientsId = req.params["id"];
           //const newUserId = uniqid();
           data[clientsId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Client number id:${clientsId} has been updated `);
           });
       },
           true);
   });

   // DELETE
   app.delete('/client/:id', (req, res) => {

       readFile(data => {

           // add the new user
          clientsId = req.params["id"];
           delete data[clientsId];

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Client number id:${clientsId} has been removed`);
           });
       },
           true);
   });

};

module.exports = userRouters;
