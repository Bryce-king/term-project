const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  viewerId: mongoose.Schema.Types.ObjectId,
  programId: mongoose.Schema.Types.ObjectId,
  rating: Number,
});

module.exports = mongoose.model('Rating', ratingSchema);