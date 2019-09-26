const { Pool } = require('pg');
const pool = new Pool({
  host: '18.225.32.180',
  database: 'postgres',
  username: 'wluk37',
  password: 'lukluk123'
});

pool.connect(function(err) {
  if (err) {
    console.log('error: ', err);
    return;
  } else {
    console.log('connection success!');
  }
});

module.exports = pool;