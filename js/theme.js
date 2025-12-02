// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the current theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'light' 
        : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Skills Animation
const skillItems = document.querySelectorAll('.skill-item');

// Intersection Observer for skill animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const progress = skillItem.querySelector('.progress');
            const percentage = skillItem.querySelector('.percentage').textContent;
            
            // Set the progress width through CSS variable
            progress.style.setProperty('--progress-width', percentage);
            skillItem.classList.add('animate');
            
            // Unobserve after animation
            observer.unobserve(skillItem);
        }
    });
}, {
    threshold: 0.5
});

// Observe all skill items
skillItems.forEach(item => observer.observe(item));