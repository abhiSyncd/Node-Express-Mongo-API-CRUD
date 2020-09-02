const express = require('express');
const empRoutes = require('../routes/employeeRoutes');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/employee', empRoutes);
}


