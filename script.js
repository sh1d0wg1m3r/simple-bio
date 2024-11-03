const bioText = `[SYSTEM] Initializing bio sequence...
[LOADING] Neural patterns detected...

> IDENTITY: s1d0w (Svetozar)
> STATUS: Alive and Coding
> LOCATION: Bulgaria, near Sofia
> OCCUPATION: Student @ VHSE John Atanasov

CORE INTERESTS:
-------------
* Linux Systems Administration
* Artificial Intelligence Research
* Ethical Hacking & Security
* Hardware Modifications
* Anti-Scam Operations

CURRENT OBJECTIVES:
-----------------
* Mastering Java Programming
* System Architecture Understanding
* Neural Network Experimentation
* Open Source Contributions

PERSONAL SPECS:
-------------
* OS: Linux (Various Distributions)
* Music: Phonk
* Movies: Sci-Fi
* Status: Constantly Learning

[SYSTEM] Bio sequence completed.
[READY] Awaiting further instructions...`;

const asciiArt = `
    ███████╗░░███╗░░██████╗░░█████╗░░██╗░░░░░░░██╗
    ██╔════╝░████║░░██╔══██╗██╔══██╗░██║░░██╗░░██║
    ╚█████╗░██╔██║░░██║░░██║██║░░██║░╚██╗████╗██╔╝
    ░╚═══██╗╚═╝██║░░██║░░██║██║░░██║░░████╔═████║░
    ███████║███████╗██████╔╝╚█████╔╝░░╚██╔╝░╚██╔╝░
    ╚══════╝╚══════╝╚═════╝░░╚════╝░░░░╚═╝░░░╚═╝░░
`;

document.getElementById('neural-ascii').textContent = asciiArt;

async function typeWriter(text, element, speed = 50) {
    let i = 0;
    while(i < text.length) {
        await new Promise(resolve => setTimeout(resolve, speed));
        element.textContent += text.charAt(i);
        i++;
    }
}

window.onload = () => {
    const bioElement = document.getElementById('bio-text');
    typeWriter(bioText, bioElement);
};

// Add some matrix-like background effects
function createNeuralBackground() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('neural-bg');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const neurons = [];
    for(let i = 0; i < 50; i++) {
        neurons.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            connections: []
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
        
        neurons.forEach(neuron => {
            neurons.forEach(other => {
                if(neuron !== other) {
                    const distance = Math.hypot(neuron.x - other.x, neuron.y - other.y);
                    if(distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(neuron.x, neuron.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}

createNeuralBackground();
