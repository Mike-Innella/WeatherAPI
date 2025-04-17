import React from "react";

const Modals = ({
  isAboutOpen,
  isContactOpen,
  onCloseAbout,
  onCloseContact,
  onSubmitContact,
  contactForm,
  onContactChange,
  onBackgroundClick,
  isLoading,
  isSuccess,
}) => {
  return (
    <div>
      {/* Modal Background */}
      <div
        className={`modal__background ${
          isAboutOpen || isContactOpen ? "show" : ""
        }`}
        id="modalBackground"
        onClick={onBackgroundClick}
      ></div>

      {/* About Modal */}
      {isAboutOpen && (
        <div
          id="aboutModal"
          className={`modal__about modal ${isAboutOpen ? "show" : ""}`}
        >
          <div className="modal-content">
            <span className="close" onClick={onCloseAbout}>
              &times;
            </span>
            <p>
              This application provides weather updates for locations around the
              world. Enter a location in the search bar to get started!
            </p>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactOpen && (
        <div
          id="contactModal"
          className={`modal__contact modal ${isContactOpen ? "show" : ""}`}
        >
          <div className="modal-content">
            <span className="close" onClick={onCloseContact}>
              &times;
            </span>
            <p>We'd love to hear from you!</p>
            <form id="contactModalForm" onSubmit={onSubmitContact}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={onContactChange}
                required
              />
              <label htmlFor="email">E-mail Address</label>
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={onContactChange}
                required
              />
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={onContactChange}
                rows="4"
                maxLength="250"
              ></textarea>
              <button className="submit" id="submitBtn" type="submit">
                Submit
              </button>
            </form>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="modal__overlay overlay--loading">
                <i className="fa-solid fa-spinner spinner"></i>
              </div>
            )}

            {/* Success Overlay */}
            {isSuccess && (
              <div className="modal__overlay overlay--success">
                Thank you for your message, we will respond soon!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modals;
