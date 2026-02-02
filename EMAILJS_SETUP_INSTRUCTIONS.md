# EmailJS Setup Instructions for Group Request Form

This document provides step-by-step instructions for setting up EmailJS to handle the group request form submissions.

## Prerequisites
- An EmailJS account (free tier is sufficient)
- Access to the email account you want to use for receiving group requests

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. After logging in, go to the **Email Services** section
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication process to connect your email account
5. Give your service a name (e.g., "Hotel Elisabeth Group Requests")
6. Note down the **Service ID** - you'll need this later
7. Click "Create Service"

## Step 3: Create an Email Template

1. Go to the **Email Templates** section
2. Click "Create New Template"
3. Give your template a name (e.g., "Group Request Form")
4. Use the following template structure:

### Email Subject:
```
New Group Request from {{first_name}} {{last_name}}
```

### Email Body:
```
New Group Request Submission

Contact Information:
- Name: {{first_name}} {{last_name}}
- Email: {{email}}
- Telephone: {{telephone}}

Booking Details:
- Check-in Date: {{checkin_date}}
- Check-out Date: {{checkout_date}}
- Total Number of Guests: {{total_guests}}

Room Requirements:
- Single Rooms: {{single_rooms}}
- Twin Rooms (2 separate beds): {{twin_rooms}}
- Double Rooms (1 double bed): {{double_rooms}}
- Triple Rooms (3 single beds): {{triple_rooms}}

Group Information:
- Group Type: {{group_type}}
- Meal Option: {{meal_option}}

Additional Message:
{{message}}

---
This request was submitted through the Hotel Elisabeth Mechelen website group request form.
The customer has agreed to the privacy policy and data usage terms.
```

5. Set the "To Email" to your hotel's email address (e.g., info@elisabeth-hotel.be)
6. Optionally, set a "Reply To" field to `{{email}}` so you can reply directly to the customer
7. Note down the **Template ID** - you'll need this later
8. Click "Save"

## Step 4: Get Your Public Key

1. Go to the **Account** section
2. Find your **Public Key** (also called API Key)
3. Copy this key - you'll need it for the configuration

## Step 5: Configure the Website

Update the file `/home/runner/work/hotelelisabethmechelen/hotelelisabethmechelen/group-request-form.js`:

1. Find line 4 and replace `'YOUR_PUBLIC_KEY'` with your actual EmailJS Public Key:
```javascript
emailjs.init('YOUR_ACTUAL_PUBLIC_KEY_HERE');
```

2. Find line 83 and replace the placeholders:
```javascript
const response = await emailjs.send(
    'YOUR_SERVICE_ID',      // Replace with your Service ID from Step 2
    'YOUR_TEMPLATE_ID',     // Replace with your Template ID from Step 3
    templateParams
);
```

### Example Configuration:
```javascript
// Line 4
emailjs.init('AbCdEf12345GhIjK');

// Line 83-86
const response = await emailjs.send(
    'service_hotel_groups',
    'template_group_request',
    templateParams
);
```

## Step 6: Test the Form

1. Open the group request page in your browser
2. Fill out the form completely
3. Submit the form
4. Check your email inbox for the group request submission
5. Verify all fields are populated correctly in the email

## Important Notes

### Security
- Never commit your actual EmailJS keys to a public repository
- The public key is designed to be used in client-side code
- EmailJS has built-in spam protection and rate limiting

### EmailJS Free Tier Limits
- 200 emails per month
- If you need more, upgrade to a paid plan

### Troubleshooting

**Form doesn't submit:**
- Check browser console for errors
- Verify all three IDs (Public Key, Service ID, Template ID) are correct
- Ensure the email service is properly connected

**Emails not received:**
- Check your spam folder
- Verify the "To Email" in the template is correct
- Check your EmailJS dashboard for delivery logs

**Validation errors:**
- Ensure all required fields are filled
- Verify the phone number is valid with country code
- Check that check-out date is after check-in date

### Support
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Available through their dashboard

## Template Variables Reference

The following variables are available in your email template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{first_name}}` | Customer's first name | John |
| `{{last_name}}` | Customer's last name | Smith |
| `{{email}}` | Customer's email address | john.smith@example.com |
| `{{telephone}}` | Full phone number with country code | +32 123 45 67 89 |
| `{{checkin_date}}` | Check-in date | 2026-03-15 |
| `{{checkout_date}}` | Check-out date | 2026-03-17 |
| `{{total_guests}}` | Total number of guests | 25 |
| `{{single_rooms}}` | Number of single rooms | 5 |
| `{{twin_rooms}}` | Number of twin rooms | 8 |
| `{{double_rooms}}` | Number of double rooms | 2 |
| `{{triple_rooms}}` | Number of triple rooms | 0 |
| `{{group_type}}` | Type of group | Wedding |
| `{{meal_option}}` | Meal preference | Breakfast Only |
| `{{message}}` | Additional message from customer | We would like... |

## Optional Enhancements

### Auto-Reply to Customer
1. Create a second email template for customer confirmation
2. Set the "To Email" to `{{email}}`
3. Add a second `emailjs.send()` call in the form handler to send confirmation to the customer

### Email Notifications to Multiple Recipients
1. In your email template settings, add CC or BCC addresses
2. This allows multiple team members to receive group requests
