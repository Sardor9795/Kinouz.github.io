const mongoose = require('mongoose');
require('dotenv').config();
const Movie = require('./index').Movie; // Will adjust to proper export

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Movie.deleteMany({});
    await Movie.insertMany([
      { title: 'Avatar 2' },
      { title: 'Oppenheimer' },
      { title: 'Spider-Man: No Way Home' }
    ]);
    console.log('Namuna kinolar qo'shildi');
    process.exit();
  })
  .catch(err => console.error(err));
