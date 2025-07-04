const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const app = express();
app.use(cors());
app.use(express.json());

const meditatiiRoutes = require('./routes/meditatii');
app.use('/api/meditatii', meditatiiRoutes);

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes); // /api/register și /api/login


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('API funcționează!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server pornit pe portul ${PORT}`);
});
