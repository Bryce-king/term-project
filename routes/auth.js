const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !user.comparePassword(password)) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey');
  res.cookie('token', token).send('Logged in');
});

module.exports = router;