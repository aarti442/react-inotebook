const connectToMongo = require('./db');
const express = require('express');
require('dotenv').config();
cors = require('cors')
connectToMongo();

const app = express();
//const PORT =  5000;
const PORT = process.env.PORT;
// Middleware (optional)
app.use(cors())
app.use(express.json());

// Example Route
app.get('/', (req, res) => {
  res.send('MongoDB connection is working!');
});

app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});