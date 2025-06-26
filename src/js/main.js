// Navigation toggle for mobile
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Smooth close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
    }
  });
});

// Contact form submission via AJAX (Fetch API)
const form = document.getElementById('contact-form');
const statusText = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusText.textContent = 'Đang gửi...';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });

    if (response.ok) {
      statusText.textContent = 'Cảm ơn bạn! Tin nhắn đã được gửi.';
      form.reset();
    } else {
      const data = await response.json();
      if (data.errors) {
        statusText.textContent = data.errors.map(err => err.message).join(', ');
      } else {
        statusText.textContent = 'Có lỗi xảy ra. Vui lòng thử lại sau.';
      }
    }
  } catch (error) {
    statusText.textContent = 'Mạng lỗi. Vui lòng thử lại.';
  }
}); 