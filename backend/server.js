// step 1
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const userController = require('./controllers/user.controller');

app.use(express.json());

// Corsplocy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Origin, X-Requested-With'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', (req, res) => {
  res.send('Home page');
});

// step 5 (4 is > user)authentication
app.use('/auth', userController);

// step 2
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`listening on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
