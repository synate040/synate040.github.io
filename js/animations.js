// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navLinkItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form validation and submission feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form submission)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
        contactForm.appendChild(successMessage);

        // Reset form and button
        contactForm.reset();
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

// Intersection Observer setup for various animated elements
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skill-progress')) {
                const percentage = entry.target.getAttribute('data-progress');
                entry.target.style.setProperty('--progress-width', `${percentage}%`);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.section-title, .projects-grid, .staggered-list li, .skill-progress, .hobby-card, .cert-card'
);
animatedElements.forEach(element => {
    animationObserver.observe(element);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Staggered list animation delay
document.querySelectorAll('.staggered-list li').forEach((item, index) => {
    item.style.animationDelay = `${index * 100}ms`;
});

// Parallax effect for hero section
const heroParallax = document.querySelector('.hero-parallax');
if (heroParallax) {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.pageYOffset;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                heroParallax.style.transform = `translateY(${lastScrollY * 0.5}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Theme toggle animation with transition
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        document.body.classList.toggle('dark-theme');
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// Animate skill progress bars
function animateSkills() {
    const progressBars = document.querySelectorAll('.skill-category .progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.setProperty('--progress-width', width);
                progressBar.style.width = '0';
                requestAnimationFrame(() => {
                    progressBar.style.width = width;
                });
            }
        });
    }, {
        threshold: 0.1
    });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Skills animation
const skillBars = document.querySelectorAll('.progress');
const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));