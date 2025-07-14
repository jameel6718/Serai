const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');


    // Clear previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    phoneError.textContent = '';
    messageError.textContent = '';
    successMessage.style.display = 'none';

    let valid = true;

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\+92|0092|92|0)?[-\s]?3\d{2}[-\s]?\d{7}$/;

    if (name === '') {
        nameError.textContent = 'Please enter your name.';
        valid = false;
    } else if (!namePattern.test(name)) {
        nameError.textContent = 'Name can only contain alphabets.';
        valid = false;
    }

    if (email === '') {
        emailError.textContent = 'Please enter your email.';
        valid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
    }

    if (phone === '') {
        phoneError.textContent = 'Please enter your phone number.';
        valid = false;
    } else if (!phonePattern.test(phone)) {
        phoneError.textContent = 'Please enter a valid phone number.';
        valid = false;
    }
    if (message === '') {
    messageError.textContent = 'Please enter your message.';
    valid = false;
    }


    if (!valid) return;

    const contactData = {
    name: name,
    email: email,
    phone: phone,
    message: message // ✅ Correct usage
};


    fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Server response:", data);

        form.reset();
        successMessage.textContent = 'Thank you for contacting us!';
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 2000);
    })
    .catch((error) => {
        console.error("Error:", error);
        successMessage.textContent = "Something went wrong. Please try again.";
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 2000);
    });
});

window.addEventListener('load', () => {
    if (window.location.hash === '#formSection') {
        document.querySelector(window.location.hash).scrollIntoView({ behavior: 'smooth' });
    }
});

// Clear errors on focus
['name', 'email', 'phone', 'message'].forEach(field => {
    document.getElementById(field).addEventListener('focus', function () {
        document.getElementById(field + 'Error').textContent = '';
    });
});
