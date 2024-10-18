const express = require('express');
const Rating = require('../models/Rating');
const Program = require('../models/Program');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to check rep auth
function authRep(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(403).send('Access denied');

  const decoded = jwt.verify(token, 'secretkey');
  if (decoded.role !== 'rep') return res.status(403).send('Unauthorized');

  req.user = decoded;
  next();
}

router.get('/ratings', authRep, async (req, res) => {
  const ratings = await Rating.aggregate([
    { $group: { _id: "$programId", avgRating: { $avg: "$rating" } } }
  ]);

  const result = [];
  for (const r of ratings) {
    const program = await Program.findById(r._id);
    result.push({ programName: program.name, avgRating: r.avgRating });
  }

  res.render('ratings', { ratings: result });
});

module.exports = router;