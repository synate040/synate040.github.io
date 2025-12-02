// Skill Animations
const observeSkills = () => {
    const skillBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
};

// Scroll to Top Button
const setupScrollToTop = () => {
    const scrollBtn = document.getElementById('scroll-top');
    
    const toggleScrollButton = () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleScrollButton);
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Form Validation and Feedback
const setupContactForm = () => {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    
    if (!form) return;

    const validateField = (field) => {
        const errorElement = document.getElementById(`${field.id}-error`);
        let isValid = true;

        if (!field.value.trim()) {
            showError(errorElement, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showError(errorElement, 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
    };

    const showError = (element, message) => {
        element.textContent = message;
        element.classList.add('visible');
    };

    const hideError = (element) => {
        element.textContent = '';
        element.classList.remove('visible');
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showFeedback = (message, type) => {
        feedback.textContent = message;
        feedback.className = `form-feedback ${type} visible`;
        setTimeout(() => {
            feedback.classList.remove('visible');
        }, 5000);
    };

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fields = ['name', 'email', 'message'];
        let isValid = true;

        // Validate all fields
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnSpinner = submitBtn.querySelector('.btn-spinner');
        
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        btnSpinner.classList.add('visible');

        try {
            // Simulate form submission (replace with actual form submission)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showFeedback('Message sent successfully! I will get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            showFeedback('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            btnSpinner.classList.remove('visible');
        }
    });

    // Clear errors on input
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        field.addEventListener('input', () => {
            hideError(errorElement);
        });
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    observeSkills();
    setupScrollToTop();
    setupContactForm();
});