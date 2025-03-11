// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const indicatorsContainer = document.getElementById('carouselIndicators');
// JavaScript for menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });
});
// Menu Toggle
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
    }
});

// Carousel Functionality
let slideIndex = 0;
const totalSlides = slides.length;

// Create indicators
for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => showSlide(i));
    indicatorsContainer.appendChild(indicator);
}

// Update indicators
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Show specific slide
function showSlide(index) {
    if (index < 0) {
        slideIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        slideIndex = 0;
    } else {
        slideIndex = index;
    }
    
    carousel.style.transform = `translateX(-${slideIndex * 100}%)`;
    updateIndicators();
    resetAutoSlide();
}

// Next/Previous buttons
nextBtn.addEventListener('click', () => {
    showSlide(slideIndex + 1);
});

prevBtn.addEventListener('click', () => {
    showSlide(slideIndex - 1);
});

// Auto slide functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showSlide(slideIndex + 1);
    }, 6000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start auto slide
startAutoSlide();

// Chat Widget Functionality
chatToggle.addEventListener('click', () => {
    chatContainer.style.display = chatContainer.style.display === 'none' || chatContainer.style.display === '' ? 'flex' : 'none';
});

chatClose.addEventListener('click', () => {
    chatContainer.style.display = 'none';
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add animations on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.featured-product, .product-img, .product-info');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

// Add animation classes to CSS
document.addEventListener('DOMContentLoaded', () => {
    // Add animations to featured product sections
    const style = document.createElement('style');
    style.textContent = `
        .featured-product, .product-img, .product-info {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .featured-product.animate, .product-img.animate, .product-info.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Initial check for elements in view
    animateOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Mobile navigation improvements
if (window.innerWidth < 768) {
    const menuItems = document.querySelectorAll('.menu ul li a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}

// Add touch support for carousel
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Swipe left
        showSlide(slideIndex + 1);
    } else if (touchEndX > touchStartX) {
        // Swipe right
        showSlide(slideIndex - 1);
    }
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showSlide(slideIndex - 1);
    } else if (e.key === 'ArrowRight') {
        showSlide(slideIndex + 1);
    }
});

// Preload images for smooth transitions
window.addEventListener('load', () => {
    const imageUrls = [
        'https://res.cloudinary.com/dloaaxni6/image/upload/v1741393151/p1_m5dll7.jpg',
        'https://res.cloudinary.com/dloaaxni6/image/upload/v1741393151/s1_vuqf6b.jpg',
        'https://res.cloudinary.com/dloaaxni6/image/upload/v1741393151/i1_e0uqt8.jpg',
        'https://res.cloudinary.com/dloaaxni6/image/upload/c_pad,b_gen_fill,w_400,h_400/v1740937629/Screenshot_1_ctekec.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});

// Pause auto-slide when user hovers over carousel
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carousel.addEventListener('mouseleave', () => {
    startAutoSlide();
});
