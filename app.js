// Initialize EmailJS with public key
emailjs.init("cePFoU8dvsaDAlAyz");

// ========== GLOBAL CONSTANTS ==========

// Modal and form elements
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
const contactCloseButton = contactModal?.querySelector(".close");

// Weather elements
const searchForm = document.querySelector(".search__bar form");
const searchInput = document.querySelector(".search__bar input");
const weatherDisplay = document.createElement("div");
weatherDisplay.className = "weather__result";
weatherDisplay.style.display = "none";
document.querySelector(".search-section")?.appendChild(weatherDisplay);

// Burger menu elements
const burgerMenu = document.getElementById("burgerMenu");
const burgerOpen = document.getElementById("burgerOpen");
const burgerClose = document.getElementById("burgerClose");

// ========== FUNCTIONS ==========

// Modal functions
const openModal = (modal) => {
  if (!modal) return;
  modal.style.display = "block";
  document.querySelector("header")?.style?.opacity = "0";
  document.querySelectorAll("section").forEach((sec) => (sec.style.opacity = "0"));
  setTimeout(() => {
    modal.classList.add("show");
    document.querySelector(".modal__background")?.classList.add("show");
  }, 10);
};

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("show");
  document.querySelector(".modal__background")?.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
    document.querySelector("header")?.style.opacity = "1";
    document.querySelectorAll("section").forEach((sec) => (sec.style.opacity = "1"));
    hideOverlay(successOverlay);
    if (contactCloseButton) contactCloseButton.style.display = "block";
  }, 400);
};

// Dark theme toggle
const toggleDarkTheme = () => body.classList.toggle("dark-theme");

// Overlay functions
const showOverlay = (overlay) => overlay?.classList.remove("hidden");
const hideOverlay = (overlay) => overlay?.classList.add("hidden");

// ========== EVENT LISTENERS ==========

// Contact form submission
contactForm?.addEventListener("submit", async function (event) {
  event.preventDefault();
  showOverlay(loadingOverlay);
  if (contactCloseButton) contactCloseButton.style.display = "none"; // Hide close button while loading

  try {
    await emailjs.sendForm("service_mygmail", "template_dfltemailtemp", this);
    setTimeout(() => {
      hideOverlay(loadingOverlay);
      showOverlay(successOverlay);
      if (contactCloseButton) contactCloseButton.style.display = "block";
    }, 3200);
    contactForm.reset();
  } catch (error) {
    hideOverlay(loadingOverlay);
    alert("Failed to send email. Please try again later.");
    console.error("EmailJS Error:", error);
  }
});

// Burger menu interactions
burgerOpen?.addEventListener("click", () => burgerMenu?.classList.add("menu--open"));
burgerClose?.addEventListener("click", () => burgerMenu?.classList.remove("menu--open"));

window.addEventListener("click", (event) => {
  if (event.target === burgerMenu) burgerMenu?.classList.remove("menu--open");
});

// Modal Open and Close Events
aboutLink?.addEventListener("click", () => openModal(aboutModal));
contactLink?.addEventListener("click", () => openModal(contactModal));

if (closeButtons.length) {
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(aboutModal);
      closeModal(contactModal);
    });
  });
}

window.addEventListener("click", (event) => {
  if (event.target === aboutModal) closeModal(aboutModal);
  if (event.target === contactModal) closeModal(contactModal);
});

// Dark Theme Toggle
contrastButton?.addEventListener("click", toggleDarkTheme);

// Weather Fetching
document.addEventListener("DOMContentLoaded", () => {
  // Select the form and input elements
  const searchForm = document.querySelector(".search__bar form");
  const searchInput = document.querySelector(".search__bar input");

  // Create and style the weather display div
  const weatherDisplay = document.createElement("div");
  weatherDisplay.className = "weather__result";
  weatherDisplay.style.display = "none";  // Initially hidden

  // Append the weather display div to the search section
  const searchSection = document.querySelector(".search-section");
  if (searchSection) {
    searchSection.appendChild(weatherDisplay);
  } else {
    console.warn("Search section not found.");
  }

  // Handle form submission and fetch weather data
  searchForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cdf925f08107fca1910ea91ca3a3f6d9&units=metric`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      console.log(data); // Debugging output to verify API response

      const { name, main, weather, wind } = data;
      const weatherDescription = weather.length > 0 ? weather[0].description : "No description available";
      const cityTempFahrenheit = ((main.temp * 9) / 5 + 32).toFixed(2);
      const windSpeed = (wind.speed * 2.23694).toFixed(2);

      // Display weather data
      weatherDisplay.innerHTML = `
        <h3>Weather in ${name}</h3>
        <p>🌡️ Temperature: ${cityTempFahrenheit}°F</p>
        <p>☁️ Condition: ${weatherDescription}</p>
        <p>💨 Wind Speed: ${windSpeed} mph</p>
        <button class="close-weather">Close</button>
      `;
      weatherDisplay.style.display = "block"; // Show weather display

      // Hide header and search section
      document.querySelector("header")?.style.opacity = "0";
      document.querySelector(".search-section")?.style.opacity = "0";

      // Add event listener to close button
      weatherDisplay.addEventListener("click", (event) => {
        if (event.target.classList.contains("close-weather")) {
          weatherDisplay.style.display = "none"; // Hide weather display
          document.querySelector("header")?.style.opacity = "1"; // Restore header opacity
          document.querySelector(".search-section")?.style.opacity = "1"; // Restore search section opacity
        }
      });

    } catch (error) {
      weatherDisplay.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
      weatherDisplay.style.display = "block";
    }
  });
});
