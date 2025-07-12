const form = document.getElementById('feedbackForm');
const reviewsContainer = document.getElementById('reviewsContainer');
const successMessage = document.getElementById('successMessage');

// Submit handler
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

    // Validation
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
        nameError.textContent = 'Please enter your name.';
        valid = false;
    } else if (!namePattern.test(name)) {
        nameError.textContent = 'Name can only contain alphabets.';
        valid = false;
    }

    if (!email) {
        emailError.textContent = 'Please enter your email.';
        valid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
    }

    if (!rating) {
        ratingError.textContent = 'Please select a rating.';
        valid = false;
    }

    if (!comments) {
        commentsError.textContent = 'Please write your feedback.';
        valid = false;
    }

    if (!valid) return;

    // Submit data to server
    fetch('/addFeedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, rating, comments })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }

        form.reset();
        successMessage.textContent = 'Thank you for your feedback!';
        successMessage.style.display = 'block';
        fetchReviews(); // refresh review list
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 2000);
    })
    .catch(err => {
        console.error("Error submitting feedback:", err);
    });
});

// Load latest reviews from server
function fetchReviews() {
    fetch('/getFeedback')
        .then(res => res.json())
        .then(data => {
            reviewsContainer.innerHTML = '';
            data.forEach(review => {
                reviewsContainer.innerHTML += `
                    <div class="review">
                        <strong>${review.name}</strong> (Rating: ${review.rating}/5)
                        <p>${review.comments}</p>
                    </div>
                `;
            });
        })
        .catch(err => {
            console.error("Error loading reviews:", err);
        });
}

// Clear error messages on focus
['name', 'email', 'rating', 'comments'].forEach(id => {
    document.getElementById(id).addEventListener('focus', () => {
        document.getElementById(id + 'Error').textContent = '';
    });
});

// Load initial reviews
window.addEventListener('DOMContentLoaded', fetchReviews);
