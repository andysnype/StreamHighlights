var includes = require('./includes');

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
var Schema = mongoose.Schema;
mongoose.connect(includes.databaseUrl, db);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
  // do something
});

var voteSchema = new Schema({
  ip: String,
  vote: Number, //-1 for down, 0 for neutral, and 1 for up
});

var highlightsSchema = new Schema({
  streamLink: String,
  beginTime: Number,
  endTime: Number,
  votes: [ voteSchema ]
});

// takes: vote to be recorded, voter's IP address
highlightsSchema.methods.vote = function (voteValue, voterIp) {
  // removes voter's vote if it already exists
  if (this.votes.find({ ip: voterIp }) != null) {
    this.votes.pull({ ip: voterIp });
  }
  // puts the new vote in the array
  this.votes.push({ ip: voterIp, vote: voteValue });
}

module.exports = mongoose.model('highlights', highlightsSchema);

/*
******************************************
******** USE FOR REFERENCE ONLY **********
******************************************

var highlightSchema = mongoose.Schema({
  streamLink: String,
  beginTime: Number,
  endTime: Number,
  votes: [{
    ip: String,
    vote: Number //-1 for down, 0 for neutral, and 1 for up
  }] 
});

//Make a highlight model using the highlightSchema
var Highlight = mongoose.model('Highlight', highlightSchema);

highlightSchema.methods.upvote = function(){
  var newVote = {
    ip: "1.1.1.1",
    vote: 1
  }
  this.votes.push(newVote);
  this.save(); 
}

highlightSchema.methods.modify = function modify(number){
  if(number == null){
    console.log("nothing to modify to. pass in argument.");
    return;
  }
  if(number != 0 && number != 1  && number != -1)
  {
    console.log("invalid value to upvote/downvote. everyone is treated equally.");
    return;
  }
  var newVote = {
    ip: "1.1.1.1",
    vote: number
  }
  this.votes.push(newVote);
  this.save();
  console.log("modified this vote to new vote: " + number);
}


var highlight = mongoose.model('highlightCollection', highlightSchema);

highlight.remove();

var highlight1 = new highlight({streamLink: 'twitch.tv/riotgames', 
                                beginTime: 0, 
                    		        endTime: 10
});

highlight1.upvote();

highlight1.save(function (err, highlight1){
  if (err) return console.error(err);
});

highlight.upvote;

highlight1.modify(0);
highlight1.modify(1);
highlight1.modify(-1);
highlight1.modify(-0.4);

highlight.find({beginTime: 0}, function(err, highlights){
  if (err) return console.error(err);
  console.log(highlights);
});
*/