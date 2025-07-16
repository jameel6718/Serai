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
//   console.log('Form submitted!');
//   alert('Reservation submitted successfully!');

  // Show payment section
const paymentSection = document.getElementById('paymentSection');
paymentSection.style.display = 'flex';

// Scroll to payment section
const offsetTop = paymentSection.offsetTop - 100;
window.scrollTo({ top: offsetTop, behavior: 'smooth' });


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

// Clear roomType error on change
document.getElementById('roomType').addEventListener('change', function () {
  document.getElementById('roomTypeError').textContent = '';
});

// Clear errors on focus
['name', 'phone', 'checkin', 'checkout'].forEach(field => {
  document.getElementById(field).addEventListener('focus', function () {
    document.getElementById(field + 'Error').textContent = '';
  });
});

document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
  radio.addEventListener('change', function () {
    const method = this.value;
    const container = document.getElementById('paymentDetails');
    document.getElementById('paymentError').textContent = '';

    if (method === 'card') {
      container.innerHTML = `
        <div>
          <label>Card Number:
            <input type="text" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" maxlength="19"/>
            <small id="cardNumberError" class="payment-input-error"></small>
          </label>
        </div>
        <div>
          <label>Expiry:
            <input type="month" id="expiry" />
            <small id="expiryError" class="payment-input-error"></small>
          </label>
        </div>
        <div>
          <label>CVV:
            <input type="text" id="cvv" maxlength="3" />
            <small id="cvvError" class="payment-input-error"></small>
          </label>
        </div>
      `;
    } else if (method === 'jazzcash') {
      container.innerHTML = `
        <div>
          <label>JazzCash Number:
            <input type="text" id="jazzcashNumber" placeholder="03XXXXXXXXX" />
            <small id="jazzcashError" class="payment-input-error"></small>
          </label>
        </div>
      `;
    } else {
      container.innerHTML = '';
    }
  });
});

