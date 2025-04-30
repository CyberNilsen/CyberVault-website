// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for the fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Random coffee quotes for the quote section
const coffeeQuotes = [
    "Security is like coffee: best when it's strong, reliable, and keeps you protected all day long.",
    "Good passwords are like good coffee: complex, strong, and not easily replicated.",
    "Like brewing the perfect cup of coffee, securing your data takes care and attention to detail.",
    "Life's too short for weak coffee and weak passwords.",
    "Keep your passwords like your coffee: strong, complex, and away from others."
];

// Change the quote every time the page loads
document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.querySelector('.coffee-quote blockquote');
    if (quoteElement) {
        const randomQuote = coffeeQuotes[Math.floor(Math.random() * coffeeQuotes.length)];
        quoteElement.textContent = randomQuote;
    }
});

// Simple form validation for login/signup pages
const validateForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                const errorMsg = input.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.display = 'block';
                }
            } else {
                input.classList.remove('error');
                
                const errorMsg = input.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.style.display = 'none';
                }
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
};

// Initialize form validation
document.addEventListener('DOMContentLoaded', function() {
    validateForm('loginForm');
    validateForm('signupForm');
});
