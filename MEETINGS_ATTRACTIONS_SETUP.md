# Meetings & Attractions Feature Setup Guide

This document provides instructions for setting up the Firebase Realtime Database Rules, Firebase Storage Rules, and EmailJS integration for the Meetings and Attractions management features.

---

## Firebase Realtime Database Rules

Add the following rules to your Firebase Realtime Database rules to allow proper access to the meetings and attractions data:

```json
{
  "rules": {
    // ... your existing rules ...
    
    "meetings": {
      ".read": true,
      ".write": "auth != null"
    },
    "meetingsPhotos": {
      ".read": true,
      ".write": "auth != null"
    },
    "meetingsMainImage": {
      ".read": true,
      ".write": "auth != null"
    },
    "attractions": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

### Complete Example Rules

If you need a complete rules configuration, here's an example:

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    
    "mainBanner": {
      ".read": true,
      ".write": "auth != null"
    },
    "indexBackground": {
      ".read": true,
      ".write": "auth != null"
    },
    "indexAds": {
      ".read": true,
      ".write": "auth != null"
    },
    "aboutUs": {
      ".read": true,
      ".write": "auth != null"
    },
    "adsBottom": {
      ".read": true,
      ".write": "auth != null"
    },
    "rooms": {
      ".read": true,
      ".write": "auth != null"
    },
    "amenitiesMaster": {
      ".read": true,
      ".write": "auth != null"
    },
    "packages": {
      ".read": true,
      ".write": "auth != null"
    },
    "facilities": {
      ".read": true,
      ".write": "auth != null"
    },
    "facilitiesLibrary": {
      ".read": true,
      ".write": "auth != null"
    },
    "facilitiesHero": {
      ".read": true,
      ".write": "auth != null"
    },
    "meetings": {
      ".read": true,
      ".write": "auth != null"
    },
    "meetingsPhotos": {
      ".read": true,
      ".write": "auth != null"
    },
    "meetingsMainImage": {
      ".read": true,
      ".write": "auth != null"
    },
    "attractions": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

---

## Firebase Storage Rules

Add the following rules to your Firebase Storage rules to allow proper access to meeting and attraction media:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to all files
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow authenticated users to write to specific folders
    match /meetings-photos/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /meetings-videos/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /meetings-main/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /attractions/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    // Your existing storage rules for other folders
    match /main-banner/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /index-ads/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /index-background/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /ads-bottom/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /room-photos/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /room-videos/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /package-images/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /facilities-hero/{allPaths=**} {
      allow write: if request.auth != null;
    }
    
    match /facilities-library/{allPaths=**} {
      allow write: if request.auth != null;
    }
  }
}
```

---

## EmailJS Setup Instructions

The meeting request form uses EmailJS to send emails. Follow these steps to set it up:

### Step 1: Create an EmailJS Account (if you haven't already)

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account or log in to your existing account

### Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select your email provider (e.g., Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (e.g., `service_xxxxxx`)

### Step 3: Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template using these variables:

**Subject:** New Meeting Room Request from {{firstName}} {{lastName}}

**Body Example:**
```
New Meeting Room Request

From: {{firstName}} {{lastName}}
Email: {{email}}
Phone: {{telephone}}

Meeting Details:
- Date: {{meetingDate}}
- Number of Participants: {{participants}}

Message:
{{message}}

---
This request was sent from the Hotel Elisabeth Mechelen website.
```

4. Note down your **Template ID** (e.g., `template_xxxxxx`)

### Step 4: Get Your Public Key

1. In your EmailJS dashboard, go to "Account"
2. Find your **Public Key** (e.g., `user_xxxxxxxxxxxxxxxxxxxxxx`)

### Step 5: Update the meetings.html File

Open `meetings.html` and find the EmailJS configuration section. Replace the placeholder values with your actual credentials:

