const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: String,
  network: String,
  time: Date,  // When the program is scheduled to air
  duration: Number,  // Duration in minutes
});

const Program = mongoose.model('Program', programSchema);
module.exports = Program;