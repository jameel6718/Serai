let selectedPrice = 0;

// When a room is selected (via image click)
function selectRoom(room, price) {
  selectedPrice = price;

  // Select correct option in dropdown
  const roomTypeSelect = document.getElementById('roomType');
  for (let i = 0; i < roomTypeSelect.options.length; i++) {
    if (roomTypeSelect.options[i].value === room) {
      roomTypeSelect.selectedIndex = i;
      break;
    }
  }

  document.getElementById('pricePerNight').value = `$${price}`;

  // Reset form fields
  document.getElementById('checkin').value = '';
  document.getElementById('checkout').value = '';
  document.getElementById('roomCount').value = '1';
  document.getElementById('stayDays').value = '';
  document.getElementById('totalCost').value = '';
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';

  // Hide all previous error messages
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

  // Show the form section
  const formSection = document.getElementById('reservationFormSection');
  formSection.style.display = 'flex';

  // Scroll with offset for fixed navbar (100px)
  const offsetTop = formSection.offsetTop - 100;
  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
}

// Handle manual room selection from dropdown
document.getElementById('roomType').addEventListener('change', function () {
  document.getElementById('roomTypeError').textContent = ''; // ✅ clear error

  const selectedOption = this.options[this.selectedIndex];
  const price = selectedOption.dataset.price;

  if (price) {
    selectedPrice = parseInt(price);
    document.getElementById('pricePerNight').value = `$${price}`;
    calculateTotal();
  } else {
    selectedPrice = 0;
    document.getElementById('pricePerNight').value = '';
    document.getElementById('totalCost').value = '';
    document.getElementById('stayDays').value = '';
  }
});

// Calculate total days and total cost
function calculateTotal() {
  const checkin = new Date(document.getElementById('checkin').value);
  const checkout = new Date(document.getElementById('checkout').value);
  const roomCount = parseInt(document.getElementById('roomCount').value) || 1;

  if (!isNaN(checkin.getTime()) && !isNaN(checkout.getTime()) && checkout > checkin) {
    const diffTime = checkout - checkin;
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalCost = totalDays * selectedPrice * roomCount;

    document.getElementById('stayDays').value = totalDays;
    document.getElementById('totalCost').value = `$${totalCost}`;
  } else {
    document.getElementById('stayDays').value = '';
    document.getElementById('totalCost').value = '';
  }
}

// Disable past dates for check-in
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').setAttribute('min', today);
document.getElementById('checkout').setAttribute('min', today);

// Add listeners for total calculation
document.getElementById('checkin').addEventListener('change', () => {
  const checkin = document.getElementById('checkin').value;
  if (checkin) {
    document.getElementById('checkout').setAttribute('min', checkin);
  }
  calculateTotal();
});
document.getElementById('checkout').addEventListener('change', calculateTotal);

// Form submit validation
document.getElementById('reservationForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;

  const selectedRoom = document.getElementById('roomType').value;
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;

  // Clear all previous errors
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

  // ✅ Room type validation
  if (!selectedRoom) {
    document.getElementById('roomTypeError').textContent = 'Please select a room type.';
    isValid = false;
  }

  // Name validation
  if (!name) {
    document.getElementById('nameError').textContent = 'Please enter your name.';
    isValid = false;
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    document.getElementById('nameError').textContent = 'Name can only contain alphabets.';
    isValid = false;
  }

  // Phone validation
  if (!phone) {
    document.getElementById('phoneError').textContent = 'Please enter your phone number.';
    isValid = false;
  } else if (!/^(\+92|0092|92|0)?[-\s]?3\d{2}[-\s]?\d{7}$/.test(phone)) {
    document.getElementById('phoneError').textContent = 'Please enter a valid phone number.';
    isValid = false;
  }

  // Date validation
  const now = new Date();
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  if (!checkin) {
    document.getElementById('checkinError').textContent = 'Please enter Check-in date';
    isValid = false;
  } else if (checkinDate < now.setHours(0, 0, 0, 0)) {
    document.getElementById('checkinError').textContent = 'Check-in cannot be in the past';
    isValid = false;
  }

  if (!checkout) {
    document.getElementById('checkoutError').textContent = 'Please enter Check-out date';
    isValid = false;
  } else if (checkoutDate <= checkinDate) {
    document.getElementById('checkoutError').textContent = 'Check-out must be after check-in';
    isValid = false;
  }

  if (!isValid) return;

  // All valid
  console.log('Form submitted!');
  alert('Reservation submitted successfully!');

  // TODO: Send to backend
});

// Room count logic (+ / - buttons)
const roomCountInput = document.getElementById('roomCount');
const increaseRoom = document.getElementById('increaseRoom');
const decreaseRoom = document.getElementById('decreaseRoom');

increaseRoom.addEventListener('click', () => {
  let current = parseInt(roomCountInput.value) || 1;
  roomCountInput.value = current + 1;
  calculateTotal();
});

decreaseRoom.addEventListener('click', () => {
  let current = parseInt(roomCountInput.value) || 1;
  if (current > 1) {
    roomCountInput.value = current - 1;
    calculateTotal();
  }
});

// Clear errors on focus
['name', 'phone', 'checkin', 'checkout'].forEach(field => {
  document.getElementById(field).addEventListener('focus', function () {
    document.getElementById(field + 'Error').textContent = '';
  });
});

