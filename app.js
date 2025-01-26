const themeToggleButton = document.querySelector('.contrast');
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// Get the modal, open button, and close button
const modal = document.getElementById('aboutModal');
const aboutLink = document.querySelector('.nav__link:nth-child(1)'); // "About" link
const closeButton = document.querySelector('.close');

// Open the modal when the "About" link is clicked
aboutLink.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close the modal when the "close" button is clicked
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
