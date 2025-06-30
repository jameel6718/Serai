// JavaScript for additional interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to footer links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.footer-container > div').forEach((section, index) => {
        section.style.opacity = 0;
        section.style.transform = `translateY(${20 * (index + 1)}px)`;
        section.style.transition = `opacity 0.5s ${index * 0.1}s ease, transform 0.5s ${index * 0.1}s ease`;
        observer.observe(section);
    });
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});