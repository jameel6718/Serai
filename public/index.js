let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slideshow .slide');

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 4000);

function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

const adminToggle = document.getElementById('adminToggle');
const adminSidebar = document.getElementById('adminSidebar');
const closeSidebar = document.getElementById('closeSidebar');

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

// Open sidebar
adminToggle.addEventListener('click', () => {
    adminSidebar.classList.add('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

// Close sidebar
closeSidebar.addEventListener('click', () => {
    adminSidebar.classList.remove('active');
});

// Outside click closes sidebar
window.addEventListener('click', (e) => {
    if (!adminSidebar.contains(e.target) && e.target !== adminToggle) {
        adminSidebar.classList.remove('active');
    }
});

// Switch to signup form
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

// Switch to login form
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// ====== LOGIN FORM VALIDATION ======
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');

    let valid = true;
    emailError.textContent = '';
    passwordError.textContent = '';

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
      loginForm.reset();
        window.location.href = "admin-dashboard.html";
    }
});

// ====== SIGNUP FORM VALIDATION ======
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signupName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');

    const nameError = document.getElementById('signupNameError');
    const emailError = document.getElementById('signupEmailError');
    const passwordError = document.getElementById('signupPasswordError');

    let valid = true;
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    const namePattern = /^[A-Za-z\s]+$/;

    if (name.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        valid = false;
    } else if (!namePattern.test(name.value.trim())) {
        nameError.textContent = 'Name can only contain alphabets.';
        valid = false;

    }

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
        alert("Admin account created successfully!");
        signupForm.reset();
        window.location.href = "admin-dashboard.html";
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
    });
});



