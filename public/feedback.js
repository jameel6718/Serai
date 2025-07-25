const form = document.getElementById('feedbackForm');
const reviewsContainer = document.getElementById('reviewsContainer');
const successMessage = document.getElementById('successMessage');
let reviews = [];

// 🟢 Submit form handler
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value.trim();

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const ratingError = document.getElementById('ratingError');
    const commentsError = document.getElementById('commentsError');

    // Clear previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    ratingError.textContent = '';
    commentsError.textContent = '';
    successMessage.textContent = '';

    let valid = true;

    // Validation rules
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (rating === '') {
        ratingError.textContent = 'Please select a rating.';
        valid = false;
    }

    if (comments === '') {
        commentsError.textContent = 'Please write your feedback.';
        valid = false;
    }

    if (!valid) return;

    const feedbackData = {
        name: name,
        email: email,
        rating: rating,
        message: comments // match schema
    };

    // ✅ POST to backend
    fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
    })
    .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();
    })
    .then((data) => {
        // Update review list with new review
        const newReview = {
            name: name,
            rating: rating,
            comments: comments,
        };
        reviews.unshift(newReview);
        if (reviews.length > 3) reviews = reviews.slice(0, 3);

        displayReviews();
        form.reset();
        successMessage.textContent = "Thank you for your feedback!";
        successMessage.style.display = "block";
        setTimeout(() => { successMessage.style.display = "none"; }, 2000);
        document.getElementById('reviewsContainer').scrollIntoView({ behavior: 'smooth' });
    })
    .catch((error) => {
        console.error("Error:", error);
        successMessage.textContent = "Something went wrong. Please try again.";
        successMessage.style.display = "block";
        setTimeout(() => { successMessage.style.display = "none"; }, 2000);
    });
});

// 🟢 Display reviews from array
function displayReviews() {
    reviewsContainer.innerHTML = '';
    reviews.forEach(review => {
        reviewsContainer.innerHTML += `
            <div class="review">
                <strong>${review.name}</strong> (Rating: ${review.rating}/5)
                <p>${review.comments}</p>
            </div>
        `;
    });
}

// 🔄 Load reviews on page load
window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/feedback')
        .then((res) => res.json())
        .then((data) => {
            reviews = data.map(review => ({
                name: review.name,
                rating: review.rating,
                comments: review.message // match backend schema
            }));
            displayReviews();
        })
        .catch((err) => {
            console.error('Failed to load reviews:', err);
        });
});


// 🟢 Clear errors on focus
['name', 'email', 'rating', 'comments'].forEach(field => {
    document.getElementById(field).addEventListener('focus', function () {
        document.getElementById(field + 'Error').textContent = '';
    });
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

