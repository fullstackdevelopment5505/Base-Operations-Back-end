var express = require('express');
var router = express.Router();

var connection = require('../config/database')

router.get('/getusers', async function(req, res, next) {
  var query = `SELECT name, ST_X(ST_Transform (position, 4326)) as lng, ST_Y(ST_Transform (position, 4326)) as lat FROM users WHERE ST_DWITHIN(users.position, ST_GeomFromText('POINT(${req.query.lng} ${req.query.lat})', 4326), ${req.query.radius})`

  var result = await connection.query(query)

  res.send(result.rows)
});

module.exports = router;
