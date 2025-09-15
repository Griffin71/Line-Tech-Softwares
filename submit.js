 // Initialize EmailJS
  emailjs.init('Ek4O3pznjchURi7UR');

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        service: form.querySelector('#service') ? form.querySelector('#service').value : 'N/A',
        message: form.querySelector('#message').value,
      };

    emailjs.send('service_dlxmp62', 'template_9lgbc28', formData)
        .then(() => {
            const successMsg = document.getElementById('form-success');
            successMsg.textContent = 'Thank you! Your message was sent successfully. We will get back to you soon.';
            successMsg.classList.remove('hidden');
            successMsg.style.color = '#28a745';
            form.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            const errorMsg = document.getElementById('form-success');
            errorMsg.textContent = "Oops! Something went wrong, but it's not your fault. Please try again in a moment or contact us directly. We appreciate your patience!";
            errorMsg.classList.remove('hidden');
            errorMsg.style.color = '#dc3545';
        });
    });
  });