var mongoose = require('mongoose');
mongoose.connect('mongodb://104.131.233.104:27017'); //replace with the proper host

//var databaseUrl = 'mongodb://104.131.233.104:27017';
var collections = ['highlights'];
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
  // do something
});

var highlightSchema = mongoose.Schema({
  id: Number,
  streamLink: String,
  beginTime: Number,
  endTime: Number,
  votes: {
    up: Number,
    down: Number,
    ip: String
  } 
});

var highlightCollection = mongoose.model('highlightCollection', highlightSchema);
