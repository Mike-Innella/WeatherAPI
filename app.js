// Initialize EmailJS with public key
emailjs.init("cePFoU8dvsaDAlAyz");

// ========== GLOBAL CONSTANTS ==========
const aboutModal = document.getElementById("aboutModal");
const contactModal = document.getElementById("contactModal");
const contactForm = document.getElementById("contactModalForm");
const aboutLink = document.getElementById("aboutLink");
const contactLink = document.getElementById("contactLink");
const closeButtons = document.querySelectorAll(".modal-content .close");
const contrastButton = document.querySelector(".contrast");
const body = document.body;
const submitBtn = document.getElementById("submitBtn");

// Contact modal overlays
const loadingOverlay = document.querySelector(".overlay--loading");
const successOverlay = document.querySelector(".overlay--success");
const contactCloseButton = contactModal.querySelector(".close"); // Get the close button inside the contact modal

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
  overlay.classList.remove("hidden");
};

const hideOverlay = (overlay) => {
  overlay.classList.add("hidden");
};

// ========== EVENT LISTENERS ==========
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    showOverlay(loadingOverlay); // Show loading overlay
    contactCloseButton.style.display = "none"; // ⬅ Hide the close button while loading

    emailjs.sendForm("service_mygmail", "template_dfltemailtemp", this).then(
      () => {
        setTimeout(() => {
          hideOverlay(loadingOverlay);
          showOverlay(successOverlay);
          contactCloseButton.style.display = "block"; // ⬅ Show the close button again
        }, 3200); // Keep loading overlay for 3200ms

        // No automatic modal close! User must close it manually.
        contactForm.reset(); // Clear the form after submission
      },
      (error) => {
        hideOverlay(loadingOverlay);
        alert("Failed to send email. Try again later.");
        console.error("EmailJS Error:", error);
      }
    );
  });
} else {
  console.error("Contact form not found. Check your HTML.");
}

// Modal Open and Close
aboutLink.addEventListener("click", () => openModal(aboutModal));
contactLink.addEventListener("click", () => openModal(contactModal));

closeButtons.forEach((button) =>
  button.addEventListener("click", () => {
    closeModal(aboutModal);
    closeModal(contactModal);
    hideOverlay(successOverlay); // ⬅ Ensure success overlay resets when modal closes
    contactCloseButton.style.display = "block"; // ⬅ Reset close button visibility when modal is closed
  })
);

window.addEventListener("click", (event) => {
  if (event.target === aboutModal) closeModal(aboutModal);
  if (event.target === contactModal) closeModal(contactModal);
});

// Dark Theme Toggle
contrastButton.addEventListener("click", toggleDarkTheme);

// CONVERSION FUNCTIONS
function convertTemp(celsius) {
  return (celsius * 9) / 5 + 32;
}

function convertSpeed(meters) {
  return meters * 2.23694;
}

// WEATHER RESULTS
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search__bar form");
  const searchInput = document.querySelector(".search__bar input");
  const apiKey = "cdf925f08107fca1910ea91ca3a3f6d9";
  const weatherDisplay = document.createElement("div");
  weatherDisplay.className = "weather__result";
  weatherDisplay.style.display = "none"; // Hide initially
  document.querySelector(".search-section").appendChild(weatherDisplay);

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();

    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      const { name, main, weather, wind } = data;
      const cityTempFahrenheit = convertTemp(main.temp);
      const windSpeed = convertSpeed(wind.speed);

      // Show weather result
      weatherDisplay.innerHTML = `
        <h3>Weather in ${name}</h3>
        <p>🌡️ Temperature: ${cityTempFahrenheit.toFixed(2)}°F</p>
        <p>☁️ Condition: ${weather[0].description}</p>
        <p>💨 Wind Speed: ${windSpeed.toFixed(2)} mph</p>
        <button class="close-weather">Close</button>
      `;
      weatherDisplay.style.display = "block"; // Show result

      // Close button functionality
      document.querySelector(".close-weather").addEventListener("click", () => {
        weatherDisplay.style.display = "none";
      });
    } catch (error) {
      weatherDisplay.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
      weatherDisplay.style.display = "block"; // Show error message
    }
  });
});
