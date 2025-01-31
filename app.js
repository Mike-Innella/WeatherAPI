emailjs.init("cePFoU8dvsaDAlAyz");

const aboutModal = document.getElementById("aboutModal");
const contactModal = document.getElementById("contactModal");
const contactForm = document.getElementById("contactModalForm");
const submitBtn = document.getElementById("submitBtn");
const closeAboutModalBtn = document.getElementById("closeAboutModal");
const closeContactModalBtn = document.getElementById("closeContactModal");
const contrastButton = document.querySelector(".contrast");
const weatherDisplay = document.createElement("div");
const searchWrapper = document.getElementById("searchWrapper");
const successOverlay = document.querySelector(".overlay--success");
const background = document.getElementById("modalBackground");
const navList = document.getElementById("navList");
const headerTitle = document.getElementById("headerTitle");

// Dark theme toggle
const toggleDarkTheme = () => document.body.classList.toggle("dark-theme");

// Modal functions
const toggleModal = (modal, show) => {
  const background = document.getElementById("modalBackground");

  if (!modal) return;

  if (show) {
    modal.classList.add("show");
    background.classList.add("show");
    setTimeout(() => {
      header.style.opacity = "0";
      if (!document.querySelector(".menu").classList.contains("menu--open")) {
        searchWrapper.style.opacity = "0";
      }
    }, 120);
  } else {
    modal.classList.remove("show");
    background.classList.remove("show");
    header.style.opacity = "1";
    searchWrapper.style.opacity = "1";
  }

  // Fade in/out background
  background.style.opacity = show ? "1" : "0";
  background.style.visibility = show ? "visible" : "hidden";
};

// Close modal on background click
const closeModalOnBackgroundClick = (modal) => {
  const background = document.getElementById("modalBackground");
  background?.addEventListener("click", () => toggleModal(modal, false));
};

// Modal Open and Close Listeners
document.querySelectorAll('[data-modal="about"]').forEach((button) => {
  button.addEventListener("click", () => toggleModal(aboutModal, true));
});
document.querySelectorAll('[data-modal="contact"]').forEach((button) => {
  button.addEventListener("click", () => toggleModal(contactModal, true));
});

closeAboutModalBtn.addEventListener("click", () =>
  toggleModal(aboutModal, false)
);
closeContactModalBtn.addEventListener("click", () => {
  toggleModal(contactModal, false);
  toggleOverlay(successOverlay, false);
});

window.addEventListener("click", (event) => {
  if (event.target === aboutModal) toggleModal(aboutModal, false);
  if (event.target === contactModal) toggleModal(contactModal, false);
});

// Modal Background Click Handling
if (aboutModal) closeModalOnBackgroundClick(aboutModal);
if (contactModal) closeModalOnBackgroundClick(contactModal);

// Overlay functions
const toggleOverlay = (overlay, show) =>
  overlay?.classList.toggle("hidden", !show);

// Contact form submission
contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  toggleOverlay(document.querySelector(".overlay--loading"), true);
  try {
    await emailjs.sendForm(
      "service_mygmail",
      "template_dfltemailtemp",
      contactForm
    );
    setTimeout(() => {
      toggleOverlay(document.querySelector(".overlay--loading"), false);
      toggleOverlay(successOverlay, true);
    }, 3200);
    contactForm.reset();
  } catch (error) {
    toggleOverlay(document.querySelector(".overlay--loading"), false);
    alert("Failed to send email. Please try again later.");
    console.error("EmailJS Error:", error);
  }
});

// Burger
function toggleBurgerMenu() {
  const menu = document.querySelector(".menu");
  const isOpening = !menu.classList.contains("menu--open");

  menu.classList.toggle("menu--open");

  if (isOpening) {
    headerTitle.style.opacity = "0";
    searchWrapper.style.opacity = "0";
    setTimeout(() => {
      searchWrapper.style.display = "none";
    }, 240);
    navList.style.opacity = "0";
  } else {
    headerTitle.style.opacity = "1";
    searchWrapper.style.opacity = "1";
    setTimeout(() => {
      searchWrapper.style.display = "block";
    }, 240);
    navList.style.opacity = "1";
  }
}

// Weather fetching
const searchForm = document.querySelector(".search__bar form");
const weatherContainer = document.querySelector(".search-section");

searchForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = document.querySelector(".search__bar input").value.trim();
  if (!city) return alert("Please enter a city name.");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cdf925f08107fca1910ea91ca3a3f6d9&units=metric`
    );
    if (!res.ok) throw new Error("City not found");
    const { name, main, weather, wind } = await res.json();

    weatherDisplay.className = "weather__result";
    weatherDisplay.innerHTML = `
    <div class = "weather__content">
      <h3>Weather in ${name}</h3>
      <p>🌡️ ${((main.temp * 9) / 5 + 32).toFixed(2)}°F</p>
      <p>☁️ ${weather[0].description}</p>
      <p>💨 ${(wind.speed * 2.23694).toFixed(2)} mph</p>
      <button class="close-weather">Close</button>
      </div>
    `;
    weatherContainer?.appendChild(weatherDisplay);
    weatherDisplay.style.display = "block";
    header.style.opacity = "0";
    searchWrapper.style.opacity = "0";

    document.querySelector(".close-weather")?.addEventListener("click", () => {
      weatherDisplay.style.display = "none";
      header.style.opacity = "1";
      searchWrapper.style.opacity = "1";
    });
  } catch (error) {
    alert("Failed to fetch weather data. Please try again.");
    console.error(error);
  }
});
