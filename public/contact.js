document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const submitButton = document.getElementById('submitButton');
    const form = document.getElementById('contactForm');

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Always start with +92
        if (!value.startsWith('92')) {
            value = '92' + value;
        }
        
        // Format as +92 XXX XXXXXXX
        let formatted = '+92';
        if (value.length > 2) {
            const code = value.substring(2, 5);
            if (code.length > 0) {
                formatted += ' ' + code;
                if (value.length > 5) {
                    const num = value.substring(5, 12);
                    if (num.length > 0) {
                        formatted += ' ' + num;
                    }
                }
            }
        }
        e.target.value = formatted;
    });

    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(name)) {
            nameError.textContent = 'Name must not contain special characters or digits!';
            nameInput.classList.add('error');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('error');
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email !== '' && !emailPattern.test(email)) {
            emailError.textContent = 'Please enter a valid email address!';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    }

    function validatePhone() {
        const phone = phoneInput.value.trim();
        const phoneError = document.getElementById('phoneError');
        if (!/^\+92\s?\d{3}\s?\d{7}$/.test(phone)) {
            phoneError.textContent = 'Please enter a valid phone number!';
            phoneInput.classList.add('error');
            return false;
        } else {
            phoneError.textContent = '';
            phoneInput.classList.remove('error');
            return true;
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear all errors first
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('phoneError').textContent = '';
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        phoneInput.classList.remove('error');

        const isValid = validateName() & validateEmail() & validatePhone();

        if (isValid) {
            // Hide button and show success message
            submitButton.style.display = 'none';

            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Reservation Successful!';
            document.querySelector('.sucessmessage').appendChild(successMessage);

            // Reset form fields
            form.reset();

            // Optional: re-enable form after 3 seconds
            setTimeout(() => {
                successMessage.remove();
                submitButton.style.display = 'block';
            }, 3000);
        }
    });
});
