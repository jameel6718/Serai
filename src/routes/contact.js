const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    // const result = await contact.save().catch((err) => {
    //   console.error("Validation error:", err);
    //   throw err; // re-throw so your catch block runs
    // });
    res.status(201).json({ message: 'Contact info submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit contact info' });
  }
});

module.exports = router;
