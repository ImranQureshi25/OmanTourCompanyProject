document.addEventListener('DOMContentLoaded', function() {
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let c of cookies) {
            const [key, value] = c.split('=');
            if (key === name) return decodeURIComponent(value);
        }
        return null;
    }

    let userName = getCookie('name');
    let referralSource = getCookie('referral');
    let hasGreeted = sessionStorage.getItem('hasGreeted');
    
    if (!userName || !referralSource) {
        // Prompts for new visitors
        userName = prompt("Welcome to my website! Please enter your name:");
        referralSource = prompt("How did you hear about us?");
        localStorage.setItem('name', userName);
        localStorage.setItem('referral', referralSource);
        alert(`Great to see you, ${userName}! Feel free to contact us if you have any questions!`);
        sessionStorage.setItem('hasGreeted', 'true');
    } else if (!hasGreeted) {
        // Shows welcome back message only if we haven't greeted in this session
        const storedName = localStorage.getItem('name');
        if (storedName) {
            alert(`Welcome back, ${storedName}! It's great to see you again!`);
            sessionStorage.setItem('hasGreeted', 'true');
        }
    }

    document.cookie = `name=${userName}; max-age=${60 * 60 * 24 * 7}; path=/`;
    document.cookie = `referral=${referralSource}; max-age=${60 * 60 * 24 * 7}; path=/`;

    // Initializes EmailJS with your public key
    emailjs.init("NGnoHNIBJboHhKT5N");

    // Gets the contact form element
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            emailjs.sendForm('service_64zhthi', 'template_9in7scq', this)
                .then(function() {
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
        }); // Test form submission works on EmailJS but not directly from website //
    }
});