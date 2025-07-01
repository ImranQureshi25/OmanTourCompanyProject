document.addEventListener('DOMContentLoaded', function() {

    // Initializes EmailJS with public key
      (function () {
    emailjs.init({
      publicKey: 'Dq01G2bPxf1mPTqWv',
    });
  })();

    // Gets the contact form element
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Defines the template parameters
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                user_phone: document.getElementById('phone').value,
                tour_type: document.getElementById('tour-type').value,
                message: document.getElementById('message').value
            };

            console.log('Sending form data:', this);
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            emailjs.send('service_64zhthi', 'template_9in7scq', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response);
                    alert('Message sent successfully!');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    alert('Failed to send message. Please try again.');
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }
});