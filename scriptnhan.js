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
