var express = require('express')
var router = express.Router();
// Connect to redis
var client = require('redis').createClient(6379, 'redis');

/* TODO GET dishes */

/* Get dish */
router.get('/:dish', function(req, res, next) {
  var key = req.params.dish;
  var response = '';

  client.on('error', function(err) {
    console.log('Redis Connection Error: ' + err);
    next;
  });

  client.get(key, function(err, value) {
    // if err...
    response = value;
    console.log(key + ': ' + value);
    res.json({ [key]:  value})
  });
});

/* POST dish */
router.post('/', function(req, res, next) {
  let dishName = req.body.name;
  let dishExpiration = req.body.expiration;
  console.log("request.params: { name: "  + dishName + ", expiration:" + dishExpiration + " }");
  if(!dishName || !dishExpiration) {
    res.status(400).send("Missing parameters.");
  }

  client.set(dishName, dishExpiration, function(err, replies) {
    if(err) {
      console.log(err);
      console.log(replies);
      res.send(500);
    }
    res.send(201);
  });
});

/* DELETE dish */
router.delete('/:dish', function(req, res, next) {
  var key = req.params.dish;
  console.log("key is " + key);
  client.del(key, function(err, replies) {
    if(err) {
      console.log(err);
      res.send(500);
    }
    res.send(200);
  });
});

module.exports = router;
