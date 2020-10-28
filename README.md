# Node-Express-Mongo-API-CRUD (Advance)

## 1- To get the Node server running locally:   

  > - Install MongoDB Community Edition (instructions) and run it by executing 'mongod' command  
  > - Clone this repo  
  > - npm install   :  command to install all required dependencies  
  > - node index.js : command to run the project on port 3000  


## 2 - Dependencies:   

  > - expressjs - The server for handling and routing HTTP requests
  > - mongoose  - For modeling and mapping MongoDB data to javascript
  


## 3 - Application Structure:   

  > index.js  
      - The entry point to our application. This file defines our express server which requires mongoDB and routes config
     
  > config/   
    - db.js     - configuration requires to connect to mongoDB  
    - routes.js - define all routes of the application
  
  > models/    
    - employeeModel.js - contains the schema definitions for our Mongoose models.  

  >routes/  
    - employeeRoutes.js - contains the route definitions for our API.



## 4 - What this project covers - Advanced CRUD -  Defined in employeeRoutes.js: 
 
     Base URL : http://localhost:3000/api/employee
    
     a) Inserting Documents         : HTTP  POST 
         - /insertSingleEmployee    : modelObject.save()
         - /insertMultipleEmployee  : Model.create() , Model.collection.insert()


     b) Selecting Documents         : HTTP GET 
         - /getSingleEmployee/:id   : Model.findById() , Model.findOne()
         - /getAllEmployees         : Model.find()
         - /getEmployees            : Server Side - Searching,Filtering,Sorting,Pagination 
    

      c) Updating Documents          : HTTP PUT
         - /updateSingleEmployee/:id : Model.findByIdAndUpdate() , Model.findOneAndUpdate()
         - /updateMultipleEmployees  : Model.updateMany()
         
      
      d) Deleting Documents          : HTTP DELETE 
         - /deleteSingleEmployee/:id : Model.findByIdAndDelete() , Model.findOneAndDelete()
         - /deleteMultipleEmployees  : Model.deleteMany()
      
    
    Disclaimer : Rest End Points URLs are not SStnadard specific
                 As i wanted to cover all possible scenarios 
                 
