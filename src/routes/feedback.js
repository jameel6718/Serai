const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;
// ✅ GET route to fetch top 3 reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Feedback.find().sort({ createdAt: -1 }).limit(3);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
