const faker = require('faker');
const fs = require('fs');
const Uuid = require('cassandra-driver').types.Uuid;
const id = Uuid.random();

const fakeRNG = (min, max) => faker.random.number({min, max})
const fakeRestaurant = () => faker.company.bsBuzz();
const fakeUserName = () => faker.name.findName();
const fakeReview = () => faker.lorem.paragraph(fakeRNG(1, 3))
const fakeBool = () => faker.random.boolean();
const fakeDate = () => faker.date.past(5).toLocaleString().split(' ')[0];
const fakeLocation = () => faker.address.city();

const generateReview = () => {
  const noise = ['Quiet', 'Moderate', 'Energetic'];
  const backgroundColors = ['#1ECBE1', '#961EE1', '#E1341E', '#6AE11E'];
  const rows = {};
  let review = '';

  rows.id = Uuid.random();
  rows.restaurant = fakeRNG(0, 1000000);
  rows.username = fakeUserName();
  rows.review = fakeReview();
  rows.overall = fakeRNG(1, 5);
  rows.food = fakeRNG(1, 5);
  rows.service = fakeRNG(1, 5);
  rows.ambience = fakeRNG(1, 5)
  rows.value = fakeRNG(1, 5)
  rows.noise = noise[fakeRNG(0, 2)];
  rows.recommendation = fakeBool();
  rows.date = fakeDate();
  rows.location = fakeLocation();
  rows.vip = fakeBool();
  rows.initials = rows.username.split(' ').map((name) => name[0]).join('');
  rows.icon_color = backgroundColors[fakeRNG(0, 3)];


  for (var key in rows) {
    review += `${rows[key]},`;
  }
  review = review.slice(0, review.length - 1);
  return review += '\n';
};

const createInput = () => {
    let memo = []
    for (var i = 0; i < 1000; i++) {
      memo.push(generateReview());
    }
    memo = memo.join('\n');
    return memo;
}

const createCSV = (writer, data, encoding, cb, repeats) => {
  let i = repeats;
  const write = () => {
    let ok = true;
    let memo = createInput();
    do {
      i -= 1;
      if (i % 500 === 0) {
        console.log(new Date(), 'item #: ', i);
      }
      if (i === 0) {
        writer.write(memo, encoding, cb);
      } else {
        ok = writer.write(memo, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

createCSV(fs.createWriteStream('./database/cassandra/seedReviewss.csv'), createInput, 'utf-8', () => fs.createWriteStream('./database/cassandra/seedReviewsss.csv').end(), 10);