document.getElementById('payNowBtn').addEventListener('click', function () {
  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
  const errorEl = document.getElementById('paymentError');
  errorEl.textContent = '';

  // Clear field-specific errors
  document.querySelectorAll('.payment-input-error').forEach(el => el.textContent = '');
  document.querySelectorAll('#paymentDetails input').forEach(input => {
    input.classList.remove('error-border');
  });

  if (!selectedMethod) {
    errorEl.textContent = 'Please select a payment method.';
    return;
  }

  const method = selectedMethod.value;

  if (method === 'card') {
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');

    let valid = true;

    // Card Number validation
    if (!cardNumber.value.trim()) {
      document.getElementById('cardNumberError').textContent = 'Enter card number.';
      cardNumber.classList.add('error-border');
      valid = false;
    } else if (!/^\d{16}$/.test(cardNumber.value.replace(/\s+/g, ''))) {
      document.getElementById('cardNumberError').textContent = 'Card number must be 16 digits.';
      cardNumber.classList.add('error-border');
      valid = false;
    }

    // Expiry validation
    if (!expiry.value.trim()) {
      document.getElementById('expiryError').textContent = 'Enter expiry date.';
      expiry.classList.add('error-border');
      valid = false;
    }

    // CVV validation
    if (!cvv.value.trim()) {
      document.getElementById('cvvError').textContent = 'Enter CVV.';
      cvv.classList.add('error-border');
      valid = false;
    } else if (!/^\d{3}$/.test(cvv.value)) {
      document.getElementById('cvvError').textContent = 'CVV must be 3 digits.';
      cvv.classList.add('error-border');
      valid = false;
    }

    if (!valid) return;

    alert('Card payment of 50% successful. Please pay the remaining on arrival.');
  }

  else if (method === 'jazzcash') {
    const jazzcashInput = document.getElementById('jazzcashNumber');
    const value = jazzcashInput.value.trim();
    const pattern = /^(\+92|0092|92|0)?3\d{2}[-\s]?\d{7}$/;

    if (!value) {
      document.getElementById('jazzcashError').textContent = 'Enter your JazzCash number.';
      jazzcashInput.classList.add('error-border');
      return;
    } else if (!pattern.test(value)) {
      document.getElementById('jazzcashError').textContent = 'Invalid JazzCash number format.';
      jazzcashInput.classList.add('error-border');
      return;
    }

    // alert('JazzCash payment of 50% successful. Please pay the remaining on arrival.');
    // 🟩 Collect and send form data to backend
    const formData = {
      roomType: document.getElementById('roomType').value,
      pricePerNight: selectedPrice,
      checkin: document.getElementById('checkin').value,
      checkout: document.getElementById('checkout').value,
      roomCount: parseInt(document.getElementById('roomCount').value),
      stayDays: parseInt(document.getElementById('stayDays').value),
      totalCost: parseInt(document.getElementById('totalCost').value.replace(/\D/g, '')),
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      paymentMethod: selectedMethod.value,
      paidAmount: parseInt(document.getElementById('totalCost').value.replace(/\D/g, '')) / 2
    };

    if (selectedMethod.value === 'card') {
      formData.paymentDetails = {
        cardNumber: document.getElementById('cardNumber').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value
      };
    } else if (selectedMethod.value === 'jazzcash') {
      formData.paymentDetails = {
        jazzcashNumber: document.getElementById('jazzcashNumber').value
      };
    }

    // 🟦 Send to backend API
    fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Reservation sent for approval!');

      // ✅ Reset reservation form
      document.getElementById('reservationForm').reset();

      // ✅ Reset calculated fields and dropdown
      document.getElementById('roomType').selectedIndex = 0;
      document.getElementById('pricePerNight').value = '';
      document.getElementById('stayDays').value = '';
      document.getElementById('totalCost').value = '';
      selectedPrice = 0;

      // ✅ Clear and hide payment section
      document.getElementById('paymentDetails').innerHTML = '';
      document.getElementById('paymentSection').style.display = 'none';
      document.getElementById('payNowBtn').disabled = false;
      document.getElementById('payNowBtn').textContent = 'Pay 50% Now';
    })

    .catch(err => {
      console.error('Error submitting reservation:', err);
      alert('Error occurred while submitting reservation.');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
});

// Clear error on focus
document.addEventListener('focusin', function (e) {
  if (e.target.matches('#paymentDetails input')) {
    e.target.classList.remove('error-border');
    const errorId = e.target.id + 'Error';
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.textContent = '';
  }
});
document.addEventListener('focusin', function (e) {
  if (e.target.matches('#paymentDetails input')) {
    e.target.classList.remove('error-border');

    // Special case: fix mapping jazzcashNumber => jazzcashError
    let errorId = '';
    if (e.target.id === 'jazzcashNumber') {
      errorId = 'jazzcashError';
    } else {
      errorId = e.target.id + 'Error';
    }

    const errEl = document.getElementById(errorId);
    if (errEl) errEl.textContent = '';
  }
});


//Pannel form
const adminToggle = document.getElementById('adminToggle');
const adminSidebar = document.getElementById('adminSidebar');
const closeSidebar = document.getElementById('closeSidebar');

const loginForm = document.getElementById('loginForm');

adminToggle.addEventListener('click', () => {
    adminSidebar.classList.add('active');
    loginForm.classList.remove('hidden');
});

closeSidebar.addEventListener('click', () => {
    adminSidebar.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (!adminSidebar.contains(e.target) && e.target !== adminToggle) {
        adminSidebar.classList.remove('active');
    }
});

// ====== LOGIN FORM VALIDATION + ADMIN CHECK ======
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');
    const accessError = document.getElementById('accessError'); // ✅ NEW

    let valid = true;

    emailError.textContent = '';
    passwordError.textContent = '';
    accessError.textContent = '';

    const validEmail = "admin@serai.com";
    const validPassword = "admin123";

    if (email.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.textContent = 'Enter a valid email address.';
        valid = false;
    }

    if (password.value.trim() === '') {
        passwordError.textContent = 'Password is required.';
        valid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        valid = false;
    }

    if (valid) {
        if (email.value === validEmail && password.value === validPassword) {
            loginForm.reset();
            window.open("admin-dashboard.html", "_blank");
        } else {
            accessError.textContent = "You are restricted from accessing the admin dashboard.";
        }
    }
});

// Clear error message when input is focused
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        const errorSpanId = input.id + 'Error';
        const errorSpan = document.getElementById(errorSpanId);
        if (errorSpan) {
            errorSpan.textContent = '';
        }

        const accessError = document.getElementById('accessError');
        if (accessError) {
            accessError.textContent = '';
        }
    });
});

