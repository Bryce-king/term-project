const express = require('express');
const Program = require('../models/Program');
const Rating = require('../models/Rating');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to check viewer auth
function authViewer(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(403).send('Access denied');

  const decoded = jwt.verify(token, 'secretkey');
  if (decoded.role !== 'viewer') return res.status(403).send('Unauthorized');
  
  req.user = decoded;
  next();
}

router.post('/rate', authViewer, async (req, res) => {
  const { programId, rating } = req.body;

  const newRating = new Rating({
    viewerId: req.user.userId,
    programId,
    rating
  });

  await newRating.save();
  res.send('Rating saved');
});

module.exports = router;
