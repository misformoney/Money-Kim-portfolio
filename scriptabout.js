document.addEventListener("DOMContentLoaded", function() {
    const screenWidth = window.innerWidth;

    // Functionality for tablets and desktops (manual scroll)
    if (screenWidth > 768) {
        let maxTranslateX, maxTranslateXSection7, maxTranslateY, maxScaleDefault, maxScaleSection7, headlineAppearScale, headlineDisappearScale;

        if (screenWidth <= 1024) { 
            // For tablets
            maxTranslateX = 10; 
            maxTranslateXSection7 = 5; 
            maxTranslateY = 0; 
            maxScaleDefault = 2; 
            maxScaleSection7 = 1.5; 
            headlineAppearScale = 0.2; 
            headlineDisappearScale = 1.2; 
        } else {
            // For desktop and larger screens
            maxTranslateX = 120; 
            maxTranslateXSection7 = 35; 
            maxTranslateY = 0; 
            maxScaleDefault = 3.5; 
            maxScaleSection7 = 2.2; 
            headlineAppearScale = 2.0; 
            headlineDisappearScale = 3; 
        }

        const scrollIntro = document.querySelector('.scrollintro');
        const sections = document.querySelectorAll('.section');
        const headlines = document.querySelectorAll('.headline');
        const startText = document.getElementById('start-text');
        const scrollBackBtn = document.getElementById('scroll-back-btn');
        let currentSection = 0;
        let scrollCount = 0;
        const scrollsNeeded = 15; 

        let isDragging = false;
        let startX, currentX, accumulatedDeltaX = 0;
        let snappedToMidScale = false;

        // Set the initial state
        sections[currentSection].classList.add('active');
        sections[currentSection].classList.remove('hidden');

        function handleScroll(event, isDrag = false) {
            if (!isDrag) {
                event.preventDefault(); // Prevent default scrolling behavior
            }
            const currentScrollsNeeded = currentSection === 6 ? scrollsNeeded / 2 : scrollsNeeded;

            let delta = event.deltaY;

            if (isDrag) {
                const dragFactor = 0.00001; // Extremely slow drag
                delta = (startX - currentX) * dragFactor;
                accumulatedDeltaX += delta * 0.5; // Further reduce accumulation rate
            }
            
            if (delta > 0) {
                scrollCount = Math.min(scrollCount + 1, currentScrollsNeeded);
                if (scrollCount > 0) {
                    startText.style.opacity = 0;
                    startText.style.animation = 'none';
                }
            } else if (delta < 0) {
                scrollCount = Math.max(scrollCount - 1, 0);
                if (currentSection === 0 && scrollCount === 0) {
                    startText.style.opacity = 1;
                    startText.style.animation = '';
                }
            }

            const progress = scrollCount / currentScrollsNeeded;
            const currentMaxScale = currentSection === 6 ? maxScaleSection7 : maxScaleDefault;
            const currentMaxTranslateX = currentSection === 6 ? maxTranslateXSection7 : maxTranslateX;

            let scale;
            if ((screenWidth <= 1024 && !snappedToMidScale) || (screenWidth <= 768 && !snappedToMidScale)) { 
                scale = 1 + (0.5 - 1) * Math.pow(progress, 0.45);
                if (scale >= 0.5) {
                    scale = 0.5;
                    snappedToMidScale = true; 
                    scrollCount = 0;
                }
            } else {
                scale = snappedToMidScale 
                    ? 0.5 + (currentMaxScale - 0.5) * Math.pow(progress, 0.45)
                    : 1 + (currentMaxScale - 1) * Math.pow(progress, 0.45);
            }

            const translateX = -currentMaxTranslateX * progress;
            const translateY = maxTranslateY * progress;

            sections[currentSection].style.transform = `translateX(${translateX}vw) translateY(${translateY}vw) scale(${scale})`;
            sections[currentSection].style.opacity = 1;

            if (currentSection !== 6 && scale >= headlineAppearScale && scale <= headlineDisappearScale) {
                headlines[currentSection].style.opacity = 1;
                headlines[currentSection].style.transform = 'translateY(0)';
            } else if (currentSection !== 6) {
                headlines[currentSection].style.opacity = 0;
                headlines[currentSection].style.transform = 'translateY(20px)';
            } else {
                if (scale >= maxScaleSection7) {
                    headlines[6].style.opacity = 1;
                    headlines[6].style.transform = 'translateY(0)';
                    scrollBackBtn.style.opacity = 1;
                }
            }

            if (scrollCount >= currentScrollsNeeded) {
                if (currentSection !== 6) {
                    sections[currentSection].classList.remove('active');
                    sections[currentSection].classList.add('hidden');
                    headlines[currentSection].style.opacity = 0;
                    headlines[currentSection].style.transform = 'translateY(20px)';

                    currentSection = (currentSection + 1) % sections.length;

                    scrollCount = 0;
                    snappedToMidScale = false;
                    sections[currentSection].style.transform = 'translateX(0) translateY(0) scale(1)';
                    sections[currentSection].style.opacity = 1;
                    sections[currentSection].classList.remove('hidden');
                    sections[currentSection].classList.add('active');
                }
            } else if (scrollCount <= 0 && delta < 0 && currentSection > 0) {
                sections[currentSection].classList.remove('active');
                sections[currentSection].classList.add('hidden');
                headlines[currentSection].style.opacity = 0;
                headlines[currentSection].style.transform = 'translateY(20px)';

                currentSection = Math.max(currentSection - 1, 0);

                scrollCount = currentScrollsNeeded;
                snappedToMidScale = false;
                sections[currentSection].style.transform = `translateX(-${currentMaxTranslateX}vw) translateY(${maxTranslateY}vw) scale(${currentMaxScale})`;
                sections[currentSection].style.opacity = 1;
                sections[currentSection].classList.remove('hidden');
                sections[currentSection].classList.add('active');
            }
        }

        function enableScroll() {
            window.addEventListener('wheel', handleScroll, { passive: false });
        }

        function disableScroll() {
            window.removeEventListener('wheel', handleScroll);
        }

        function handleTouchStart(event) {
            isDragging = true;
            startX = event.touches[0].clientX;
        }

        function handleTouchMove(event) {
            if (!isDragging) return;
            currentX = event.touches[0].clientX;
            handleScroll({ deltaY: startX - currentX }, true);
        }

        function handleTouchEnd() {
            isDragging = false;
            accumulatedDeltaX = 0;
            scrollCount = 0;
            snappedToMidScale = false;
            sections.forEach(section => section.classList.add('hidden'));
            sections.forEach(section => section.classList.remove('active'));

            sections[currentSection].classList.add('active');
            sections[currentSection].classList.remove('hidden');
        }

        scrollIntro.addEventListener('mouseenter', enableScroll);
        scrollIntro.addEventListener('mouseleave', disableScroll);
        scrollIntro.addEventListener('touchstart', handleTouchStart, { passive: true });
        scrollIntro.addEventListener('touchmove', handleTouchMove, { passive: true });
        scrollIntro.addEventListener('touchend', handleTouchEnd, { passive: true });

        scrollBackBtn.addEventListener('click', () => {
            let reverseScrollInterval = setInterval(() => {
                if (currentSection > 0) {
                    sections[currentSection].classList.remove('active');
                    sections[currentSection].classList.add('hidden');
                    headlines[currentSection].style.opacity = 0;
                    headlines[currentSection].style.transform = 'translateY(20px)';

                    currentSection = Math.max(currentSection - 1, 0);

                    sections[currentSection].style.transform = `translateX(0) translateY(0) scale(2.5)`;
                    sections[currentSection].style.opacity = 1;
                    sections[currentSection].classList.remove('hidden');
                    sections[currentSection].classList.add('active');
                } else {
                    clearInterval(reverseScrollInterval);
                }
            }, 10);
        });

        // Enable scrolling with both mouse and touch on iPads and desktops
        enableScroll();

    } else {
        // Functionality for mobile devices (automatic scroll)
        const scrollIntro = document.querySelector('.scrollintro');
        const sections = document.querySelectorAll('.section');
        const headlines = document.querySelectorAll('.headline');
        const scrollBackBtn = document.getElementById('scroll-back-btn');
        let currentSection = 0;
        let interval;
        
        function showNextSection() {
            if (currentSection < sections.length - 1) {
                sections[currentSection].classList.remove('active');
                sections[currentSection].classList.add('hidden');
                headlines[currentSection].style.opacity = 0;
                headlines[currentSection].style.transform = 'translateY(20px)';
                
                currentSection++;
                
                sections[currentSection].classList.add('active');
                sections[currentSection].classList.remove('hidden');
                headlines[currentSection].style.opacity = 1;
                headlines[currentSection].style.transform = 'translateY(0)';
            } else {
                clearInterval(interval);
            }
        }

        function startAutoScroll() {
            currentSection = 0;
            sections.forEach(section => section.classList.add('hidden'));
            headlines.forEach(headline => {
                headline.style.opacity = 0;
                headline.style.transform = 'translateY(20px)';
            });
            
            sections[currentSection].classList.add('active');
            sections[currentSection].classList.remove('hidden');
            headlines[currentSection].style.opacity = 1;
            headlines[currentSection].style.transform = 'translateY(0)';
            
            interval = setInterval(showNextSection, 3000);
        }
        
        startAutoScroll();
        
        scrollBackBtn.addEventListener('click', function() {
            startAutoScroll();
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const lightModeButton = document.getElementById("lightmode");

    lightModeButton.addEventListener("click", function() {
        document.body.classList.toggle("light-mode");

        // Change button text between "LIGHT" and "DARK" depending on the mode
        if (document.body.classList.contains("light-mode")) {
            lightModeButton.textContent = "DARK";
        } else {
            lightModeButton.textContent = "LIGHT";
        }
    });
});


document.getElementById('goUpButton').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



// SCRATCH REVEAL // 
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const hiddenLetterContainer = document.querySelector('.hiddenletter-container');
const letter = document.querySelector('.letter');
const controls = document.getElementById('controls');

// Set canvas size to cover the entire .letter element
canvas.width = letter.offsetWidth;
canvas.height = letter.offsetHeight;

// Position canvas correctly over the .letter element
canvas.style.top = letter.offsetTop + 'px';
canvas.style.left = letter.offsetLeft + 'px';

// Fill the canvas with the specified background color
ctx.fillStyle = '#547567'; // Set to the desired background color
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Drawing state variables
let isDrawing = false;
let brush = 'reveal'; // Default brush
const brushSize = 90; // Set brush size to 3x the original size (30 * 3)

// Start drawing
function startDrawing(event) {
    isDrawing = true;
    controls.style.opacity = '0'; // Hide the controls when drawing starts
    controls.style.transition = 'opacity 0.5s ease'; // Smooth transition to hide the controls
    draw(event); // Draw immediately
}

// Draw on canvas with selected brush
function draw(event) {
    if (!isDrawing) return;

    // Get the bounding box of the canvas
    const rect = canvas.getBoundingClientRect();

    let x, y;
    if (event.touches) {
        // For touch devices
        x = event.touches[0].clientX - rect.left - (brushSize / 2);
        y = event.touches[0].clientY - rect.top - (brushSize / 2);
    } else {
        // For mouse devices
        x = event.clientX - rect.left - (brushSize / 2);
        y = event.clientY - rect.top - (brushSize / 2);
    }

    ctx.globalCompositeOperation = 'destination-out'; // Set the composite mode to reveal underlying content
    ctx.beginPath();

    if (brush === 'reveal') {
        ctx.arc(x, y, brushSize, 0, Math.PI * 2); // Adjust the brush size and draw at the correct position
        ctx.fill();
    }

    ctx.closePath();
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Select brush
function selectBrush(type) {
    brush = type;
}

// Event listeners for drawing with mouse
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Event listeners for drawing with touch
canvas.addEventListener('touchstart', startDrawing, { passive: true });
canvas.addEventListener('touchmove', draw, { passive: true });
canvas.addEventListener('touchend', stopDrawing);






// SELF MESSAGE // 

document.addEventListener("DOMContentLoaded", function() {
    // --- SELF MESSAGE SETUP ---
    const whiteboard = document.getElementById('whiteboard');
    const ctxWhiteboard = whiteboard.getContext('2d');

    // Set whiteboard canvas size
    whiteboard.width = document.querySelector('.Board').clientWidth;
    whiteboard.height = document.querySelector('.Board').clientHeight;

    // Drawing state variables
    let isDrawingOnBoard = false;
    let selectedColor = '#000000'; // Default color
    let lastX = 0, lastY = 0; // To keep track of the last position

    // Start drawing on the board
    function beginBoardDrawing(event) {
        isDrawingOnBoard = true;
        const rect = whiteboard.getBoundingClientRect();
        lastX = event.touches ? event.touches[0].clientX - rect.left : event.offsetX;
        lastY = event.touches ? event.touches[0].clientY - rect.top : event.offsetY;
        drawOnBoard(event); // Draw immediately
    }

    // Draw on the whiteboard with the selected color
    function drawOnBoard(event) {
        if (!isDrawingOnBoard) return;

        const rect = whiteboard.getBoundingClientRect();
        const x = event.touches ? event.touches[0].clientX - rect.left : event.offsetX;
        const y = event.touches ? event.touches[0].clientY - rect.top : event.offsetY;

        ctxWhiteboard.strokeStyle = selectedColor;
        ctxWhiteboard.lineWidth = 10; // Increase brush size for smoother drawing
        ctxWhiteboard.lineCap = 'round'; // Smooth edges
        ctxWhiteboard.lineJoin = 'round'; // Smooth joins

        ctxWhiteboard.beginPath();
        ctxWhiteboard.moveTo(lastX, lastY);
        ctxWhiteboard.lineTo(x, y);
        ctxWhiteboard.stroke();
        ctxWhiteboard.closePath();

        lastX = x;
        lastY = y;
    }

    // Stop drawing on the board
    function endBoardDrawing() {
        isDrawingOnBoard = false;
    }

    // Update brush color
    document.getElementById('brushColor').addEventListener('input', function () {
        selectedColor = this.value;
    });

    // Save the drawing on the whiteboard
    document.getElementById('saveButton').addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = whiteboard.toDataURL('image/png');
        link.download = 'self-message.png';
        link.click();
    });

    // Event listeners for drawing on the board with mouse
    whiteboard.addEventListener('mousedown', beginBoardDrawing);
    whiteboard.addEventListener('mousemove', drawOnBoard);
    whiteboard.addEventListener('mouseup', endBoardDrawing);
    whiteboard.addEventListener('mouseout', endBoardDrawing);

    // Event listeners for drawing on the board with touch
    whiteboard.addEventListener('touchstart', function(event) {
        event.preventDefault(); // Prevent scrolling while drawing
        beginBoardDrawing(event);
    }, { passive: false });

    whiteboard.addEventListener('touchmove', function(event) {
        event.preventDefault(); // Prevent scrolling while drawing
        drawOnBoard(event);
    }, { passive: false });

    whiteboard.addEventListener('touchend', endBoardDrawing);
});


document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navLinks = document.getElementById("nav-links");

    hamburgerMenu.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
});

