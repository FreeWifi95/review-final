const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const dataGenerator = require('../database/dataGenerator.js');
const db = require('../database/index.js');

const port = process.env.PORT || 3007;
const app = express();

app.use('/:id', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.get('/generate-data', (/* req, res */) => {
  dataGenerator.houseInsertToDb();
  dataGenerator.userInsertToDb();
  dataGenerator.totalData();
});

app.get('/users', (req, res) => {
  db.getUserInfo((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/house/:id/', (req, res) => {
  db.getHouseInfo(req.params.id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.get('/house/:houseId/reviews', (req, res) => {
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

app.listen(port, () => console.log(`app listening on port ${port}!`));
