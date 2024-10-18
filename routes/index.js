const express = require('express');
const Program = require('../models/Program');
const router = express.Router();

router.get('/guide', async (req, res) => {
  const currentTime = new Date();
  const programs = await Program.find({
    time: { $gte: currentTime, $lte: new Date(currentTime.getTime() + 3 * 60 * 60 * 1000) }
  });
  res.render('guide', { programs });
});

module.exports = router;