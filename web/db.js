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
  votes: [{
    ip: String,
    vote: Number //-1 for down, 0 for neutral, and 1 for up
  }] 
});

highlightSchema.methods.upvote = function(){
  var newVote = {
    ip: request.connection.remoteAddress,
    vote: 1
  }

  db.collection.update( 
    {id: this.id},
    { $push:{'votes.$.items': newVote} } 
  );
}

var highlight = mongoose.model('highlightCollection', highlightSchema);
