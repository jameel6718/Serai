const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const reservationRoutes = require('./routes/reservations');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/serai', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/feedback', require('./routes/feedback'));

app.use(express.json());
app.use('/api/reservations', reservationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
