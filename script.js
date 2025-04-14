document.addEventListener("DOMContentLoaded", function() {
    const hoaContainer = document.querySelector(".hoa-container");
    const keywordsContainer = document.querySelector(".keywords-container");
    const phoneContainer = document.querySelector("#phone");

    hoaContainer.addEventListener("animationend", function() {
        hoaContainer.classList.add("finished");
        keywordsContainer.style.display = "flex"; // Show keywords after animation
    });
});

document.addEventListener("mousemove", function(e) {
    // Move .hoa with cursor
    const hoaContainer = document.querySelector(".hoa-container");
    const hoa = document.querySelector(".hoa");

    const moveXHoa = (e.clientX - window.innerWidth / 2) * 0.03;
    const moveYHoa = (e.clientY - window.innerHeight / 2) * 0.03;

    hoa.style.transform = `translate(${moveXHoa}px, ${moveYHoa}px)`;

    // Move .phone with cursor
    const phoneContainer = document.querySelector("#phone");
    const phone = document.querySelector(".phone");

    const moveXPhone = (e.clientX - window.innerWidth / 2) * 0.03;
    const moveYPhone = (e.clientY - window.innerHeight / 2) * 0.03;

    phone.style.transform = `translate(${moveXPhone}px, ${moveYPhone}px)`;
});

document.addEventListener('DOMContentLoaded', function() {
    const words = [
        "multidisciplinary designer.",
        "digital media creator.",
        "UI designer.", 
        "frontend coder.",
        "backend fresher.",
        "storyteller.",
        "risk-taker.",
        "believer."
    ];

    let index = 0;
    const designerElement = document.getElementById('designer');
    designerElement.style.display = 'flex'; // Show the element after the page loads

    function changeWord() {
        // Start fade out
        designerElement.style.opacity = 0;

        // Change the word after fade out is complete (1.5s)
        setTimeout(() => {
            designerElement.innerHTML = '<span class="invisible-prefix">I am a </span>' + words[index];
            index = (index + 1) % words.length;

            // Start fade in
            designerElement.style.opacity = 1;
        }, 1000); // Wait for the fade-out transition to complete
    }

    // Start the loop with an initial delay to sync with the appearance
    setInterval(changeWord, 3000); // Change word every 3 seconds
    changeWord(); // Initial call
});

document.addEventListener("DOMContentLoaded", function() {
    const hoaContainer = document.querySelector(".hoa-container");
    const keywordsContainer = document.querySelector(".keywords-container");
    const designerElement = document.getElementById('designer');
    const keywordsElements = document.querySelectorAll('.keywords');
    let idleTimeout;

    // Function to show the #designer after 2 seconds of mouse inactivity
    function startDesignerAnimation() {
        idleTimeout = setTimeout(function() {
            designerElement.style.display = 'flex'; // Start the animation after 2 seconds
            designerElement.style.opacity = '1'; // Fade in the #designer after 2 seconds
        }, 2000); // 2000 milliseconds = 2 seconds
    }

    // Function to reset the idle timer when the mouse moves
    function resetIdleTimer() {
        clearTimeout(idleTimeout);
        designerElement.style.display = 'none'; // Hide #designer immediately
        designerElement.style.opacity = '0'; // Ensure #designer is hidden
        startDesignerAnimation(); // Restart the idle timer
    }

    // Add event listeners to each keyword element
    keywordsElements.forEach(function(keyword) {
        keyword.addEventListener('mouseover', function() {
            clearTimeout(idleTimeout); // Stop the idle timer when hovering over keywords
            designerElement.style.display = 'none'; // Hide #designer when a keyword is hovered
        });
        keyword.addEventListener('mouseout', function() {
            resetIdleTimer(); // Restart the idle timer when the mouse leaves a keyword
        });
    });

    // Add event listener to the whole document to detect mouse movement
    document.addEventListener('mousemove', resetIdleTimer);

    // Wait for 5 seconds before starting the idle timer
    setTimeout(function() {
        hoaContainer.addEventListener("animationend", function() {
            hoaContainer.classList.add("finished");
            keywordsContainer.style.display = "flex"; // Show keywords after animation

            // Start idle timer after the 5 seconds delay
            startDesignerAnimation();
        });
    }, 5000); 
});


// Allow horizontal scrolling only when mouse is inside carousel-container and the Recent Works section is in view

const carousel = document.querySelector('.carousel');
const blocks = document.querySelectorAll('.work-container');
let scrollAmount = 0;
const blockWidth = blocks[0].offsetWidth;
const maxScroll = -(blockWidth + 2 * 10) * (blocks.length - 0.6); // Stop scroll before Box 6

const carouselContainer = document.querySelector('.carousel-container'); // Now targeting the carousel-container

function handleScroll(event) {
    // Prevent default vertical scroll behavior while in the section
    event.preventDefault();

    const scrollIncrement = blockWidth * 0.4;

    if (event.deltaY > 0) {
        scrollAmount -= scrollIncrement;
    } else {
        scrollAmount += scrollIncrement;
    }

    scrollAmount = Math.min(0, scrollAmount);
    scrollAmount = Math.max(scrollAmount, maxScroll);

    carousel.style.transform = `translateX(${scrollAmount}px)`;
}

function enableHorizontalScroll() {
    window.addEventListener('wheel', handleScroll, { passive: false });
}

function disableHorizontalScroll() {
    window.removeEventListener('wheel', handleScroll);
}

// Enable horizontal scroll on mouse enter and disable on mouse leave
carouselContainer.addEventListener('mouseenter', () => {
    enableHorizontalScroll();
});

carouselContainer.addEventListener('mouseleave', () => {
    disableHorizontalScroll();
});

// Add the hover animation back for the carousel work divs
blocks.forEach(block => {
    block.addEventListener('mousemove', (event) => {
        const blockRect = block.getBoundingClientRect();
        const x = (event.clientX - blockRect.left) / blockRect.width - 0.5; // Normalize cursor X position (-0.5 to 0.5)
        const y = (event.clientY - blockRect.top) / blockRect.height - 0.5; // Normalize cursor Y position (-0.5 to 0.5)

        block.style.transform = `rotateX(${y * 20}deg) rotateY(${x * 40}deg) scale(0.9)`;
        block.style.boxShadow = `0px 0px 20px 10px rgba(64, 91, 81, 0.5)`; // Apply glow effect with the color #405B51
    });

    block.addEventListener('mouseleave', () => {
        block.style.transform = `rotateX(0deg) rotateY(0deg) scale(0.7)`; // Reset to original state when mouse leaves
        block.style.boxShadow = `none`; // Remove the glow effect
    });
});


function updateBlocks() {
    blocks.forEach(block => {
        block.style.transform = `rotateX(0deg) rotateY(0deg) scale(0.7)`; // Reset all blocks to original state
    });
}

updateBlocks(); // Initial update to set the correct styles

document.getElementById('goUpButton').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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


document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navLinks = document.getElementById("nav-links");

    hamburgerMenu.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
});


