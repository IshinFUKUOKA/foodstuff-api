var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sampleList = [
    {
      id: "001",
      name: "hoge"
    }, {
      id: "002",
      name: "fuga"
    }
  ];
  res.json(sampleList);
});

module.exports = router;
