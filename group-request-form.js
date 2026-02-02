// Group Request Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your User ID
    // USER: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');
    
    // Initialize international telephone input
    const phoneInput = document.querySelector("#telephone");
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "be", // Default to Belgium
        preferredCountries: ["be", "nl", "de", "fr", "gb"],
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"
    });
    
    // Initialize date pickers for check-in and check-out
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkinInput = document.getElementById('checkin-date-group');
    const checkoutInput = document.getElementById('checkout-date-group');
    
    const checkinPicker = new DatePicker(checkinInput, {
        defaultDate: today,
        minDate: today,
        onChange: (selectedDate) => {
            // Update checkout date to be at least 1 day after check-in
            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutPicker.setMinDate(nextDay);
            
            // If checkout is before the new minimum, update it
            if (checkoutPicker.getDate() < nextDay) {
                checkoutPicker.setDate(nextDay);
            }
        }
    });
    
    const checkoutPicker = new DatePicker(checkoutInput, {
        defaultDate: tomorrow,
        minDate: tomorrow
    });
    
    // Form submission handler
    const form = document.getElementById('group-request-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = form.querySelector('.submit-btn');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate phone number
        if (!iti.isValidNumber()) {
            alert('Please enter a valid telephone number with country code.');
            phoneInput.focus();
            return;
        }
        
        // Get full phone number with country code
        const fullPhoneNumber = iti.getNumber();
        
        // Hide any previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Disable submit button to prevent double submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Prepare template parameters
        const templateParams = {
            first_name: document.getElementById('first-name').value,
            last_name: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            telephone: fullPhoneNumber,
            checkin_date: document.getElementById('checkin-date-group').value,
            checkout_date: document.getElementById('checkout-date-group').value,
            total_guests: document.getElementById('total-guests').value,
            single_rooms: document.getElementById('single-rooms').value,
            twin_rooms: document.getElementById('twin-rooms').value,
            double_rooms: document.getElementById('double-rooms').value,
            triple_rooms: document.getElementById('triple-rooms').value,
            group_type: document.getElementById('group-type').value,
            meal_option: document.getElementById('meal-option').value,
            message: document.getElementById('message').value || 'No additional message provided'
        };
        
        try {
            // Send email using EmailJS
            // USER: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                templateParams
            );
            
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form
            form.reset();
            iti.setCountry('be'); // Reset phone to Belgium
            
            // Reset date pickers
            checkinPicker.setDate(today);
            checkoutPicker.setDate(tomorrow);
            
        } catch (error) {
            console.error('FAILED...', error);
            
            // Show error message
            errorMessage.style.display = 'block';
            
            // Scroll to error message
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Group Request';
        }
    });
});
