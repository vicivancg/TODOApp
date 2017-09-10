var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');

//Connect to the database

mongoose.Promise = global.Promise;
mongoose.connect('Cadena de conexión de tu servicio de mongodb',{ useMongoClient: true });

//Create a schema - this is like a blueprint

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item:'Get some milk'},{item:'Walk dog'},{item:'Kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
    app.get('/todo',function(req,res){
        //Get data from mongodb and pass it to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data});
        });
        //Todo.find({item:'buy flowers'});
        
    });

    app.post('/todo', urlencodedParser,function(req,res){
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req,res){
        //delete the requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};