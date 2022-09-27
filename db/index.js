var connection = require('../config/database')

// create users table
connection.query('\
  DROP TABLE IF EXISTS users;\
  CREATE TABLE users (id serial, name varchar, position geometry(Point, 4326));\
')

// create 100 random users
var name1 = ["Thomas", "William", "Cristian", "Henry", "Max", "Francois"];
var name2 = ["Colin", "Yama", "Jelly", "Luico"];

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

for (var i = 0; i < 100; i++) {
  var index1 = Math.floor(Math.random() * name1.length)
  var index2 = Math.floor(Math.random() * name2.length)

  var name = name1[index1] + ' ' + name2[index2]
  var position = `ST_GeomFromText('POINT(${getRandomInRange(78, 80, 10)} ${getRandomInRange(27, 29, 10)})', 4326)`
  
  var query = `INSERT INTO users (name, position) VALUES ('${name}', ${position});`

  connection.query(query)
}