const faker = require('faker');
const fs = require('fs');

const fakeRNG = (num) => faker.random.number({min: 1, max: num});
const fakeReview = () => faker.lorem.paragraph(fakeRNG(3));
const fakeBool = () => faker.random.boolean();
const fakeDate = () => faker.date.past(5).toLocaleString().split(' ')[0];
const fakeName = () => faker.name.findName();
const fakeLocation = () => faker.address.city();
const fakeRestaurant = () => faker.company.bsBuzz();

// create restaurant
const generateRestaurant = () => {
  const rows = {};
  let restaurant = '';

  rows.name = fakeRestaurant();

  for (var key in rows) {
    restaurant += `${rows[key]},`;
  }
  restaurant = restaurant.slice(0, restaurant.length - 1);
  return restaurant += '\n';
};

// create user
const generateUser = () => {
  const backgroundColors = ['#1ECBE1', '#961EE1', '#E1341E', '#6AE11E'];
  const rows = {};
  let user = '';

  rows.username = fakeName();
  rows.initials = rows.username.split(' ').map((name) => name[0]).join('');
  rows.location = fakeLocation();
  rows.icon_color = backgroundColors[fakeRNG(3)];
  rows.vip = fakeBool();

  for (var key in rows) {
    user += `${rows[key]},`;
  }
  user = user.slice(0, user.length - 1);
  return user += '\n';
};

// create review
const generateReview = () => {
  const noise = ['Quiet', 'Moderate', 'Energetic'];
  const rows = {};
  let review = '';

  rows.userID = fakeRNG(1000000).toString();
  rows.restaurantID = fakeRNG(1000000).toString();
  rows.review = fakeReview().toString();
  rows.overall = fakeRNG(5).toString();
  rows.food = fakeRNG(5).toString();
  rows.service = fakeRNG(5).toString();
  rows.ambience = fakeRNG(5).toString();
  rows.value = fakeRNG(5).toString();
  rows.noise = noise[fakeRNG(2)].toString();
  rows.recommendation = fakeBool().toString();
  rows.date = fakeDate().toString();

  for (var key in rows) {
    review += `${rows[key]},`;
  }
  review = review.slice(0, review.length - 1);
  return review += '\n';
};

const createCSV = (writer, data, encoding, cb, repeats) => {
  let i = repeats;
  const write = () => {
    let ok = true;
    let sampleReview = () => data();
    do {
      i -= 1;
      if (i % 100000 === 0) {
        console.log(new Date().toLocaleString(), ' item #: ', i);
      }
      if (i === 0) {
        writer.write(sampleReview(), encoding, cb);
      } else {
        ok = writer.write(sampleReview(), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

// createCSV(fs.createWriteStream('./database/postgresql/seedReviews.csv'), generateReview, 'utf-8', () => fs.createWriteStream('./database/postgresql/seedReviewsss.csv').end(), 100);
// createCSV(fs.createWriteStream('./database/postgresql/seedRestaurants.csv'), generateRestaurant, 'utf-8', () => fs.createWriteStream('./database/postgresql/seedRestaurantss.csv').end(), 1000000);
createCSV(fs.createWriteStream('./database/postgresql/seedUsers.csv'), generateUser, 'utf-8', () => fs.createWriteStream('./database/postgresql/seedUserss.csv').end(), 1000000);