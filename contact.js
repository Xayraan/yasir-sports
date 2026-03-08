const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');

if (contactForm && contactMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactMessage.textContent = 'Please complete all required fields.';
      contactMessage.style.color = '#ffb3ba';
      return;
    }

    contactMessage.textContent = 'Message received. Yaasir support will contact you shortly.';
    contactMessage.style.color = '#9cf2ce';
    contactForm.reset();
  });
}