
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

// Get the elements
const openOverlayButton = document.getElementById('openOverlayButton');
const overlay = document.getElementById('overlay');
const closeOverlayButton = document.getElementById('closeOverlayButton');

// Function to open the overlay
openOverlayButton.addEventListener('click', function() {
    overlay.style.display = 'block';
});

// Function to close the overlay
closeOverlayButton.addEventListener('click', function() {
    overlay.style.display = 'none';
});

// Also close the overlay when clicking outside of the overlay-content
window.addEventListener('click', function(event) {
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navLinks = document.getElementById("nav-links");

    hamburgerMenu.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
});


