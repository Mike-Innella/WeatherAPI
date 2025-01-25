const themeToggleButton = document.querySelector('.contrast');
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});
