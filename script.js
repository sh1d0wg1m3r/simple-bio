function updateLastUpdated() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = formattedDate;
    }
}

const canvas = document.getElementById('snow-canvas');
let ctx; // Declare ctx, will be assigned after canvas check
let snowflakes = [];

function setupCanvas() {
    if (!canvas) return; // Do nothing if canvas element isn't found
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (!ctx) { // Assign context only if not already assigned
        ctx = canvas.getContext('2d');
    }
}

class Snowflake {
    constructor() {
        // Ensure canvas is present and has dimensions before using them
        this.canvasWidth = canvas ? canvas.width : window.innerWidth;
        this.canvasHeight = canvas ? canvas.height : window.innerHeight;

        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight; // Start some on screen
        this.radius = Math.random() * 1 + 1.5; // Effectively font size for char
        this.speed = Math.random() * 0.5 + 0.2; // Slow fall
        this.char = Math.random() < 0.5 ? '0' : '1';
        this.color = 'rgba(0, 255, 0, 0.3)'; // Dim green
        this.font = '10px monospace'; // Small monospace font for 0s and 1s
    }

    draw() {
        if (!ctx) return; // Don't draw if context is not available
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.char, this.x, this.y);
    }

    update() {
        this.y += this.speed;
        // Update canvasHeight for comparison in case of resize
        this.canvasHeight = canvas ? canvas.height : window.innerHeight;
        if (this.y > this.canvasHeight) {
            this.y = 0 - this.radius * 2; // Reset above screen
            this.canvasWidth = canvas ? canvas.width : window.innerWidth;
            this.x = Math.random() * this.canvasWidth;
            this.char = Math.random() < 0.5 ? '0' : '1';
        }
    }
}

function initSnowflakes() {
    if (!canvas) return; // Do nothing if canvas element isn't found
    snowflakes = [];
    const numberOfSnowflakes = 100; // Adjust density
    for (let i = 0; i < numberOfSnowflakes; i++) {
        snowflakes.push(new Snowflake());
    }
}

function animateSnow() {
    if (!ctx || !canvas) return; // Don't animate if context or canvas is not available
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
    });
    requestAnimationFrame(animateSnow);
}

window.addEventListener('resize', () => {
    if (canvas) { // Only if canvas exists
      setupCanvas();
      initSnowflakes(); // Re-initialize on resize to adjust density/positions
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdated(); // Keep this

    // Check if canvas exists before trying to use it
    if (canvas) {
        setupCanvas();
        initSnowflakes();
        animateSnow();
    } else {
        console.warn("Snow canvas with ID 'snow-canvas' not found. Snow effect will not run.");
    }
});
