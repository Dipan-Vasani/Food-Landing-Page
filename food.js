document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll for navigation with fade-in effect
const navLinks = document.querySelectorAll('.navbar ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Smooth scroll
        window.scrollTo({
            top: targetElement.offsetTop - 50, // Adjust for navbar height
            behavior: 'smooth'
        });

        // Fade-in effect for the section
        targetElement.classList.add('fade-in-section');
    });
});

// Testimonial Slider Animation
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-dots .dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Fade out the previous slide
    slides.forEach((slide) => {
        slide.classList.remove('fade-in');
        slide.classList.add('fade-out');
    });

    // Remove active dot class
    dots.forEach((dot) => dot.classList.remove('active'));

    // Show the current slide with fade-in
    slides[index].classList.remove('fade-out');
    slides[index].classList.add('fade-in');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Loop back to 0
    showSlide(currentSlide);
}

// Automatically move to the next slide every 5 seconds
setInterval(nextSlide, 5000);

// Initialize first slide
showSlide(currentSlide);

// Dot navigation for testimonials
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

});