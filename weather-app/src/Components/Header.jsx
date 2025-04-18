import { useState } from "react";

const Header = ({ onAboutClick, onContactClick, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleMobileAboutClick = () => {
    onAboutClick();
    // Leave menu open
  };

  const handleMobileContactClick = () => {
    onContactClick();
    // Leave menu open
  };

  return (
    <header className="header" id="header">
      <div className="header__wrapper">
        <div className="header__title">
          <h1>Weather in Your Area</h1>
        </div>

        <nav className="nav">
          <div id="navList">
            <ul className="nav__list">
              <li className="nav__link" onClick={onAboutClick}>
                About
              </li>
              <li className="nav__link" onClick={onContactClick}>
                Contact Us
              </li>
            </ul>

            <button className="contrast" onClick={onToggleTheme}>
              <i className="fa fa-adjust"></i>
            </button>

            <button className="burgerBtn" onClick={toggleMenu}>
              <i className="fa fa-bars"></i>
            </button>
          </div>

          <div className={`menu ${menuOpen ? "menu--open" : ""}`}>
            <button className="burgerClose" onClick={toggleMenu}>
              X
            </button>
            <ul className="nav__list--burger">
              <li className="nav__link" onClick={handleMobileAboutClick}>
                About
              </li>
              <li className="nav__link" onClick={handleMobileContactClick}>
                Contact Us
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
