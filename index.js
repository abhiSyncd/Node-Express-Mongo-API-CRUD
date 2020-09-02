const express = require('express');
const app     = express();
const path    = require('path');

require('./app/config/db')();
require('./app/config/routes')(app);


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});
 

app.listen(3000, () => console.log('Listening on Port 3000'));