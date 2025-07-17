const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    
    const {
      roomType, checkin, checkout,
      name, phone,
      pricePerNight, roomCount, stayDays, totalCost,
      paymentMethod, paymentDetails, paidAmount
    } = req.body;

    const booking = new Booking({
      roomType,
      pricePerNight,
      checkin,
      checkout,
      roomCount,
      stayDays,
      totalCost,
      name,
      phone,
      paymentMethod,
      paymentDetails,
      paidAmount,
      paymentStatus: 'pending'
    });

    await booking.save();
    res.status(200).json({ message: 'Reservation saved to Booking collection' });

  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ message: 'Server error while saving booking' });
  }
});

// ✅ GET: Fetch all booking
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings); // returns empty array if no bookings
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
});

module.exports = router;

