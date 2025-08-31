const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB ulandi'))
  .catch(err => console.error(err));

const movieSchema = new mongoose.Schema({
  title: String
});
const Movie = mongoose.model('Movie', movieSchema);

app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlayapti`));
