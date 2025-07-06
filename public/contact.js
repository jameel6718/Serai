const form = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get field values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();

            // Get error message elements
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');

            // Clear previous errors
            nameError.textContent = '';
            emailError.textContent = '';
            phoneError.textContent = '';
            successMessage.style.display = '';

            let valid = true;

            // Name Validation (Only alphabets allowed)
            const namePattern = /^[A-Za-z\s]+$/;
            if (name === '') {
                nameError.textContent = 'Please enter your name.';
                valid = false;
            } else if (!namePattern.test(name)) {
                nameError.textContent = 'Name can only contain alphabets.';
                valid = false;
            }

            // Email Validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                emailError.textContent = 'Please enter your email.';
                valid = false;
            } else if (!emailPattern.test(email)) {
                emailError.textContent = 'Please enter a valid email address.';
                valid = false;
            }

            // Phone Validation (Only numbers allowed)
            const phonePattern = /^(\+92|92|0)?[-\s]?3\d{2}[-\s]?\d{7}$/; //Phone Validation (Also accept +92 formats with spaces or dashes)
            if (phone === '') {
                phoneError.textContent = 'Please enter your phone number.';
                valid = false;
            } else if (!phonePattern.test(phone)) {
                phoneError.textContent = 'Please enter a valid phone number.';
                valid = false;
            }

            if (!valid) {
                return;
            }

            // Reset form
            form.reset();

            // Show success message for 2 seconds
            successMessage.textContent = 'Thank you for contacting us!';
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 2000);
        });