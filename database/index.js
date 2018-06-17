const mysql = require('mysql');

const config = require('./config.js');
const connection = mysql.createConnection(config);


connection.connect();

const insert = (data) => {
  const q = `INSERT INTO Reviews (id,created_at,overall_rating,comment,rating_accuracy, rating_communication,rating_cleanliness,rating_location, rating_check_in,rating_value,house_id,user_id)VALUES ("${data.Date},${data.overallRating},"${data.Comment}", ${data.Accuracy}, ${data.Communication},${data.Cleanliness},${data.Location}, ${data.CheckIn},${data.value},${data.house_id},${data.user_id})`;
  connection.query(q, (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log('data saved');
    }
  });
};

const getUserInfo = (cb) => {
  const q = 'SELECT * FROM USERS';
  connection.query(q, (error, results) => {
    if (error) {
      cb(error, null);
    } else {
      cb(null, results);
    }
  });
};

const getHouseInfo = (param, cb) => {
  const q = `SELECT * FROM houses WHERE id = ${param} ORDER BY id ASC`;
  connection.query(q, (error, results) => {
    if (error) {
      cb(error, null);
    } else {
      cb(null, results);
    }
  });
};

const getReviewList = (param, cb) => {

  const q = `SELECT * FROM reviews where house_id = ${param.id} ORDER BY created_at DESC limit 7 OFFSET ${(+param.number * 7) - 6}`;
  connection.query(q, (error, results) => {
    if (error) {
      cb(error, null);
    } else {
      cb(null, results);
    }
  });
};

const getAllReviewList = (param, cb) => {
  const q = `SELECT * FROM reviews where house_id = ${param.houseId} ORDER BY created_at DESC`;
  connection.query(q, (error, results) => {
    if (error) {
      cb(error, null);
    } else {
      cb(null, results);
    }
  });
};

const getTargetUser = (param, cb) => {
  const q = `SELECT * FROM users where id = ${param}`;
  connection.query(q, (error, results) => {
    if (error) {
      cb(error, null);
    } else {
      cb(null, results);
    }
  });
};
module.exports = {
  insert, getUserInfo, getHouseInfo, getReviewList, getTargetUser, getAllReviewList,
};

