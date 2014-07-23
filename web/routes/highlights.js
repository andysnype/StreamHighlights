var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function (req, res) {
  mongoose.model('highlights').find(function (err, highlights) {
    res.send(highlights);
  });
});

module.exports = router;