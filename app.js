// ========== GLOBAL CONSTANTS ==========
// Modal
const modal = document.getElementById("aboutModal");
const aboutLink = document.querySelector(".nav__link:nth-child(1)"); // "About" link
const closeButton = document.querySelector(".modal-content .close"); // Close button

// Theme Toggle
const contrastButton = document.querySelector(".contrast"); // Button to toggle theme
const body = document.body; // The body element to apply the dark theme

// ========== TOGGLE SECTION ==========

// Open Modal
function openModal() {
  modal.style.display = "block"; // Make modal visible
  header.style.opacity = "0";
  section.style.opacity = "0";
  setTimeout(() => {
    modal.classList.add("show"); // Trigger modal animation
    document.querySelector(".modal__background").classList.add("show"); // Show background
  }, 10); // Small delay to ensure modal display is set first
}

// Close Modal
function closeModal() {
  modal.classList.remove("show"); // Remove class to trigger modal out animation
  document.querySelector(".modal__background").classList.remove("show"); // Hide background
  setTimeout(() => {
    modal.style.display = "none"; // Hide modal after animation
    header.style.opacity = "1";
    section.style.opacity = "1";
  }, 400); // Wait for animation to finish (0.4s)
}

// ========== ABOUT MODAL SECTION ==========

// Open the modal when "About" link is clicked
aboutLink.addEventListener("click", openModal);
// Close the modal when the "close" button is clicked
closeButton.addEventListener("click", closeModal);

// Close the modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal(); // Close the modal if clicked outside
  }
});

// ========== DARK THEME TOGGLE SECTION ==========

// Toggle Dark/Light Theme
function toggleDarkTheme() {
  body.classList.toggle("dark-theme"); // Toggle the dark theme class on the body
}

// Add event listener to the contrast button to toggle theme on click
contrastButton.addEventListener("click", toggleDarkTheme);
