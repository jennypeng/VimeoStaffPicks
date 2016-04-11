var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = 'https://vimeo.com/api/v2/channel/staffpicks/videos.json';
  request.get(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      res.render('index', {'videos': body});
    } else {
      console.log('error');
    }
  })
});

module.exports = router;
