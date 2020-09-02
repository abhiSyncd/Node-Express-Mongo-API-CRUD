const mongoose = require('mongoose');

module.exports = function() {
mongoose.connect('mongodb://localhost/NODE-EXPRESS-MONGO-API-CRUD-DB',{ useNewUrlParser: true })
    .then(()     => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Unable to connected to MongoDB...' , err));
}
