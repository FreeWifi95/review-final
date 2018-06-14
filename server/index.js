const express = require('express');
const path = require('path');
const dataGenerator = require('../database/dataGenerator.js');
const db = require('../database/index.js');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.get('/generate-data', (/* req, res */) => {
  dataGenerator.houseInsertToDb();
  dataGenerator.userInsertToDb();
  dataGenerator.totalData();
});
// make endpoint for a user info
app.get('/users', (req, res) => {
  // get users info from database
  db.getUserInfo((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});
// make endpoint for house info
app.get('/house/:id/', (req, res) => {
  // get house info from database
  db.getHouseInfo(req.params.id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});
// make endpoint for all Reivew
app.get('/house/:houseId/reviews', (req, res) => {
  // get all the reviews from database
  db.getAllReviewList(req.params, (err, data) => {
    if (err) {
      console.log('err from server!!!!', err);
    } else {
      res.send(data);
    }
  });
});


app.get('/user/:userId', (req, res) => {
  const id = req.params.userId;
  db.getTargetUser(id, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.listen(3007, () => console.log('Example app listening on port 3007!'));