```javascript
// Initialize EmailJS with your public key
emailjs.init('YOUR_PUBLIC_KEY');  // Replace with your actual public key

// In the form submit handler, replace these values:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

**Example with real values:**
```javascript
// Initialize EmailJS with your public key
emailjs.init('user_AbCdEfGhIjKlMnOpQr');

// Send email
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

### Step 6: Test the Form

1. Open the meetings.html page in a browser
2. Fill out the form with test data
3. Submit the form and verify you receive the email

### EmailJS Free Tier Limits

- 200 emails per month
- 2 email templates
- Limited email size

If you need more capacity, consider upgrading to a paid plan.

---

## Firebase Data Structure

### Meetings Data Structure

```
meetings/
  ├── meeting_[timestamp]/
  │   ├── name_en: "Executive Boardroom"
  │   ├── name_nl: "Executive Vergaderzaal"
  │   ├── name_fr: "Salle de conférence exécutive"
  │   ├── description_en: "..."
  │   ├── description_nl: "..."
  │   ├── description_fr: "..."
  │   ├── setupStyles_en: ["Theater Style", "U-Shape", ...]
  │   ├── setupStyles_nl: ["Theaterstijl", "U-vorm", ...]
  │   ├── setupStyles_fr: ["Style théâtre", "Forme en U", ...]
  │   ├── facilities_en: ["Projector", "Whiteboard", ...]
  │   ├── facilities_nl: ["Projector", "Whiteboard", ...]
  │   ├── facilities_fr: ["Projecteur", "Tableau blanc", ...]
  │   ├── food_en: "Coffee breaks and lunch available"
  │   ├── food_nl: "Koffiepauzes en lunch beschikbaar"
  │   ├── food_fr: "Pauses café et déjeuner disponibles"
  │   ├── parking_en: "Free parking available"
  │   ├── parking_nl: "Gratis parkeren beschikbaar"
  │   ├── parking_fr: "Parking gratuit disponible"
  │   ├── accommodation_en: "Special rates for overnight stays"
  │   ├── accommodation_nl: "Speciale tarieven voor overnachtingen"
  │   ├── accommodation_fr: "Tarifs spéciaux pour les nuitées"
  │   ├── video: { url: "...", filename: "..." }  // Optional
  │   └── timestamp: 1234567890
  └── ...

meetingsPhotos/
  ├── meeting_[timestamp]/
  │   ├── [photo_timestamp]/
  │   │   ├── url: "https://..."
  │   │   ├── filename: "meetings-photos/..."
  │   │   ├── timestamp: 1234567890
  │   │   └── order: 0
  │   └── ...
  └── ...

meetingsMainImage/
  ├── url: "https://..."
  ├── filename: "meetings-main/..."
  └── timestamp: 1234567890
```

### Attractions Data Structure

```
attractions/
  ├── attraction_[timestamp]/
  │   ├── title_en: "St. Rumbold's Tower"
  │   ├── title_nl: "Sint-Romboutstoren"
  │   ├── title_fr: "Tour Saint-Rombaut"
  │   ├── description_en: "..."
  │   ├── description_nl: "..."
  │   ├── description_fr: "..."
  │   ├── link: "https://www.example.com"
  │   ├── image: { url: "...", filename: "..." }
  │   └── timestamp: 1234567890
  └── ...
```

---

## Troubleshooting

### Form Submissions Not Working

1. Check browser console for errors
2. Verify EmailJS credentials are correct
3. Ensure EmailJS service is connected to your email
4. Check your EmailJS monthly quota

### Images Not Loading

1. Check Firebase Storage rules
2. Verify the image URLs in the database
3. Check browser console for CORS errors

### Data Not Saving

1. Verify you're logged in to the admin dashboard
2. Check Firebase Realtime Database rules
3. Check browser console for permission errors

---

## Support

For issues with:
- **Firebase**: Visit [Firebase Documentation](https://firebase.google.com/docs)
- **EmailJS**: Visit [EmailJS Documentation](https://www.emailjs.com/docs/)
- **Website**: Contact the development team
