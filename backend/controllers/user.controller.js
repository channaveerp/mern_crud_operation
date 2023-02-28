//step 3 creating controllers for users
const userModel = require('../models/User.model');
const router = require('express').Router();

// 1.create

// step 4. router user register here..
router.post('/register', async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// login

router.post('/login', async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Wrong user');
    }
    if (req.body.password != user.password) {
      return res.status(400).send('Wrong user');
    }
    if (req.body.name != user.name) {
      return res.status(400).send('Wrong user');
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});


// 2.read

module.exports = router;
