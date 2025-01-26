// ========== GLOBAL CONSTANTS ==========
// Modals
const aboutModal = document.getElementById("aboutModal"); // About modal
const contactModal = document.getElementById("contactModal"); // Contact modal

// Links
const aboutLink = document.querySelector(".nav__link:nth-child(1)"); // "About" link
const contactLink = document.querySelector(".nav__link:nth-child(2)"); // "Contact" link

// Close buttons (all close buttons in an array)
const closeButtons = document.querySelectorAll(".modal-content .close"); // Close buttons

// Theme Toggle
const contrastButton = document.querySelector(".contrast"); // Button to toggle theme
const body = document.body; // The body element to apply the dark theme

// ========== TOGGLE SECTION ==========

// Open Modal
function openModal(modal) {
  modal.style.display = "block"; // Make modal visible
  document.querySelector("header").style.opacity = "0";
  document.querySelector("section").style.opacity = "0";
  setTimeout(() => {
    modal.classList.add("show"); // Trigger modal animation
    document.querySelector(".modal__background").classList.add("show"); // Show background
  }, 10); // Small delay to ensure modal display is set first
}

// Close Modal
function closeModal(modal) {
  modal.classList.remove("show"); // Remove class to trigger modal out animation
  document.querySelector(".modal__background").classList.remove("show"); // Hide background
  setTimeout(() => {
    modal.style.display = "none"; // Hide modal after animation
    document.querySelector("header").style.opacity = "1";
    document.querySelector("section").style.opacity = "1";
  }, 400); // Wait for animation to finish (0.4s)
}

// ========== ABOUT & CONTACT MODAL SECTION ==========

// Open the modal when "About" link is clicked
aboutLink.addEventListener("click", () => openModal(aboutModal));

// Open the modal when "Contact" link is clicked
contactLink.addEventListener("click", () => openModal(contactModal));

// Close the modals when any "close" button is clicked
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(aboutModal);
    closeModal(contactModal);
  });
});

// Close the modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === aboutModal) {
    closeModal(aboutModal); // Close the about modal if clicked outside
  } else if (event.target === contactModal) {
    closeModal(contactModal); // Close the contact modal if clicked outside
  }
});

// ========== DARK THEME TOGGLE SECTION ==========

// Toggle Dark/Light Theme
function toggleDarkTheme() {
  body.classList.toggle("dark-theme"); // Toggle the dark theme class on the body
}

// Add event listener to the contrast button to toggle theme on click
contrastButton.addEventListener("click", toggleDarkTheme);
