const canvas = document.getElementById('sandCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const particlesPerPart = 29000;
const numberOfParticles = particlesPerPart * 3;

// Define an array of 10 predefined colors
const colors = [
    'rgb(252, 43, 43)',    // Red
    'rgb(43, 252, 43)',    // Green
    'rgb(43, 43, 252)',    // Blue
    'rgb(252, 252, 43)',   // Yellow
    'rgb(252, 43, 252)',  // Magenta
    'rgb(43, 252, 252)',   // Cyan
    'rgb(128, 43, 252)',   // Purple
    'rgb(252, 128, 43)',   // Orange
    'rgb(43, 128, 252)',   // Light Blue
    'rgb(128, 252, 43)'    // Lime Green
];

class Particle {
    constructor(x, y) {
        this.originalX = x;
        this.originalY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        // Randomly select a color from the predefined array
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.velocity = { x: 0, y: 0 };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
            const force = 20;
            const angle = Math.atan2(dy, dx);
            this.velocity.x = -Math.cos(angle) * force;
            this.velocity.y = -Math.sin(angle) * force;
        }

        this.velocity.x *= 0.95;
        this.velocity.y *= 0.95;
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        const returnSpeed = 0.1;
        this.x += (this.originalX - this.x) * returnSpeed;
        this.y += (this.originalY - this.y) * returnSpeed;
    }
}

function init() {
    particlesArray.length = 0;
    const gridSize = 10;
    const cols = Math.floor(canvas.width / gridSize);
    const thirdHeight = canvas.height / 3;
    const rows = Math.floor(thirdHeight / gridSize);

    for (let i = 0; i < particlesPerPart; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols) * rows;
        const x = col * gridSize + (Math.random() - 0.5) * gridSize;
        const y = row * gridSize + (Math.random() - 0.5) * gridSize;
        particlesArray.push(new Particle(x, y));
    }

    for (let i = 0; i < particlesPerPart; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * gridSize + (Math.random() - 0.5) * gridSize;
        const y = thirdHeight + row * gridSize + (Math.random() - 0.5) * gridSize;
        particlesArray.push(new Particle(x, y));
    }

    for (let i = 0; i < particlesPerPart; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * gridSize + (Math.random() - 0.5) * gridSize;
        const y = 2 * thirdHeight + row * gridSize + (Math.random() - 0.5) * gridSize;
        particlesArray.push(new Particle(x, y));
    }
}

let mouseX = -1000;
let mouseY = -1000;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update(mouseX, mouseY);
        particle.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    // Update hover effect dynamically
    const hoverMask = document.querySelector('.hover-mask');
    hoverMask.style.background = `radial-gradient(circle 100px at ${mouseX}px ${mouseY}px, rgba(255,255,255,1), rgba(0,0,0,0.1), rgba(0,0,0,0.05), rgba(0,0,0,0))`;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

const matterImage = document.getElementById('matterImage');
let currentImageIndex = 1; // Start with the first image
const totalImages = 6; // Total number of images

// Function to update the image source
function updateImage() {
  currentImageIndex = (currentImageIndex % totalImages) + 1; // Cycle through images 1 to 6
  matterImage.src = `image${currentImageIndex}.png`; // Update the image source
}

// Add an event listener for when the image disappears (opacity becomes 0)
matterImage.addEventListener('transitionend', (event) => {
  if (event.propertyName === 'opacity' && matterImage.style.opacity === '0') {
    updateImage(); // Change to the next image
  }
});


init();
animate();
