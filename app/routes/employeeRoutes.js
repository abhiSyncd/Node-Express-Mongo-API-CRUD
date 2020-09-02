const {Employee} = require('../models/employeeModel'); 
const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');

module.exports = router; 


//***************************************** 1 - HTTP POST : Inserting Documents ************************************************************

/**
 * 
 * 1 - I  - Single Insert
 * 
 */
router.post('/insertSingleEmployee', async function (req, res) {
    let emp = new Employee(req.body)
    
    await emp.save(function(err,responseFromDB){

        if(err){
          console.log('an error occurred', err);
          return res.sendStatus(500);
        }

        res.status(200).send(responseFromDB);
        
    });

});


/**
 * 
 * 1 - II - Multiple Inserts
 * 
 */
router.post('/insertMultipleEmployee', async function (req, res) {

    //Way 1 : Using Model.create()
    await Employee.create(req.body, function(err,responseFromDB) {

        if (err) {
          console.log('an error occurred', err);
          return res.sendStatus(500);
        }
      
        res.status(200).send(responseFromDB);
      });


       /**
        //Way 2 : Using Model.create()
        await Employee.collection.insert(req.body, function(err,insertedEmployees) {

        if (err) {
          console.log('an error occurred', err);
          return res.sendStatus(500);
        }

        res.status(200).send(insertedEmployees);
      });
       */    
});


  
//***************************************** 2 - HTTP GET : Selecting  Documents ************************************************************


/**
 * 
 * 2 - I - Single Row Select : Select * from employees where _id = <passedEmployeeId>
 * 
 */

router.get('/getSingleEmployee/:id', async function (req, res) {

  //Way 1 : Using findById : 

  await Employee.findById(req.params.id, function (err, responseFromDB) {

    if (err) {
      console.log('an error occurred', err);
      return res.sendStatus(500);
    }

      res.send(responseFromDB);
  });

  /** 
   * //Way2 : Using findOne()
  var employeeIdToGet = mongoose.Types.ObjectId(req.params.id);
  
  await Employee.findOne( { _id : employeeIdToGet } , function (err, responseFromDB) {
    if (err) {
      console.log('an error occurred', err);
      return res.sendStatus(500);
    }

      res.send(responseFromDB);
  });
  */

});



/**
 * 
 * 2 - II - Multiple Rows Select :  Select * from employees order by name
 * 
 */

router.get('/getAllEmployees', async (req, res) => {
  
  await Employee.find( function(err, responseFromDB) {
    if (err) {
      console.log('an error occurred', err);
      return res.sendStatus(500);
    }

    res.status(200).send(responseFromDB);

   }).sort('name');

});



/**
 * 
 * 2 - III - Multiple Rows Select on condition : Searching,Filtering,Sorting,Pagination
 */
router.get('/getEmployees', async (req, res , next) => {
  
  let filtersObj    = {};
  let paginationObj = {};
  let sortByObj     = {};

  for (var prop in req.query) {
    if (req.query.hasOwnProperty(prop)) {

      //Create a Filter Object If Filters Present : Filter By 'city; OR 'salary'
      if (req.query.city !== undefined) {
        filtersObj.city = req.query.city;
      }
      if (req.query.salary !== undefined) {
          filtersObj.salary = req.query.salary;
      }

      //Create a Pagination Object If Pagination Present
      if (req.query.pageNumber !== undefined) {
        paginationObj.pageNumber = req.query.pageNumber;
      }
      if (req.query.pageSize !== undefined) {
        paginationObj.pageSize = req.query.pageSize;
      }


      //Create SortBy Object : Single Sort  : If Sorting Present
      if (req.query.sortBy === 'city') {
        sortByObj.city = 1;
      }
      if (req.query.sortBy === 'salary') {
        sortByObj.salary = 1;
      }



       //Dynamic Searching , Filtering Sorting , Pagination Query
       const query = Employee.find(filtersObj)                            //http://localhost:3000/api/employee/getEmployees?city=Bangalore&salary=50000 
       .skip((paginationObj.pageNumber - 1) * paginationObj.pageSize)     //http://localhost:3000/api/employee/getEmployees?city=Bangalore&salary=50000&pageNumber=1&pageSize=1
       .limit(parseInt(paginationObj.pageSize))
       .select({name:1})                                                  //select({ name: 1, city: 1 }) : select name , city from employees
       .sort(sortByObj)                                                   //.sort({ name : 1 })   :: Asc = 1 , Desc = -1



       query.exec(function (err, responseFromDB) {
       
       if (err) {
       console.log('an error occurred', err);
       return res.sendStatus(500);
      }

      res.send(responseFromDB);
    });

    }
    return;
  } 


  
    //-------------------------- Case 2 : If No-Query-string is not present----------------------------------
    Employee.find(function (err, responseFromDB) {
      if (err) return next(err);
      res.send(responseFromDB);
  });

  

});
  


