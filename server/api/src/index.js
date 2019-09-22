const express = require('express');
const router = express.Router();
const path = require( 'path')


/* GET home page. */




router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
});

router.get('/services', function (req, res) {
  res.sendFile(path.join(__dirname + '/views' + '/services.html'))
});

router.get('/api', function (req, res) {
  res.sendFile(path.join(__dirname + '/views' + '/api.html'))
});




module.exports = router;
