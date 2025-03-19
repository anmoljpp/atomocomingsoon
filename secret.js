const pressed = [];
const secretCode = 'y';
const p = document.querySelector('p');
const timeTravelEffect = document.getElementById('time-travel-effect');
const comingSoon = document.getElementById('coming-soon');

window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
        console.log('Correct!');
        p.innerHTML = 'You entered the secret code!';

        // Show time travel effect
        timeTravelEffect.style.display = 'block';

        // Create the css-doodle element
        const doodle = document.createElement('css-doodle');
        doodle.innerHTML = `
    :doodle {
        @grid: 900x2 / 90vmin;
    }
    :container {
        perspective: 30vmin; /* Increased perspective for more 3D depth */
    }

    @place-cell: center;
    @size: @r(0.001%, 0.9%); /* Randomize particle size for variation */

    will-change: transform, opacity;
    transform-style: preserve-3d;

    /* More vibrant colors with a glowing effect */
    background: linear-gradient(
        @r(360deg),
        @multi(3, @p(#ff00ff, #00ff00, #00b8a9, #f6416c, #ffde7d, #ffffff)),
        transparent @r(30%, 70%)
    );
    box-shadow: 0 0 10px @p(#ff00ff, #00ff00, #00b8a9, #f6416c, #ffde7d, #ffffff); /* Add glow */

    animation: move @r(0.5s, 1.5s, .1) linear infinite; /* Faster animation */
    animation-delay: -@r(0s, 1s); /* Tighter delay range for more overlap */

    --trans:
        translateZ(@r(-50vmin, 50vmin)) /* Add Z-axis motion for depth */
        rotateX(@r(-360deg, 360deg))
        rotateY(@r(-360deg, 360deg))
        rotateZ(@r(-360deg, 360deg));

    transform-origin: center;
    transform: var(--trans) scale(1);
    opacity: 0;

    @keyframes move {
        70% { opacity: 1; } /* Faster opacity ramp-up */
        10% { 
            transform: var(--trans) translateZ(@r(-100vmin, 100vmin)) scale(@r(0, 3)); 
            opacity: 70; 
        }
    }
        `;

        timeTravelEffect.appendChild(doodle);

        // After 4 seconds, hide the time travel effect and show the "Coming Soon" page
        setTimeout(() => {
            timeTravelEffect.style.display = 'none';
            window.location.href = 'index.html'; // Redirect to index.html
        }, 4000); // 4 seconds
    }
    console.log(pressed);
});