//***************************************** 3 - HTTP PUT : Updating Documents ************************************************************


/**
 * 
 *  3 - I - Single Update
 * 
 */
router.put('/updateSingleEmployee/:id', async (req, res) => {

  //Way 1: findByIdAndUpdate
  await Employee.findByIdAndUpdate(req.params.id , req.body , { new: true },function(err,responseFromDB) {

    if (err) {
      console.log('an error occurred', err);
      return res.sendStatus(500);
    }

    if (!responseFromDB) return res.status(404).send('The customer with the given ID was not found.');
  
    res.status(200).send(responseFromDB);

  });

  /** 
  //Way 2 : findOneAndUpdate()
    var employeeIdToUpdate = mongoose.Types.ObjectId(req.params.id);
   
    await Employee.findOneAndUpdate({ _id : employeeIdToUpdate} , req.body , { new: true },function(err,responseFromDB) {

        if (err) {
          console.log('an error occurred', err);
          return res.sendStatus(500);
        }

        if (!responseFromDB) return res.status(404).send('The customer with the given ID was not found.');
      
        res.status(200).send(responseFromDB);

      });
   */

  });


/**
 * 
 * 3 - I - Multiple Update
 * 
 */
  router.put('/updateMultipleEmployeeStatesWithSameCity', async (req, res) => {

      //var condition = { _id:{ $in: [mongoose.Types.ObjectId("5c875222f1a5b5111883abb9") , mongoose.Types.ObjectId("5c875222f1a5b5111883abb8")]} };
      var condition = {
        "city" : { $eq: req.body.city } 
       };

      await Employee.updateMany(condition,  { state : req.body.state }  , function(err, responseFromDB) {
        if (err) {
          console.log('an error occurred', err);
          return res.sendStatus(500);
        }

        res.status(200).send(responseFromDB);
       });

  });




//--------------------------------------------------- 4.HTTP DELETE : Deleting Documents ---------------------------------------------------

/**
 * 
 * 4 - I - Single Delete
 * 
 */
router.delete('/deleteSingleEmployee/:id', async function (req, res) {

 //Way 1 : Using findByIdAndDelete : 
 await Employee.findByIdAndDelete(req.params.id, function (err, responseFromDB) {
  if (err) {
    console.log('an error occurred', err);
    return res.sendStatus(500);
  }

    res.send(responseFromDB);
});

/** 
  //Way2 : findOneAndDelete
  var employeeId = mongoose.Types.ObjectId(req.params.id);

  await Employee.findOneAndDelete({ _id : employeeId}, function (err, responseFromDB) {

    if (err) {
      console.log('an error occurred', err);
      return res.sendStatus(500);
    }

      res.send(responseFromDB);
  });
*/

});


/**
 * 
 * //4 II - Multiple Delete :: Note : NOTE : Request-Body contains Array of '_id' to be deleted :  Note:Employee.remove() is depreciated 
 * 
 */
router.delete('/deleteMultipleEmployees', async function (req, res) {

  let idArray = req.body.map(obj => mongoose.Types.ObjectId(obj._id));
       
  var query = {
    _id:{ $in: idArray }   //_id:{ $in: [mongoose.Types.ObjectId("5c875222f1a5b5111883abb9") , mongoose.Types.ObjectId("5c875222f1a5b5111883abb8")]}
  };

  await Employee.deleteMany(query , function (err, responseFromDB) {
          if (err) {
            console.log('an error occurred', err);
            return res.sendStatus(500);
          }
          res.status(200).send(responseFromDB);

        });

});