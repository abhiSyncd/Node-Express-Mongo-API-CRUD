Source : https://github.com/gothinkster/node-express-realworld-example-app



1 - Getting started

To get the Node server running locally:

- Install MongoDB Community Edition (instructions) and run it by executing 'mongod' command
- Clone this repo
- npm install   :  command to install all required dependencies
- node index.js : command to run the project on port 3000

---------------------------------------------------------------------------------


2 - Dependencies

expressjs - The server for handling and routing HTTP requests

mongoose  - For modeling and mapping MongoDB data to javascript


---------------------------------------------------------------------------------


3 - Application Structure

index.js    
 - The entry point to our application. This file defines our express server which requires mongoDB and routes config

config/ 
  - db.js     - configuration requires to connect to mongoDB
  - routes.js - define all routes of the application
 

models/ 
  employeeModel.js - contains the schema definitions for our Mongoose models.


routes/ 
 - employeeRoutes.js - contains the route definitions for our API.




---------------------------------------------------------------------------------


4 - What this project covers - Advanced CRUD -  Defined in employeeRoutes.js

Base URL : http://localhost:3000/api/employee

 1)Inserting Documents      : HTTP  POST 
  
   /insertSingleEmployee    : modelObject.save()

   /insertMultipleEmployee  : Model.create() , Model.collection.insert()


2)Selecting Documents       : HTTP GET 
 
   /getSingleEmployee/:id   : Model.findById() , Model.findOne()

   /getAllEmployees         : Model.find()

   /getEmployees            : Searching,Filtering,Sorting,Pagination


3)Updating Documents        : HTTP PUT
  
  /updateSingleEmployee/:id : Model.findByIdAndUpdate() , Model.findOneAndUpdate()


  /updateMultipleEmployees  : Model.updateMany()


4)Deleting Documents        : HTTP DELETE 
 
  /deleteSingleEmployee/:id : Model.findByIdAndDelete() , Model.findOneAndDelete()

  /deleteMultipleEmployees  : Model.deleteMany()



---------------------------------------------------------------------------------

Other Good Links  : 

https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527



