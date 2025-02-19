// Select elements
const loginButton = document.querySelector('#hero button'); // Login button inside #hero section
const closeButton = document.getElementById('closeButton');
const overlay = document.getElementById('overlay');
const loginPopup = document.getElementById('loginPopup');
const mainContent = document.querySelector('body'); // Blur the whole page

// Show login popup
loginButton.addEventListener('click', () => {
  mainContent.classList.add('blurred'); // Apply blur effect
  overlay.style.display = 'block'; // Show overlay
  loginPopup.style.display = 'block'; // Show popup
});

// Close login popup
closeButton.addEventListener('click', () => {
  mainContent.classList.remove('blurred'); // Remove blur effect
  overlay.style.display = 'none'; // Hide overlay
  loginPopup.style.display = 'none'; // Hide popup
});

// Close popup when clicking outside it
overlay.addEventListener('click', () => {
  closeButton.click();
});