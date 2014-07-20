var express = require('express');
var router = express.Router();
var https = require('https');
var twitchResponse;

/* GET home page. */
router.get('/', function(req, res) {
  // options for twitch request
  var options = {
    host: 'api.twitch.tv',
    port: 443,
    path: '/kraken/channels/riotgames', // change to take as var
    broadcasts: true,
    limit: 10,
    method: 'GET'
  }

  // sends the request to the server
  var req = https.request(options, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      twitchResponse = chunk
    });
  });

  req.on('error', function(error) {
    console.log('problem with api request: ' + error.message);
  });

  // writes data and ends stream
  req.write('data\n');
  req.write('data\n');
  req.end();

  // renders page and sends JSON to view
  res.render('index',
    { 
      title: 'Stream Highlights', 
      streams: twitchResponse
    }
  );
});

module.exports = router;
