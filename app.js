var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//Set up template engine
app.set('view engine', 'ejs');

//Static files
app.use(express.static('./public'));

//Fire controllers
process.env.PORT || 5000
todoController(app);

//Listen to port
app.listen(process.env.PORT || 5000);

console.log('You are listening to port 3000');