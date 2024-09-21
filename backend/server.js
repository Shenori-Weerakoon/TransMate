const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const translateRoutes = require('./routes/translateRoutes');
const sinhalaDictionaryRoutes = require('./routes/SinhalaDictionaryRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', translateRoutes);
app.use('/api/sinhala-dictionary', sinhalaDictionaryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});