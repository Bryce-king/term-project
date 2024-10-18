const mongoose = require('mongoose');
const Program = require('./models/Program');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/tv-web-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err));

// Seed data for TV programs
const programs = [
  {
    name: 'Morning News',
    network: 'ABC',
    time: new Date(new Date().setHours(new Date().getHours() + 0, 0, 0)), // Now
    duration: 60  // 1 hour
  },
  {
    name: 'Cartoon Hour',
    network: 'Cartoon Network',
    time: new Date(new Date().setHours(new Date().getHours() + 1, 0, 0)), // 1 hour from now
    duration: 60  // 1 hour
  },
  {
    name: 'Game Show Mania',
    network: 'CBS',
    time: new Date(new Date().setHours(new Date().getHours() + 2, 0, 0)), // 2 hours from now
    duration: 60  // 1 hour
  },
  {
    name: 'Cooking with Chefs',
    network: 'Food Network',
    time: new Date(new Date().setHours(new Date().getHours() + 3, 0, 0)), // 3 hours from now
    duration: 30  // 30 minutes
  },
  {
    name: 'Movie Time',
    network: 'HBO',
    time: new Date(new Date().setHours(new Date().getHours() + 4, 0, 0)), // 4 hours from now (should not display)
    duration: 120  // 2 hours
  }
];

// Insert seed data into the database
const seedDB = async () => {
  await Program.deleteMany({});  // Clear existing data
  await Program.insertMany(programs);  // Insert new seed data
  console.log('Database seeded with initial programs');
};

seedDB().then(() => {
  mongoose.connection.close();  // Close the connection once seeding is done
});
