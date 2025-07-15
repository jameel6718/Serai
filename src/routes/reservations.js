const express = require('express');
const router = express.Router();
const Rooms = require('../models/RoomModels');

// Helper to select correct model
function getRoomModel(roomType) {
  switch (roomType.toLowerCase()) {
    case 'deluxe room': return Rooms.DeluxeRoom;
    case 'junior suite': return Rooms.JuniorSuite;
    case 'presidential suite': return Rooms.PresidentialSuite;
    case 'executive suite': return Rooms.ExecutiveSuite;
    case '3 bedroom residence': return Rooms.ThreeBedroomResidence;
    case '4 bedroom residence': return Rooms.FourBedroomResidence;
    default: return null;
  }
}

// POST /api/reservations
router.post('/', async (req, res) => {
  try {
    const {
      roomType, checkin, checkout,
      name, phone,
      pricePerNight, roomCount, stayDays, totalCost,
      paymentMethod, paymentDetails, paidAmount
    } = req.body;

    const RoomModel = getRoomModel(roomType);
    if (!RoomModel) return res.status(400).json({ message: 'Invalid room type' });

    // ✅ Save the reservation with status pending
    const reservation = new RoomModel({
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

    await reservation.save();
    res.status(200).json({ message: 'Reservation submitted for admin approval' });

  } catch (err) {
    console.error('Error saving reservation:', err);
    res.status(500).json({ message: 'Server error while saving reservation' });
  }
});

module.exports = router;
