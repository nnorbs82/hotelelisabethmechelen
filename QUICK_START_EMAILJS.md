# Quick Start Guide - Group Request Form

## For Site Administrator

### What Was Done
A complete group request form has been added to your website at `/grouprequest.html`. Customers can now submit group booking requests through this form.

### What You Need To Do Now
To make the form functional, you need to set up EmailJS (a free email service). This takes about 10-15 minutes.

## EmailJS Setup (3 Simple Steps)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

### Step 2: Connect Your Email & Create Template
1. In EmailJS dashboard, click "Email Services" → "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.) and connect it
3. **Save the Service ID** (e.g., "service_hotel_groups")
4. Click "Email Templates" → "Create New Template"
5. Set template name: "Group Request Form"
6. Set email subject: `New Group Request from {{first_name}} {{last_name}}`
7. Set "To Email" to: `info@elisabeth-hotel.be`
8. Copy the email body from `EMAILJS_SETUP_INSTRUCTIONS.md` (starting at line 23)
9. **Save the Template ID** (e.g., "template_group_request")
10. Go to "Account" and **copy your Public Key**

### Step 3: Update Your Website
Open the file `group-request-form.js` and update these 3 lines:

**Line 4** - Replace `'YOUR_PUBLIC_KEY'` with your actual key:
```javascript
emailjs.init('your_actual_public_key_here');
```

**Line 83-84** - Replace the service and template IDs:
```javascript
const response = await emailjs.send(
    'your_service_id_here',     // e.g., 'service_hotel_groups'
    'your_template_id_here',    // e.g., 'template_group_request'
    templateParams
);
```

### Step 4: Test It
1. Go to your website's group request page
2. Fill out the form completely
3. Submit it
4. Check your email inbox (and spam folder)
5. You should receive an email with all the form details

## That's It!
The form is now live and functional. You'll receive an email every time someone submits a group request.

## Need More Details?
- **Complete setup guide**: See `EMAILJS_SETUP_INSTRUCTIONS.md`
- **Technical details**: See `GROUP_REQUEST_IMPLEMENTATION_SUMMARY.md`

## Important Notes
- **Free Tier Limit**: 200 emails per month (should be sufficient for group requests)
- **Upgrade if needed**: If you get more than 200 requests/month, upgrade your EmailJS plan
- **Check spam folder**: First few emails might go to spam

## Support
- **EmailJS issues**: Contact EmailJS support through their dashboard
- **Form technical issues**: Check browser console for error messages
- **Template questions**: See `EMAILJS_SETUP_INSTRUCTIONS.md` for template variables

## Form Features
✅ International phone numbers with country codes
✅ Date pickers for check-in/check-out
✅ Room type selections
✅ Group type and meal options
✅ Additional message area
✅ GDPR-compliant privacy consent
✅ Mobile responsive
✅ Success/error messages

**Screenshot**: https://github.com/user-attachments/assets/39046f84-c8ec-4659-9c56-f47735122295
