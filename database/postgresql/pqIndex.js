const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database: 'reviews'
});

pool.connect(function(err) {
  if (err) {
    console.log('error: ', err);
    return;
  } else {
    console.log('connection success!')
  }
});

module.exports = pool;