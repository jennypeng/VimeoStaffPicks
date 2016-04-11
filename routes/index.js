var express = require('express');
var router = express.Router();
var request = require('request');
var CLIENTID = 'fd96615e314b222c9fd3c01a1137c463fca79100';
var ACCESSTOKEN = '2c37cecb78b6d0977118fcf7d956d193';
/* GET home page. */
router.get('/', function(req, res, next) {
  var url = 'https://vimeo.com/api/v2/channel/staffpicks/videos.json';
  request.get(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      console.log(body);
      res.render('index', {'videos': body});
    } else {
      console.log('error');
    }
  })
  //res.render('index');
});

module.exports = router;
