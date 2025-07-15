const mongoose = require('mongoose');
const reservationSchema = require('./ReservationSchema');

module.exports = {
  DeluxeRoom: mongoose.model('DeluxeRoom', reservationSchema),
  JuniorSuite: mongoose.model('JuniorSuite', reservationSchema),
  PresidentialSuite: mongoose.model('PresidentialSuite', reservationSchema),
  ExecutiveSuite: mongoose.model('ExecutiveSuite', reservationSchema),
  ThreeBedroomResidence: mongoose.model('ThreeBedroomResidence', reservationSchema),
  FourBedroomResidence: mongoose.model('FourBedroomResidence', reservationSchema)
};
