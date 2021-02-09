const employeesRouters = (app, fs) => {
  // variables
  const dataPath = './data/employees.json';

  var employeesId = 0;

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
  app.get('/employees', (req, res) => {

    fs.readFile(dataPath, 'utf8', (er,data) => {

      console.log("EMPLOYEES: ",data);

      res.send(JSON.parse(data));
    });
  });

  // CREATE
   app.post('/employees/new', (req, res) => {

       readFile(data => {

         if (Object.keys(data).length === 0) {
           employeesId = 1;
         }else{
           employeesId++;
         }

           // add the new user
           data[employeesId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send('New employees has been added');
           });
       },
           true);
   });


  // UPDATE
   app.put('/employee/:id', (req, res) => {

       readFile(data => {

           // add the new user
           const employeesId = req.params["id"];
           //const newUserId = uniqid();
           data[employeesId] = req.body;

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Employee number id:${employeesId} has been updated `);
           });
       },
           true);
   });

   // DELETE
   app.delete('/employee/:id', (req, res) => {

       readFile(data => {

           // add the new user
           const employeesId = req.params["id"];
           delete data[employeesId];

           writeFile(JSON.stringify(data, null, 2), () => {
               res.status(200).send(`Employee number id:${employeesId} has been removed`);
           });
       },
           true);
   });
};

module.exports = employeesRouters;
