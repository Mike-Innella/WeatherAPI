// ========== GLOBAL CONSTANTS ==========
const aboutModal = document.getElementById("aboutModal");
const contactModal = document.getElementById("contactModal");
const aboutLink = document.querySelector(".nav__link:nth-child(1)");
const contactLink = document.querySelector(".nav__link:nth-child(2)");
const closeButtons = document.querySelectorAll(".modal-content .close");
const contrastButton = document.querySelector(".contrast");
const body = document.body;

// Contact modal overlays
const loadingOverlay = document.querySelector(
  ".modal__overlay.overlay--loading"
);
const successOverlay = document.querySelector(
  ".modal__overlay.overlay--success"
);

// ========== FUNCTIONS ==========
const openModal = (modal) => {
  modal.style.display = "block";
  document.querySelector("header").style.opacity = "0";
  document.querySelector("section").style.opacity = "0";
  setTimeout(() => {
    modal.classList.add("show");
    document.querySelector(".modal__background").classList.add("show");
  }, 10);
};

const closeModal = (modal) => {
  modal.classList.remove("show");
  document.querySelector(".modal__background").classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
    document.querySelector("header").style.opacity = "1";
    document.querySelector("section").style.opacity = "1";
  }, 400);
};

const toggleDarkTheme = () => body.classList.toggle("dark-theme");

const showOverlay = (overlay) => {
  console.log("Before showing overlay:", overlay.style.display);
  overlay.style.display = "block"; // Show the overlay
  console.log("After showing overlay:", overlay.style.display);
};

const hideOverlay = (overlay) => {
  console.log("Before hiding overlay:", overlay.style.display);
  overlay.style.display = "none"; // Hide the overlay
  console.log("After hiding overlay:", overlay.style.display);
};

// ========== EVENT LISTENERS ==========
contactModal.addEventListener("submit", function (event) {
  event.preventDefault();

  // Show loading overlay
  showOverlay(loadingOverlay);

  // Send form using EmailJS
  emailjs.sendForm("service_mygmail", "template_dfltemailtemp", this).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text); // Check response status and text

      // Log when success overlay is going to be shown
      console.log("Hiding loading overlay and showing success overlay");
      // Hide loading overlay and show success overlay with a delay
      setTimeout(() => {
        console.log("Hiding loading overlay...");
        hideOverlay(loadingOverlay); // Hide loading overlay
        console.log("Showing success overlay...");
        showOverlay(successOverlay); // Show success overlay
      }, 500); // 500ms delay for smoother transition

      // Automatically hide success overlay after a few seconds
      setTimeout(() => {
        console.log("Hiding success overlay...");
        hideOverlay(successOverlay); // Hide success overlay
        console.log("Closing modal...");
        closeModal(contactModal); // Close modal after hiding success overlay
      }, 2400); // Hide success overlay after 2400ms
    },
    (error) => {
      console.log("FAILED...", error); // Check if the error was triggered
      // Hide loading overlay and show error alert
      hideOverlay(loadingOverlay);
      alert("Failed to send email. Try again later.");
    }
  );
});

// Modal Open and Close
aboutLink.addEventListener("click", () => openModal(aboutModal));
contactLink.addEventListener("click", () => openModal(contactModal));

closeButtons.forEach((button) =>
  button.addEventListener("click", () => {
    closeModal(aboutModal);
    closeModal(contactModal);
  })
);

window.addEventListener("click", (event) => {
  if (event.target === aboutModal) closeModal(aboutModal);
  if (event.target === contactModal) closeModal(contactModal);
});

// Dark Theme Toggle
contrastButton.addEventListener("click", toggleDarkTheme);
