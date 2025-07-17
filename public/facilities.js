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

