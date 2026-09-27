/*
  Source: https://www.geeksforgeeks.org/javascript/design-a-running-car-animation-using-html-and-css/
*/

// Create a single car with multiple parameters
const createCar = (laneIndex, startPosition, speed, color, carId) => {
    const carsContainer = document.getElementById('cars-container');
    const car = document.createElement('div');
    car.className = 'car';
    car.id = `car-${carId}`;
    
    // Set color
    car.style.background = color;
    
    // Set lane position
    const trackHeight = carsContainer.offsetHeight;
    const laneHeight = trackHeight / 3; // 3 lanes
    const laneY = laneIndex * laneHeight + (laneHeight / 2 - 25); // Center car in lane
    car.style.top = laneY + 'px';
    
    // Create animation with custom duration based on speed
    const duration = 15 / speed; // Inverse relationship: higher speed = faster
    car.style.animation = `carDrive ${duration}s linear infinite`;
    
    // Set initial position
    car.style.left = startPosition + 'px';
    
    // Add window detail
    const window = document.createElement('div');
    window.className = 'car-window';
    car.appendChild(window);
    
    carsContainer.appendChild(car);
    
    return car;
};

// Load multiple cars using a loop
const loadCars = (numCars) => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22'];
    const speeds = [0.8, 1, 1.2, 1.5, 2]; // Different speeds for variety
    const lanes = [0, 1, 2]; // 3 lanes available
    
    for (let i = 0; i < numCars; i++) {
        // Random parameters for each car
        const laneIndex = lanes[Math.floor(Math.random() * lanes.length)];
        const startPosition = Math.random() * -300 - 100; // Start off-screen to the left
        const speed = speeds[Math.floor(Math.random() * speeds.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = i * 1.5; // Stagger car creation
        
        // Create car with delay
        setTimeout(() => {
            createCar(laneIndex, startPosition, speed, color, i);
            console.log(`✓ Car ${i + 1} created - Lane: ${laneIndex}, Speed: ${speed}x, Color: ${color}`);
        }, delay * 1000);
    }
};

// Generate new cars
const continuousCarGeneration = (interval) => {
    let carCounter = 100; // Start counter from 100 for new cars
    
    const generateNewCar = () => {
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22'];
        const speeds = [0.8, 1, 1.2, 1.5, 2];
        const lanes = [0, 1, 2];
        
        const laneIndex = lanes[Math.floor(Math.random() * lanes.length)];
        const startPosition = Math.random() * -300 - 100;
        const speed = speeds[Math.floor(Math.random() * speeds.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        createCar(laneIndex, startPosition, speed, color, carCounter);
        carCounter++;
    };
    
    setInterval(generateNewCar, interval);
};

// Arrow function to initialize everything
const initializeAnimation = () => {
    logAnimationInfo();
    
    // Load initial batch of cars
    console.log('🚗 Loading initial cars...');
    loadCars(8); // Load 8 cars initially
    
    // Generation of new cars every 3 seconds
    console.log('🔄 Starting continuous car generation every 3 seconds...\n');
    continuousCarGeneration(3000);
    
};

// Cleanup
const setupCleanup = () => {
    window.addEventListener('beforeunload', () => {
        console.log('🛑 Animation stopped - Page unloading');
    });
};

// Initialize on page load
window.addEventListener('load', () => {
    initializeAnimation();
    setupCleanup();
});

// Game loop
const gameLoop = () => {
    requestAnimationFrame(gameLoop);
};

gameLoop();