// from github.com/qiao
function getClientIp(req){// currently not working
  var ipAddress;
  var forwardedIpsStr = req.header('x-forwarded-for');
  if (forwardedIpsStr){
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress){
    ipAddress = req.connection.remoteAddress;
  }

  return ipAddress;
};

var mongoose = require('mongoose');
mongoose.connect('mongodb://104.131.233.104:27017'); //replace with the proper host

//var databaseUrl = 'mongodb://104.131.233.104:27017';
var collections = ['streamhl'];
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
  // do something
});

var highlightSchema = mongoose.Schema({
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
    ip: '1.1.1.1',
    vote: 1
  }

  db.collection.update( 
    {id: 1},
    { $push:  } 
  );
  console.log('tried to add');
}

var highlight = mongoose.model('highlightCollection', highlightSchema);

var highlight1 = new highlight({streamLink: 'twitch.tv/riotgames', 
                                beginTime: 0, 
                                endTime: 10
});

highlight1.upvote();

highlight1.save(function (err, highlight1){
  if (err) return console.error(err);
});

highlight.upvote;

highlight.find({beginTime: 0}, function(err, highlights){
  if (err) return console.error(err);
  console.log(highlights);
});
