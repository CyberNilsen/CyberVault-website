// Dashboard functionality
document.addEventListener('DOMContentLoaded', async function() {
    // Load user data
    const user = await getCurrentUser();
    if (!user) return;
    
    // Update user info in the sidebar
    updateUserInfo(user);
    
    // Load dashboard data
    loadDashboardData();
    
    // Set up event listeners for dashboard actions
    setupActionButtons();
    
    // Load random coffee quote
    loadRandomCoffeeQuote();
});

// Update user information in the sidebar
function updateUserInfo(user) {
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');
    
    if (userNameElement && userEmailElement) {
        // Get user metadata
        const firstName = user.user_metadata?.first_name || '';
        const lastName = user.user_metadata?.last_name || '';
        
        // Update the DOM
        userNameElement.textContent = firstName && lastName 
            ? `${firstName} ${lastName}` 
            : user.email.split('@')[0];
        userEmailElement.textContent = user.email;
    }
}

// Load dashboard data (placeholder for now)
async function loadDashboardData() {
    // This would typically fetch data from Supabase or another API
    // For now, we'll just simulate loading
    
    // You could add real functionality here to fetch password counts, etc.
    console.log('Dashboard data loaded');
}

// Set up event listeners for dashboard action buttons
function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the action from the button text
            const action = this.textContent.trim();
            
            // Handle different actions
            switch(action) {
                case 'Add Password':
                    showNotification('This feature is coming soon!');
                    break;
                case 'Generate Password':
                    const password = generateRandomPassword();
                    showPasswordModal(password);
                    break;
                case 'Export Data':
                    showNotification('This feature is coming soon!');
                    break;
                case 'Security Check':
                    showNotification('This feature is coming soon!');
                    break;
                default:
                    console.log('Unknown action:', action);
            }
        });
    });
}

// Generate a random secure password
function generateRandomPassword(length = 16) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';
    let password = '';
    
    // Ensure at least one of each character type
    password += getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    password += getRandomChar('abcdefghijklmnopqrstuvwxyz');
    password += getRandomChar('0123456789');
    password += getRandomChar('!@#$%^&*()_-+=<>?');
    
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Shuffle the password
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

// Get a random character from a string
function getRandomChar(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
}

// Show a password in a modal
function showPasswordModal(password) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'password-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    };
    
    const title = document.createElement('h3');
    title.textContent = 'Generated Password';
    
    const passwordDisplay = document.createElement('div');
    passwordDisplay.className = 'password-display';
    passwordDisplay.textContent = password;
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy to Clipboard';
    copyBtn.onclick = function() {
        navigator.clipboard.writeText(password).then(function() {
            copyBtn.textContent = 'Copied!';
            setTimeout(function() {
                copyBtn.textContent = 'Copy to Clipboard';
            }, 2000);
        });
    };
    
    // Assemble the modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(passwordDisplay);
    modalContent.appendChild(copyBtn);
    modal.appendChild(modalContent);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .password-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            position: relative;
            width: 90%;
            max-width: 500px;
        }
        .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        .password-display {
            background-color: var(--light-accent);
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-family: monospace;
            font-size: 18px;
            word-break: break-all;
            text-align: center;
            color: var(--primary-color);
        }
        .copy-btn {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            font-weight: 600;
        }
        .copy-btn:hover {
            background-color: var(--accent-color);
        }
    `;
    document.head.appendChild(style);
    
    // Add the modal to the page
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

// Show a notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease-out, fadeOut 0.5s ease-out 2.5s forwards;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; visibility: hidden; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page and remove after timeout
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Load a random coffee quote
function loadRandomCoffeeQuote() {
    const coffeeQuotes = [
        "Life's too short for weak coffee and weak passwords.",
        "Good passwords are like good coffee: complex, strong, and not easily replicated.",
        "Like brewing the perfect cup of coffee, securing your data takes care and attention to detail.",
        "Security is like coffee: best when it's strong, reliable, and keeps you protected all day long.",
        "Keep your passwords like your coffee: strong, complex, and away from others."
    ];
    
    const quoteElement = document.querySelector('.coffee-quote');
    if (quoteElement) {
        const randomQuote = coffeeQuotes[Math.floor(Math.random() * coffeeQuotes.length)];
        quoteElement.textContent = randomQuote;
    }
}
