/*
  Source: https://www.geeksforgeeks.org/javascript/design-a-running-car-animation-using-html-and-css/
*/

// Arrow function to create a single car with multiple parameters
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
    car.style.animation = `carDrive ${duration}s linear forwards`;

    // Set initial position
    car.style.left = startPosition + 'px';

    // Add window detail
    const window = document.createElement('div');
    window.className = 'car-window';
    car.appendChild(window);

    carsContainer.appendChild(car);

    car.addEventListener('animationend', () => {
        car.remove();
    });

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

// Log animation info
const logAnimationInfo = () => {
    console.log('========================================');
    console.log('🏎️  Car Running Animation - Multiple Cars');
    console.log('Source: GeeksforGeeks');
    console.log('Link: https://www.geeksforgeeks.org/javascript/design-a-running-car-animation-using-html-and-css/');
    console.log('========================================');
    console.log('Features:');
    console.log('  ✓ Multiple cars on 3 lanes');
    console.log('  ✓ Random positions (horizontal)');
    console.log('  ✓ Random lanes (vertical)');
    console.log('  ✓ Random speeds');
    console.log('  ✓ Random colors');
    console.log('  ✓ Dynamic creation via loop');
    console.log('========================================\n');
};

// ACar statistics
const getCarStats = () => {
    const carsContainer = document.getElementById('cars-container');
    const cars = carsContainer.querySelectorAll('.car');
    return {
        totalCars: cars.length,
        lanes: 3,
        maxCarsPerLane: 'Unlimited (overlapping allowed)'
    };
};

// Display stats
const displayStats = () => {
    console.log('📊 Current Stats:');
    const stats = getCarStats();
    console.log(`  Total Cars: ${stats.totalCars}`);
    console.log(`  Available Lanes: ${stats.lanes}`);
    console.log(`  Max Cars Per Lane: ${stats.maxCarsPerLane}\n`);
};

// Initialize everything
const initializeAnimation = () => {
    logAnimationInfo();

    // Load initial batch of cars
    console.log('🚗 Loading initial cars...');
    loadCars(8); // Load 8 cars initially

    // Start continuous generation
    console.log('🔄 Starting continuous car generation every 3 seconds...\n');
    continuousCarGeneration(3000);

    // Display stats after 2 seconds
    setTimeout(() => {
        displayStats();
    }, 2000);
};

// Arrow function for cleanup
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