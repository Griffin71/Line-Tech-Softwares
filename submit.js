// Initialize EmailJS
emailjs.init('Ek4O3pznjchURi7UR');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const loadingSpinner = document.getElementById('loading-spinner');

  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');

  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const phoneInput = form.querySelector('#phone');
  const serviceInput = form.querySelector('#service');
  const messageInput = form.querySelector('#message');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorPhone = document.getElementById('error-phone');

  // Regex patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[6-8][0-9]{8}$/;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide previous messages
    formSuccess.classList.add('hidden');
    formError.classList.add('hidden');

    let valid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      errorName.classList.remove('hidden');
      nameInput.classList.add('border-red-300');
      nameInput.classList.remove('border-gray-200');
      valid = false;
    } else {
      errorName.classList.add('hidden');
      nameInput.classList.remove('border-red-300');
      nameInput.classList.add('border-gray-200');
    }

    // Email validation
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      errorEmail.classList.remove('hidden');
      emailInput.classList.add('border-red-300');
      emailInput.classList.remove('border-gray-200');
      valid = false;
    } else {
      errorEmail.classList.add('hidden');
      emailInput.classList.remove('border-red-300');
      emailInput.classList.add('border-gray-200');
    }

    // Phone validation (South African numbers)
    const cleanPhone = phoneInput.value.trim().replace(/\s+/g, '');
    if (!cleanPhone || !phonePattern.test(cleanPhone)) {
      errorPhone.classList.remove('hidden');
      phoneInput.classList.add('border-red-300');
      phoneInput.classList.remove('border-gray-200');
      valid = false;
    } else {
      errorPhone.classList.add('hidden');
      phoneInput.classList.remove('border-red-300');
      phoneInput.classList.add('border-gray-200');
    }

    if (!valid) {
      // Scroll to first error
      const firstError = form.querySelector('.border-red-300');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    // Show loading spinner
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');

    // Prepare EmailJS data
    const formData = {
      user_name: nameInput.value.trim(),
      user_email: emailInput.value.trim(),
      user_phone: phoneInput.value.trim(),
      user_service: serviceInput ? serviceInput.value : 'N/A',
      user_message: messageInput.value.trim(),
      to_email: 'info@linetechsoftwares.co.za', //  company email
      from_name: 'Line Tech Contact Form',       // optional
      reply_to: emailInput.value.trim()          // so you can reply to user
    };

    // Send email via EmailJS
    emailjs.send('service_dlxmp62', 'template_9lgbc28', formData)
      .then(() => {
        formSuccess.classList.remove('hidden');
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        formError.classList.remove('hidden');
      })
      .finally(() => {
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
      });
  });

  // Real-time validation
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) {
      errorName.classList.add('hidden');
      nameInput.classList.remove('border-red-300');
      nameInput.classList.add('border-gray-200');
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() && emailPattern.test(emailInput.value.trim())) {
      errorEmail.classList.add('hidden');
      emailInput.classList.remove('border-red-300');
      emailInput.classList.add('border-gray-200');
    }
  });

  phoneInput.addEventListener('input', () => {
    const cleanPhone = phoneInput.value.trim().replace(/\s+/g, '');
    if (cleanPhone && phonePattern.test(cleanPhone)) {
      errorPhone.classList.add('hidden');
      phoneInput.classList.remove('border-red-300');
      phoneInput.classList.add('border-gray-200');
    }
  });
});
