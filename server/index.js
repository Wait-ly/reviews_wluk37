require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const path = require('path');
const compression = require('compression');
const pgdb = require('../database/postgresql/pqIndex.js');
const PORT = 3003;


app.use(express.static('public'));

app.use(bodyParser.json());

app.use(compression());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


// CREATE a review
app.post('/api/:restaurantID/reviews', (req, res) => {
  const { userID, restaurantID, review, overall, food, service, ambience, value, noiseLevel, recommendation, date } = req.body;
  const input = `INSERT INTO reviews (userID, restaurantID, review, overall, food, service, ambience, value, noiseLevel, recommendation, date) VALUES ${userID}, ${restaurantID}. ${review}, ${overall}, ${food}, ${service}, ${ambience}, ${value}, ${noiseLevel}, ${recommendation}, ${date};`;
  pgdb.query(input);
  res.send('inserted');
});

// READ all reviews
app.get('/api/:restaurantID/reviews', (req, res) => {
  let id = req.params.restaurantID;
  let input = `SELECT * FROM users JOIN reviews ON reviews.restaurantID=${id} AND reviews.userID = users.id;`;
  
  const totalReviews = (results) => {
    return Promise.all(results.map((row, i) => {
      var input = `SELECT COUNT(*) FROM reviews WHERE userID = ${row.userid}`;
      return pgdb.query(input)
        .then ((result) => {
          results[i]['total_reviews'] = result.rows[0].count;
        })
        .catch ((err) => {
          console.log(err);
        });
    }));
  };

  pgdb.query(input, (err, allResults) => {
    totalReviews(allResults.rows)
      .then ((result) => {
        res.send(allResults.rows);
      });
  });
});
// app.get('/api/:restaurantID/reviews', (req, res) => {
//   let input = `SELECT id FROM Restaurants where name='${req.params.restaurantID}';`;
//   db.query(input, (error, results) => {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     } else {
//       // console.log('results: ', results);
//       // let reviewQuery = `select * from reviews where restaurant_id = '${results[0].id}';`
//       let joinQuery = `SELECT * FROM Users JOIN Reviews ON Reviews.restaurant_id= '${results[0].id}' AND Reviews.user_id=Users.id;`
//       db.query(joinQuery, (error, results) => {
//         if (error) {
//           console.log(error);
//           res.send(error);
//         } else {
//           res.send(results);
//         }
//       })
//     }
//   });
// });

// UPDATE a review
app.put('/api/:restaurantID/reviews/:reviewID', (req, res) => {
  let restID = req.params.restaurantID.slice(1);
  let revID = req.params.reviewID;
  let input = `UPDATE reviews SET review = ${req.body.review} FROM reviews WHERE restaurantID = ${restID} AND id = ${revID};`;
  db.query(input, (error, result) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send('updated');
    }
  });
});

// DELETE a review
app.delete('/api/:restaurantID/reviews/:reviewID', (req, res) => {
  let restID = req.params.restaurantID.slice(1);
  let revID = req.params.reviewID;
  let input = `DELETE FROM reviews WHERE restaurantID = ${restID} AND id = ${revID}`;

  db.query(input, (error, results) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send('deleted');
    }
  });
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});
