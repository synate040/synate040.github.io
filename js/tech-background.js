// Create tech background effects
function initTechBackground() {
    createCircuitLines();
    createParticles();
    createBinaryRain();
}

// Create circuit lines
function createCircuitLines() {
    const circuit = document.querySelector('.tech-circuit');
    const numLines = 15;

    for (let i = 0; i < numLines; i++) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        
        // Random position and size
        const width = Math.random() * 100 + 50;
        const height = Math.random() * 2 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        line.style.width = `${width}px`;
        line.style.height = `${height}px`;
        line.style.top = `${top}%`;
        line.style.left = `${left}%`;
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        circuit.appendChild(line);
    }
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.tech-particles');
    const numParticles = 30;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * -8;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.top = `${top}%`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Create binary rain effect
function createBinaryRain() {
    const rainContainer = document.querySelector('.binary-rain');
    const numColumns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div');
        column.className = 'binary-column';
        
        // Create binary string
        const binaryString = Array.from({length: 20}, () => 
            Math.random() > 0.5 ? '1' : '0'
        ).join('\n');
        
        column.textContent = binaryString;
        column.style.left = `${i * 20}px`;
        column.style.animationDuration = `${Math.random() * 2 + 3}s`;
        column.style.animationDelay = `${Math.random() * -2}s`;
        
        rainContainer.appendChild(column);
    }
}

// Parallax effect for tech background
function updateParallax() {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.tech-background');
    const particles = document.querySelectorAll('.particle');
    
    background.style.transform = `translateY(${scrolled * 0.3}px)`;
    particles.forEach(particle => {
        const speed = parseFloat(particle.style.width) / 6;
        particle.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
}

// Initialize everything when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTechBackground();
    window.addEventListener('scroll', updateParallax);
});

// Update binary rain on window resize
window.addEventListener('resize', () => {
    const rainContainer = document.querySelector('.binary-rain');
    rainContainer.innerHTML = '';
    createBinaryRain();
});