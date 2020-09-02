const mongoose = require('mongoose');

const EmployeeModel = mongoose.model('Employee', new mongoose.Schema({
    name      : String,
    state     : String,
    city      : String,
    salary    : Number,   
    hiredDate : Date , 
    createdDate : {
        type    : Date, 
        default : Date.now,
    }
  }));
  
  
  exports.Employee = EmployeeModel;
