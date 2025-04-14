
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
    const container = document.getElementById('Shinto-cards');
    const cards = document.querySelectorAll('.card');

    // Function to trigger the animation for larger displays (iPad and Desktop)
    function animateCardsLarge() {
        cards.forEach((card, index) => {
            const angle = -30 + (index * 18);
            const xOffset = 100 * Math.cos(angle * Math.PI / 160);
            const yOffset = 250 * Math.sin(angle * Math.PI / 160);
            card.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`;
            card.style.opacity = '1';
        });
    }

    // Function to trigger the animation for smaller displays (Mobile)
    function animateCardsSmall() {
        cards.forEach((card, index) => {
            const angle = -30 + (index * 18);
            const xOffset = 20 * Math.cos(angle * Math.PI / 100);  // Decreased xOffset for smaller cards
            const yOffset = 100 * Math.sin(angle * Math.PI / 100); // Decreased yOffset for smaller cards
            card.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`;
            card.style.opacity = '1';
        });
    }

    // Determine screen width and run the appropriate animation
    if (window.innerWidth <= 768) {
        // Mobile display
        animateCardsSmall();
    } else {
        // iPad and Desktop display
        animateCardsLarge();
    }
});




document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navLinks = document.getElementById("nav-links");

    hamburgerMenu.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
});

