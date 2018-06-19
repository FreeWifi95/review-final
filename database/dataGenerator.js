const faker = require('faker');

const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

connection.connect();

const findOrCreate = (tableName, id, cb, cbArg) => {
  const q = `SELECT * from ${tableName} where id = ${id}`;
  const recordExists = results => (results && results.length > 0);

  connection.query(q, (error, results) => {
    if (error) {
      console.error(error);
    } else {
      if (recordExists(results)) {
        console.log(`${id} from ${tableName} already exists.`);
      } else {
        cb(cbArg);
      }
    }
  });
};

const userInsert = (data) => {
  const q = `INSERT INTO Users (id,user_name,photo) VALUES(${data.id},"${data.user_name}","${data.photo}")`;
  connection.query(q, (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log('data saved', results);
    }
  });
};
const UserData = (id) => {
  const user = {
    id,
    user_name: faker.name.findName(),
    photo: faker.image.avatar(),
  };
  return user;
};
const userInsertToDb = () => {
  let count = 1;
  while (count < 36) {
    findOrCreate('Users', count, userInsert, UserData(count));
    count += 1;
  }
};

// houses
const houseInsert = (data) => {
  const q = `INSERT INTO Houses (id,overall_rating,rating_accuracy,rating_communication,rating_cleanliness,rating_location,rating_check_in,rating_value) VALUES(${data.id},${data.overall_rating},${data.rating_accuracy},${data.rating_communication},${data.rating_cleanliness},${data.rating_location},${data.rating_check_in},${data.rating_value})`;
  connection.query(q, (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log('data saved', results);
    }
  });
};
const houseData = (id) => {
  const house = {
    id,
    overall_rating: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_accuracy: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_communication: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_cleanliness: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_location: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_check_in: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_value: faker.random.number({
      min: 1,
      max: 5,
    }),
  };
  return house;
};
const houseInsertToDb = () => {
  let count = 0;
  while (count < 100) {
    findOrCreate('Houses', count, houseInsert, houseData(count));
    count += 1;
  }
};

// reviews
const insert = (data) => {
  const q = 'INSERT INTO Reviews (' +
    'created_at,' +
    'overall_rating,' +
    'comment,' +
    'rating_accuracy,' +
    'rating_communication,' +
    'rating_cleanliness,' +
    'rating_location,' +
    'rating_check_in,' +
    'rating_value,' +
    'house_id,' +
    'user_id' +
    ') VALUES (' +
    `FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('2003-01-01')) + UNIX_TIMESTAMP('2003-01-01')), ${data.overall_rating}, "${data.comment}", ${data.rating_accuracy}, ${data.rating_communication},${data.rating_cleanliness},${data.rating_location}, ${data.rating_check_in},${data.rating_value},${data.house_id},${data.user_id})`;
  connection.query(q, (error, results) => {
    const printLogString = `${JSON.stringify(data)}\n${q}`;
    if (error) {
      console.log(printLogString);
      throw error;
    } else {
      console.log(printLogString, results);
    }
  });
};

const makeData = (id) => {
  const review = {
    id,
    created_at: faker.date.recent(),
    overall_rating: faker.random.number({
      min: 1,
      max: 5,
    }),
    comment: faker.lorem.sentences(),
    rating_accuracy: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_communication: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_cleanliness: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_location: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_check_in: faker.random.number({
      min: 1,
      max: 5,
    }),
    rating_value: faker.random.number({
      min: 1,
      max: 5,
    }),
    house_id: faker.random.number({
      min: 0,
      max: 99,
    }),
    user_id: faker.random.number({
      min: 1,
      max: 35,
    }),
  };
  return review;
};

const totalData = () => {
  for (let i = 1; i < 2501; i += 1) {
    findOrCreate('Reviews', i, insert, makeData(i));
  }
};

module.exports = {
  totalData,
  houseInsertToDb,
  userInsertToDb,
};
