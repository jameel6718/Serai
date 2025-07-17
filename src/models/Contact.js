const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String
    // required: true,
    // minlength: 3
  },
  email: {
    type: String
    // required: true,
    // match: /.+\@.+\..+/
  },
  phone: {
    type: String
    // required: true,
    // minlength: 10
    // match: /^(\+92|0092|92|0)?[-\s]?3\d{2}[-\s]?\d{7}$/
  },
  message: {
    type: String
    // required: true,
    // minlength: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);

