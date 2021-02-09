const addressRouters = (app, fs) => {
  // variables
  const dataPath = './data/adresses.json';

  var addressesId = 0;

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
  app.get('/addresses', (req, res) => {

    fs.readFile(dataPath, 'utf8', (er,data) => {

      console.log("ADDRESSES: ",data);

      res.send(JSON.parse(data));
    });
  });

  // CREATE
   app.post('/addresses/new', (req, res) => {

       readFile(data => {

         if (Object.keys(data).length === 0) {
           addressesId = 1;
         }else{
           addressesId++;
         }

           // add the new user
           data[addressesId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send('New addresses added');
           });
       },
           true);
   });


  // UPDATE
   app.put('/address/:id', (req, res) => {

       readFile(data => {

           // add the new user
           const addressesId = req.params["id"];
           //const newUserId = uniqid();
           data[addressesId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Address number id:${addressesId} has been updated `);
           });
       },
           true);
   });

   // DELETE
   app.delete('/address/:id', (req, res) => {

       readFile(data => {

           // add the new user
           const addressesId = req.params["id"];
           delete data[addressesId];

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Address number id:${addressesId} has been removed`);
           });
       },
           true);
   });
};

module.exports = addressRouters;
