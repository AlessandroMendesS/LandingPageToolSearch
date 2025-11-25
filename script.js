// Navbar functionality
let mobileMenuOpen = false;

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const mobileMenu = document.getElementById('navbarMobile');
    const toggleIcon = document.querySelector('#navbarToggle i');

    if (mobileMenuOpen) {
        mobileMenu.style.display = 'block';
        toggleIcon.setAttribute('data-feather', 'x');
        feather.replace();
    } else {
        mobileMenu.style.display = 'none';
        toggleIcon.setAttribute('data-feather', 'menu');
        feather.replace();
    }
}

// Smooth scroll to section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        mobileMenuOpen = false;
        document.getElementById('navbarMobile').style.display = 'none';
        const toggleIcon = document.querySelector('#navbarToggle i');
        toggleIcon.setAttribute('data-feather', 'menu');
        feather.replace();
    }
}

// Active section tracking
let activeSection = 'hero';

function updateActiveSection() {
    const sections = ['hero', 'problema', 'solucao', 'funcionalidades', 'tecnologias', 'sobre', 'timeline', 'cta'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                if (activeSection !== section) {
                    activeSection = section;
                    updateNavbarActive();
                }
                break;
            }
        }
    }
}

function updateNavbarActive() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Handle delay attributes
            const delay = entry.target.getAttribute('data-delay');
            if (delay) {
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Observe fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up, .fade-in-scale');
    fadeElements.forEach(el => observer.observe(el));

    // Initialize Feather icons
    feather.replace();
    
    // Re-initialize icons after a delay to ensure all are loaded
    setTimeout(() => {
        feather.replace();
    }, 500);

    // Initialize funcionalidades carousel
    initFuncionalidadesCarousel();

    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        updateActiveSection();
    });

    // Initial active section update
    updateActiveSection();
});

// Button hover effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('mousedown', function () {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', function () {
            this.style.transform = 'scale(1.05)';
        });
    });
});

// Card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.problema-card, .solucao-card, .funcionalidade-card, .equipe-card, .timeline-content');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navbarToggle');
    const mobileMenu = document.getElementById('navbarMobile');

    if (mobileMenuOpen && !navbar.contains(e.target)) {
        mobileMenuOpen = false;
        mobileMenu.style.display = 'none';
        const toggleIcon = toggle.querySelector('i');
        toggleIcon.setAttribute('data-feather', 'menu');
        feather.replace();
    }
});

// Prevent default on anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal animations with stagger
function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.problema-grid, .solucao-features, .funcionalidades-grid');

    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transition = `all 0.5s ease ${index * 0.1}s`;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        if (entry.target.classList.contains('fade-in-up')) {
                            entry.target.style.transform = 'translateY(0)';
                        } else if (entry.target.classList.contains('fade-in-scale')) {
                            entry.target.style.transform = 'scale(1)';
                        }
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(child);
        });
    });
}

// Initialize stagger animations
document.addEventListener('DOMContentLoaded', initStaggerAnimations);

// Add parallax effect to hero phone
window.addEventListener('scroll', () => {
    const heroPhone = document.querySelector('.phone-float');
    if (heroPhone) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroPhone.style.transform = `translateY(${rate}px)`;
    }
});

// Reset parallax on hero section
const heroSection = document.getElementById('hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                const heroPhone = document.querySelector('.phone-float');
                if (heroPhone) {
                    heroPhone.style.transform = 'translateY(0)';
                }
            }
        });
    }, { threshold: 0 });

    heroObserver.observe(heroSection);
}

// Funcionalidades Carousel
function initFuncionalidadesCarousel() {
    const carousel = document.getElementById('funcionalidadesCarousel');
    const indicatorsContainer = document.getElementById('funcionalidadesIndicators');
    
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.funcionalidade-slide');
    let currentSlide = 0;
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator' + (index === 0 ? ' active' : '');
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto-advance carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }, 3000);
}


