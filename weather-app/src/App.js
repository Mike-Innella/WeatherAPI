import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Header from "./Components/Header";
import Search from "./Components/Search";
import Modals from "./Components/Modals";
import "../src/Styling/styles.css";
import "font-awesome/css/font-awesome.min.css";

emailjs.init("cePFoU8dvsaDAlAyz");

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleDarkTheme = () => {
    document.body.classList.toggle("dark-theme");
  };

  const handleCloseAbout = () => {
    console.log("Closing About modal");
    setIsAboutOpen(false);
  };

  const handleCloseContact = () => {
    console.log("Closing Contact modal");
    setIsContactOpen(false);
  };

  const handleOpenAbout = (e) => {
    e.stopPropagation();  
    console.log("Opening About modal");
    setIsAboutOpen(true);
  };
  
  const handleOpenContact = (e) => {
    e.stopPropagation();  
    console.log("Opening Contact modal");
    setIsContactOpen(true);
  };
  

  const onBackgroundClick = () => {
    console.log("Background clicked. Closing modals.");
    setIsAboutOpen(false); // Close About modal
    setIsContactOpen(false); // Close Contact modal
  };

  const handleContactChange = (e) => {
    console.log(`Contact form changed: ${e.target.name} = ${e.target.value}`);
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    console.log("Submitting contact form");
    setIsLoading(true);
    try {
      await emailjs.sendForm(
        "service_mygmail",
        "template_dfltemailtemp",
        e.target
      );
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setContactForm({ name: "", email: "", message: "" });
      }, 3200);
    } catch (error) {
      setIsLoading(false);
      alert("Failed to send email. Please try again later.");
      console.error("EmailJS Error:", error);
    }
  };

  const fetchWeather = async (city) => {
    console.log(`Fetching weather for: ${city}`);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cdf925f08107fca1910ea91ca3a3f6d9&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data); // Set the fetched weather data to state
    } catch (error) {
      alert("Failed to fetch weather data. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("App mounted");
    return () => {
      console.log("App unmounted");
    };
  }, []);

  console.log("isAboutOpen:", isAboutOpen);
  console.log("isContactOpen:", isContactOpen);

  return (
    <div className="App">
      <Header
        onToggleTheme={toggleDarkTheme}
        onAboutClick={handleOpenAbout}
        onContactClick={handleOpenContact}
      />
      <Search
        fetchWeather={fetchWeather}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
      <Modals
        isAboutOpen={isAboutOpen}
        isContactOpen={isContactOpen}
        onCloseAbout={handleCloseAbout}
        onCloseContact={handleCloseContact}
        onSubmitContact={handleSubmitContact}
        contactForm={contactForm}
        onContactChange={handleContactChange}
        onBackgroundClick={onBackgroundClick}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
}

export default App;
