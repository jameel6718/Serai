const form = document.getElementById('feedbackForm');
const reviewsContainer = document.getElementById('reviewsContainer');
const successMessage = document.getElementById('successMessage');
let reviews = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value.trim();

    // Get error message elements
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

    // Rating Validation
    if (rating === '') {
        ratingError.textContent = 'Please select a rating.';
        valid = false;
    }

    // Comments Validation
    if (comments === '') {
        commentsError.textContent = 'Please write your feedback.';
        valid = false;
    }

    if (!valid) {
        return;
    }

    // Send data to Node API
    const feedbackData = {
        name: name,
        email: email,
        rating: rating,
        comments: comments,
    };

    fetch("http://localhost:3000/addFeedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(feedbackData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
            return response.json();
        })
    .then((data) => {
        console.log("Server response:", data);

        // Add new review to the list on successful API call
        const newReview = {
            name: name,
            rating: rating,
            comments: comments,
        };

        reviews.unshift(newReview);
        if (reviews.length > 3) {
            reviews = reviews.slice(0, 3);
        }

        displayReviews();

        // Reset form
        form.reset();

        // Show success message
        successMessage.textContent = "Thank you for your feedback!";
        successMessage.style.display = "block";
        setTimeout(() => {
        successMessage.style.display = "none";
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

// Clear error message when user focuses on a field
document.getElementById('name').addEventListener('focus', function () {
    document.getElementById('nameError').textContent = '';
});

document.getElementById('email').addEventListener('focus', function () {
    document.getElementById('emailError').textContent = '';
});

document.getElementById('rating').addEventListener('focus', function () {
    document.getElementById('ratingError').textContent = '';
});

document.getElementById('comments').addEventListener('focus', function () {
    document.getElementById('commentsError').textContent = '';
});

