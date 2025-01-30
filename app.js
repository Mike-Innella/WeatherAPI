// Initialize EmailJS
emailjs.init("cePFoU8dvsaDAlAyz");

// Global Constants
const body = document.body;
const contactForm = document.getElementById("contactModalForm");
const contactModal = document.getElementById("contactModal");
const submitBtn = document.getElementById("submitBtn");
const contrastButton = document.querySelector(".contrast");
const weatherDisplay = document.createElement("div");
const burgerMenu = document.getElementById("burgerMenu");
const header = document.getElementById("header");
const navList = document.getElementById("navList");
const headerTitle = document.getElementById("headerTitle");

// Modal functions
const toggleModal = (modal, show) => {
  if (!modal) return;
  modal.style.display = show ? "block" : "none";
  const background = document.querySelector(".modal__background");
  if (show) {
    modal.classList.add("show");
    if (background) background.classList.add("show");
  } else {
    modal.classList.remove("show");
    if (background) background.classList.remove("show");
  }
};

// Dark theme toggle
const toggleDarkTheme = () => {
  document.body.classList.toggle("dark-theme");
};

// Overlay functions
const toggleOverlay = (overlay, show) => {
  if (overlay) {
    overlay.classList.toggle("hidden", !show);
  }
};

// Contact form submission
contactForm?.addEventListener("submit", async function (event) {
  event.preventDefault();
  toggleOverlay(document.querySelector(".overlay--loading"), true);
  try {
    await emailjs.sendForm("service_mygmail", "template_dfltemailtemp", this);
    setTimeout(() => {
      toggleOverlay(document.querySelector(".overlay--loading"), false);
      toggleOverlay(document.querySelector(".overlay--success"), true);
    }, 3200);
    contactForm.reset();
  } catch (error) {
    toggleOverlay(document.querySelector(".overlay--loading"), false);
    alert("Failed to send email. Please try again later.");
    console.error("EmailJS Error:", error);
  }
});

// Burger menu interactions
const burgerOpenBtn = document.getElementById("burgerOpen");
const burgerCloseBtn = document.getElementById("burgerClose");

burgerOpenBtn?.addEventListener("click", () => {
  burgerMenu?.classList.add("menu--open");
  // Set opacity to 0 when the burger menu opens
  if (navList && searchWrapper && headerTitle) {
    navList.style.opacity = "0";
    searchWrapper.style.opacity = "0";
    headerTitle.style.opacity = "0";
  }
});

burgerCloseBtn?.addEventListener("click", () => {
  burgerMenu?.classList.remove("menu--open");
  // Set opacity back to 1 when the burger menu closes
  if (navList && searchWrapper && headerTitle) {
    navList.style.opacity = "1";
    searchWrapper.style.opacity = "1";
    headerTitle.style.opacity = "1";
  }
});

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
      <h3>Weather in ${name}</h3>
      <p>🌡️ ${((main.temp * 9) / 5 + 32).toFixed(2)}°F</p>
      <p>☁️ ${weather[0].description}</p>
      <p>💨 ${(wind.speed * 2.23694).toFixed(2)} mph</p>
      <button class="close-weather">Close</button>
    `;
    weatherContainer?.appendChild(weatherDisplay);
    weatherDisplay.style.display = "block";

    // Fade out header and search section while weather result is visible
    const header = document.querySelector("header");
    if (header) header.style.opacity = "0";
    if (searchWrapper) searchWrapper.style.opacity = "0";

    // Handle weather display close
    document.querySelector(".close-weather")?.addEventListener("click", () => {
      weatherDisplay.style.display = "none";
      if (header) header.style.opacity = "1";
      if (searchWrapper) searchWrapper.style.opacity = "1";
    });
  } catch (error) {
    weatherDisplay.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
    weatherDisplay.style.display = "block";
  }
});
