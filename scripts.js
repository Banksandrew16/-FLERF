// Select the contract address input element
const contractAddressInput = document.getElementById('contract-address');

// Add a click event listener to the contract address input
contractAddressInput.addEventListener('click', function () {
    // Select the contract address input text
    this.select();
    // Copy the selected text to clipboard
    document.execCommand('copy');
    // Inform the user that the address has been copied
    alert('Contract Address copied to clipboard!');
});


const canvas = document.getElementById('snowfallCanvas');
const ctx = canvas.getContext('2d');
const snowflakeImage = new Image();
snowflakeImage.src = 'assets/images/logo.png'; // Adjust the path to your image

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width; // Random x position within canvas width
        this.y = Math.random() * -canvas.height; // Start above the canvas
        this.size = Math.random() * 30 + 20; // Random size between 20 and 50
        this.speedY = Math.random() * 0.3 + 0.3; // Random vertical speed between 0.3 and 0.6
        this.speedX = Math.random() * 0.2 - 0.1; // Random horizontal speed between -0.1 and 0.1
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Reset snowflake position if it goes off-screen
        if (this.y > canvas.height) {
            this.y = Math.random() * -canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.drawImage(snowflakeImage, this.x, this.y, this.size, this.size);
    }
}

function createSnowflakes() {
    for (let i = 0; i < 20; i++) { // Reduced the number of snowflakes for lighter snowfall
        snowflakes.push(new Snowflake());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
        snowflake.update();
        snowflake.draw();
    });

    requestAnimationFrame(animate);
}

snowflakeImage.onload = function() {
    createSnowflakes();
    animate();
};
