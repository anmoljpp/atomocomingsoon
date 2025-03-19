const canvas = document.getElementById('sandCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const particlesPerPart = 4000; // Reduced to 20,000 particles
const numberOfParticles = particlesPerPart;

// Define an array of glitter colors (bright and shiny)
const colors = [
    'rgba(255, 223, 0, 1)',     // Gold (unchanged)
    'rgba(255, 235, 150, 1)',   // Light Gold
    'rgba(255, 215, 0, 1)',     // Golden Yellow
    'rgba(255, 240, 200, 1)',  // Pale Gold
    'rgba(255, 200, 0, 1)',     // Orange Gold
    'rgba(255, 225, 50, 1)',   // Bright Gold
    'rgba(255, 210, 100, 1)',  // Soft Gold
    'rgba(255, 220, 130, 1)',  // Warm Gold
    'rgba(255, 230, 160, 1)',  // Muted Gold
    'rgba(255, 190, 0, 1)'     // Deep Gold
];

class Particle {
    constructor(x, y) {
        this.originalX = x;
        this.originalY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // Random size for glitter effect
        this.color = colors[Math.floor(Math.random() * colors.length)]; // Random glitter color
        this.velocity = { x: 0, y: 0 };
        this.angle = Math.random() * Math.PI * 2; // Random initial rotation angle
        this.sparkleSpeed = Math.random() * 0.05 + 0.01; // Speed of sparkling
        this.brightness = Math.random(); // Random initial brightness
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle); // Rotate the particle
        ctx.fillStyle = `rgba(255, 223, 0, ${this.brightness})`; // Dynamic brightness
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size); // Use fillRect for faster rendering
        ctx.restore();
    }

    update(mouseX, mouseY) {
        // Calculate distance from mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply force if mouse is near
        if (distance < 60) { // Reduced radius from 120 to 60
            const force = 40;
            const angle = Math.atan2(dy, dx);
            this.velocity.x = -Math.cos(angle) * force;
            this.velocity.y = -Math.sin(angle) * force;
        }

        // Slow down velocity over time
        this.velocity.x *= 0.95;
        this.velocity.y *= 0.95;
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Return to original position smoothly
        const returnSpeed = 0.19;
        this.x += (this.originalX - this.x) * returnSpeed;
        this.y += (this.originalY - this.y) * returnSpeed;

        // Add sparkling effect
        this.angle += this.sparkleSpeed; // Rotate the particle
        this.brightness = 0.5 + Math.sin(this.angle) * 0.5; // Vary brightness
    }
}

function init() {
    particlesArray.length = 1; // Clear existing particles
    const gridSize = 100; // Size of each grid cell
    const cols = Math.floor(canvas.width / gridSize); // Number of columns
    const rows = Math.floor(canvas.height / gridSize); // Number of rows

    // Distribute particles evenly across the entire canvas
    for (let i = 0; i < numberOfParticles; i++) {
        const col = i % cols; // Column index
        const row = Math.floor(i / cols) % rows; // Row index
        const x = col * gridSize + (Math.random() - 0.5) * gridSize; // Random x position
        const y = row * gridSize + (Math.random() - 0.5) * gridSize; // Random y position
        particlesArray.push(new Particle(x, y)); // Add particle to the array
    }

    for (let i = 0; i < numberOfParticles; i++) {
        const col = i % cols; // Column index
        const row = Math.floor(i / cols) % rows; // Row index
        const x = col * gridSize + (Math.random() - 0.5) * gridSize; // Random x position
        const y = row * gridSize + (Math.random() - 0.5) * gridSize; // Random y position
        particlesArray.push(new Particle(x, y)); // Add particle to the array
    }

    for (let i = 0; i < numberOfParticles; i++) {
        const col = i % cols; // Column index
        const row = Math.floor(i / cols) % rows; // Row index
        const x = col * gridSize + (Math.random() - 0.5) * gridSize; // Random x position
        const y = row * gridSize + (Math.random() - 0.5) * gridSize; // Random y position
        particlesArray.push(new Particle(x, y)); // Add particle to the array
    }

    for (let i = 0; i < numberOfParticles; i++) {
        const col = i % cols; // Column index
        const row = Math.floor(i / cols) % rows; // Row index
        const x = col * gridSize + (Math.random() - 0.5) * gridSize; // Random x position
        const y = row * gridSize + (Math.random() - 0.5) * gridSize; // Random y position
        particlesArray.push(new Particle(x, y)); // Add particle to the array
    }
}

let mouseX = -1000;
let mouseY = -1000;
const mouseTrail = []; // Array to store the cursor's path

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update particles based on the cursor's path
    mouseTrail.forEach((trailPos) => {
        particlesArray.forEach(particle => {
            particle.update(trailPos.x, trailPos.y);
        });
    });

    // Draw particles
    particlesArray.forEach(particle => {
        particle.draw();
    });

    // Remove old trail positions to keep the trail smooth and short
    if (mouseTrail.length > 1) { // Reduced trail length from 10 to 5
        mouseTrail.shift();
    }

    // Fill blank space when the pointer is still
    if (mouseTrail.length > 0) {
        const lastPos = mouseTrail[mouseTrail.length - 1];
        particlesArray.forEach(particle => {
            particle.update(lastPos.x, lastPos.y);
        });
    }

    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    // Add the current cursor position to the trail
    mouseTrail.push({ x: mouseX, y: mouseY });

    // Update hover effect dynamically
    const hoverMask = document.querySelector('.hover-mask');
    hoverMask.style.background = `radial-gradient(circle 100px at ${mouseX}px ${mouseY}px, rgba(255,255,255,1), rgba(0,0,0,0.1), rgba(0,0,0,0.05), rgba(0,0,0,0))`;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();