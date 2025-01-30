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

// Modal functions
const toggleModal = (modal, show) => {
  if (!modal) return;
  modal.style.display = show ? "block" : "none";
  if (show) {
    modal.classList.add("show");
    document.querySelector(".modal__background")?.classList.add("show");
  } else {
    modal.classList.remove("show");
    document.querySelector(".modal__background")?.classList.remove("show");
  }
};

// Dark theme toggle
const toggleDarkTheme = () => body.classList.toggle("dark-theme");

// Overlay functions
const toggleOverlay = (overlay, show) => overlay?.classList.toggle("hidden", !show);

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
document.getElementById("burgerOpen")?.addEventListener("click", () => burgerMenu?.classList.add("menu--open"));
document.getElementById("burgerClose")?.addEventListener("click", () => burgerMenu?.classList.remove("menu--open"));

// Weather fetching
const searchForm = document.querySelector(".search__bar form");
searchForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = document.querySelector(".search__bar input").value.trim();
  if (!city) return alert("Please enter a city name.");

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cdf925f08107fca1910ea91ca3a3f6d9&units=metric`);
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
    document.querySelector(".search-section")?.appendChild(weatherDisplay);
    weatherDisplay.style.display = "block";

    document.querySelector("header")?.style.opacity = "0";
    document.querySelector(".search-section")?.style.opacity = "0";

    weatherDisplay.querySelector(".close-weather")?.addEventListener("click", () => {
      weatherDisplay.style.display = "none";
      document.querySelector("header")?.style.opacity = "1";
      document.querySelector(".search-section")?.style.opacity = "1";
    });
  } catch (error) {
    weatherDisplay.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
    weatherDisplay.style.display = "block";
  }
});
