// Group Request Form Handler
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('MEiKFhBHfwDzT-xz1');

    const phoneInput = document.querySelector("#telephone");
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "be",
        preferredCountries: ["be", "nl", "de", "fr", "gb"],
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"
    });

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkinInput = document.getElementById('checkin-date-group');
    const checkoutInput = document.getElementById('checkout-date-group');

    const checkinPicker = new DatePicker(checkinInput, {
        defaultDate: today,
        minDate: today,
        onChange: (selectedDate) => {
            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutPicker.setMinDate(nextDay);

            if (checkoutPicker.getDate() < nextDay) {
                checkoutPicker.setDate(nextDay);
            }
        }
    });

    const checkoutPicker = new DatePicker(checkoutInput, {
        defaultDate: tomorrow,
        minDate: tomorrow
    });

    const form = document.getElementById('group-request-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = form.querySelector('.group-request-submit-btn');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!iti.isValidNumber()) {
            alert('Please enter a valid telephone number with country code.');
            phoneInput.focus();
            return;
        }

        const fullPhoneNumber = iti.getNumber();

        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const templateParams = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            telephone: fullPhoneNumber,
            checkinDate: document.getElementById('checkin-date-group').value,
            checkoutDate: document.getElementById('checkout-date-group').value,
            totalGuests: document.getElementById('total-guests').value,
            singleRooms: document.getElementById('single-rooms').value,
            twinRooms: document.getElementById('twin-rooms').value,
            doubleRooms: document.getElementById('double-rooms').value,
            tripleRooms: document.getElementById('triple-rooms').value,
            groupType: document.getElementById('group-type').value,
            mealOption: document.getElementById('meal-option').value,
            message: document.getElementById('message').value || 'No additional message provided'
        };

        try {
            await emailjs.send(
                'service_iu8cxtm',
                'template_3syt07l',
                templateParams
            );

            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            form.reset();
            iti.setCountry('be');
            checkinPicker.setDate(today);
            checkoutPicker.setDate(tomorrow);

        } catch (error) {
            console.error('FAILED...', error);

            errorMessage.style.display = 'block';
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Group Request';
        }
    });
});
