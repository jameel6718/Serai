const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  roomType: String,
  pricePerNight: Number,
  checkin: Date,
  checkout: Date,
  roomCount: Number,
  stayDays: Number,
  totalCost: Number,

  name: String,
  phone: String,

  paymentMethod: String,
  paymentDetails: Object,
  paidAmount: Number,
  paymentStatus: {
    type: String,
    default: 'pending'  // pending, approved, rejected
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = reservationSchema;
