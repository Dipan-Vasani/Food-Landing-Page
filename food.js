document.addEventListener('DOMContentLoaded', function() {
    // --- Navigation Scroll ---
    const navLinks = document.querySelectorAll('.navbar ul li a');
    const navbar = document.querySelector('.navbar'); 

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');

                navbar.classList.remove('open');
            }
        });
    });

   // --- Animation on Scroll (Animate on Every Scroll) ---
   const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.2 
});

const hiddenElements = document.querySelectorAll('.hero-content, .hero-image, .special-dish-section > *, .healthy-food-section > *, .banner__container > *, .chef-section > *, #client-testimonials > *, #footer-container > *');
hiddenElements.forEach((el) => {
    el.classList.add('hidden'); 
    observer.observe(el);
});

    // --- Testimonial Slider ---
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-navigation .dot');
    let currentIndex = 0;
    let autoSlideInterval;
    const slideIntervalTime = 5000; 

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            stopAutoSlide(); 
            startAutoSlide(); 
        });
    });


    let touchStartX = 0;
    testimonialSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoSlide();
    });

    testimonialSlider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;
        const threshold = 50; 

        if (swipeDistance > threshold) {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        } else if (swipeDistance < -threshold) {
            nextSlide();
        }
        startAutoSlide();
    });

    showSlide(currentIndex);
    startAutoSlide(); 


    function highlightNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.navbar ul li a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); 
});