document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Real-time validation for name
    nameInput.addEventListener('input', function() {
        validateName();
    });

    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        validateEmail();
    });

    // Phone formatting and validation
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Start with +92
        if (!value.startsWith('92') && !value.startsWith('+92')) {
            if (value.length > 0) {
                value = '92' + value;
            } else {
                e.target.value = '+92';
                return;
            }
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
        const name = document.getElementById('name').value.trim();
        const nameError = document.getElementById('nameError');
        
        if (!name) {
            nameError.textContent = 'Name is required';
            document.getElementById('name').classList.add('error');
            return false;
        } else if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(name)) {
            nameError.textContent = 'Name must not contain special characters or digits';
            document.getElementById('name').classList.add('error');
            return false;
        } else {
            nameError.textContent = '';
            document.getElementById('name').classList.remove('error');
            return true;
        }
    }

    function validateEmail() {
        const email = document.getElementById('email').value.trim();
        const emailError = document.getElementById('emailError');
        
        if (!email) {
            emailError.textContent = 'Email is required';
            document.getElementById('email').classList.add('error');
            return false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            document.getElementById('email').classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            document.getElementById('email').classList.remove('error');
            return true;
        }
    }

    function validatePhone() {
        const phone = document.getElementById('phone').value.trim();
        const phoneError = document.getElementById('phoneError');
        
        if (!phone) {
            phoneError.textContent = 'Phone number is required';
            document.getElementById('phone').classList.add('error');
            return false;
        } else if (!/^\+92 [3-9]\d{2} \d{7}$/.test(phone)) {
            phoneError.textContent = 'Please enter: +92 XXX XXXXXXX';
            document.getElementById('phone').classList.add('error');
            return false;
        } else {
            phoneError.textContent = '';
            document.getElementById('phone').classList.remove('error');
            return true;
        }
    }

    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('phoneError').textContent = '';
        
        document.getElementById('name').classList.remove('error');
        document.getElementById('email').classList.remove('error');
        document.getElementById('phone').classList.remove('error');
        
        let isValid = validateName() & validateEmail() & validatePhone();
        
        // If all validations pass
        if (isValid) {
            document.getElementById('submitButton').style.display = 'none';
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Reservation Successful';
            document.querySelector('.form-button').appendChild(successMessage);
            
            // Clear form and disable inputs
            document.getElementById('contactForm').reset();
            document.getElementById('name').disabled = true;
            document.getElementById('email').disabled = true;
            document.getElementById('phone').disabled = true;
        }
    });
});
