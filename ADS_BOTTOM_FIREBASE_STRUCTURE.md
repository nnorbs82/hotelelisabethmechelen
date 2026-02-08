# Ads Bottom Firebase Structure

## Overview
This document describes the Firebase Realtime Database structure and Firebase Storage paths required for the Ads Bottom feature.

## Firebase Realtime Database Structure

The Ads Bottom data is stored in the Firebase Realtime Database under the path `/adsBottom`.

### Database Path
```
/adsBottom
```

### Complete Data Structure
```json
{
  "adsBottom": {
    "titles": {
      "title1_en": "String - First title in English",
      "title1_nl": "String - First title in Dutch",
      "title1_fr": "String - First title in French",
      "title2_en": "String - Second title in English",
      "title2_nl": "String - Second title in Dutch",
      "title2_fr": "String - Second title in French",
      "title3_en": "String - Third title in English",
      "title3_nl": "String - Third title in Dutch",
      "title3_fr": "String - Third title in French"
    },
    "ad1": {
      "imageUrl": "String - Firebase Storage URL for Ad 1 image",
      "title_en": "String - Ad 1 title in English",
      "title_nl": "String - Ad 1 title in Dutch",
      "title_fr": "String - Ad 1 title in French",
      "body_en": "String - Ad 1 body text in English",
      "body_nl": "String - Ad 1 body text in Dutch",
      "body_fr": "String - Ad 1 body text in French"
    },
    "ad2": {
      "imageUrl": "String - Firebase Storage URL for Ad 2 image",
      "title_en": "String - Ad 2 title in English",
      "title_nl": "String - Ad 2 title in Dutch",
      "title_fr": "String - Ad 2 title in French",
      "body_en": "String - Ad 2 body text in English",
      "body_nl": "String - Ad 2 body text in Dutch",
      "body_fr": "String - Ad 2 body text in French"
    },
    "ad3": {
      "imageUrl": "String - Firebase Storage URL for Ad 3 image",
      "title_en": "String - Ad 3 title in English",
      "title_nl": "String - Ad 3 title in Dutch",
      "title_fr": "String - Ad 3 title in French",
      "body_en": "String - Ad 3 body text in English",
      "body_nl": "String - Ad 3 body text in Dutch",
      "body_fr": "String - Ad 3 body text in French"
    }
  }
}
```

### Example Data
```json
{
  "adsBottom": {
    "titles": {
      "title1_en": "DISCOVER OUR SERVICES",
      "title1_nl": "ONTDEK ONZE DIENSTEN",
      "title1_fr": "DÉCOUVREZ NOS SERVICES",
      "title2_en": "Premium Amenities",
      "title2_nl": "Premium voorzieningen",
      "title2_fr": "Équipements premium",
      "title3_en": "Exceptional Experience",
      "title3_nl": "Uitzonderlijke ervaring",
      "title3_fr": "Expérience exceptionnelle"
    },
    "ad1": {
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/hotelelisabethmechelen-9dd98.appspot.com/o/ads-bottom%2Fad1-1234567890-spa.jpg?alt=media&token=...",
      "title_en": "Exclusive Spa",
      "title_nl": "Exclusief Spa",
      "title_fr": "Spa Exclusif",
      "body_en": "Relax and rejuvenate in our world-class spa facilities.\nExperience ultimate comfort and tranquility.",
      "body_nl": "Ontspan en revitaliseer in onze spa-faciliteiten van wereldklasse.\nErvaar ultiem comfort en rust.",
      "body_fr": "Détendez-vous et ressourcez-vous dans nos installations de spa de classe mondiale.\nDécouvrez le confort et la tranquillité ultimes."
    },
    "ad2": {
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/hotelelisabethmechelen-9dd98.appspot.com/o/ads-bottom%2Fad2-1234567891-restaurant.jpg?alt=media&token=...",
      "title_en": "Fine Dining",
      "title_nl": "Gastronomisch restaurant",
      "title_fr": "Gastronomie",
      "body_en": "Savor exquisite cuisine prepared by our master chefs.\nA culinary journey you won't forget.",
      "body_nl": "Geniet van heerlijke gerechten bereid door onze meesterchefs.\nEen culinaire reis die u niet zult vergeten.",
      "body_fr": "Savourez une cuisine exquise préparée par nos chefs maîtres.\nUn voyage culinaire inoubliable."
    },
    "ad3": {
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/hotelelisabethmechelen-9dd98.appspot.com/o/ads-bottom%2Fad3-1234567892-gym.jpg?alt=media&token=...",
      "title_en": "Fitness Center",
      "title_nl": "Fitnesscentrum",
      "title_fr": "Centre de fitness",
      "body_en": "Stay active with our state-of-the-art fitness equipment.\nYour wellness is our priority.",
      "body_nl": "Blijf actief met onze ultramoderne fitnessapparatuur.\nUw welzijn is onze prioriteit.",
      "body_fr": "Restez actif avec nos équipements de fitness de pointe.\nVotre bien-être est notre priorité."
    }
  }
}
```

## Firebase Storage Structure

Images for the Ads Bottom feature are stored in Firebase Storage under the following path:

### Storage Path
```
/ads-bottom/
```

### File Naming Convention
Images are automatically named using the following pattern:
```
{adNumber}-{timestamp}-{originalFilename}
```

Example:
- `ads-bottom/ad1-1706345678901-spa-image.jpg`
- `ads-bottom/ad2-1706345678902-restaurant.png`
- `ads-bottom/ad3-1706345678903-gym-photo.jpg`

### Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

## Setting Up the Database

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Navigate to **Realtime Database** in the left sidebar

### Step 2: Initialize Data Structure
You can manually add the initial structure or wait for the admin to add content through the admin dashboard. The structure will be created automatically when the first data is saved.

To manually initialize (optional):
1. Click on the "+" icon next to your database root
2. Add a new child named `adsBottom`
3. Add the nested structure as shown above with empty strings

### Step 3: Set Database Rules
Ensure your Firebase Realtime Database rules allow:
- Public read access (for website display)
- Authenticated write access (for admin updates)

Example rules (already configured):
```json
{
  "rules": {
    ".read": "auth == null",
    ".write": "auth != null"
  }
}
```

### Step 4: Configure Storage Rules
Ensure your Firebase Storage rules allow:
- Public read access to the `ads-bottom` folder
- Authenticated write access to the `ads-bottom` folder

Example rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /ads-bottom/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Using the Admin Dashboard

### Accessing Ads Bottom Management
1. Login to the admin dashboard at `admin-dashboard.html`
2. Click on **MENU** button
3. Navigate to **Update Index** → **Ads Bottom**

### Managing Titles
1. Click on the **Titles** tab
2. Select your language (EN, NL, or FR)
3. Enter the three titles
4. Click **Save Titles**

### Managing Ads
1. Click on **Ad 1**, **Ad 2**, or **Ad 3** tab
2. Select your language
3. Upload an image (recommended size: 1200x800px or similar aspect ratio)
4. Enter the ad title
5. Enter the ad body text (use Enter key for line breaks)
6. Click **Save Ad**

## Frontend Display

The Ads Bottom section automatically loads on the index page (`index.html`) when:
1. Data exists in the `/adsBottom` database path
2. All three ads and titles are configured

The section includes:
- Three title lines at the top
- Three ad cards displayed in a grid (desktop) or stacked (mobile)
- Black background with 0.55 opacity overlay
- Minimum height of 700px
- Responsive design for all screen sizes

## Troubleshooting

### Section not displaying on frontend
- Verify data exists in Firebase Realtime Database at `/adsBottom`
- Check browser console for errors
- Ensure all required fields are populated (titles and all three ads)

### Images not uploading
- Check file size (should be < 10MB)
- Verify file format is supported
- Check Firebase Storage rules allow authenticated writes
- Verify admin is logged in

### Changes not reflecting immediately
- Clear browser cache
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check Firebase Console to verify data was saved

## Additional Notes

### Multi-language Support
All content fields support three languages:
- English (en) 🇬🇧
- Dutch (nl) 🇳🇱
- French (fr) 🇫🇷

The frontend automatically displays content based on the browser's language preference.

### Security
- Images are validated to ensure they are proper image files
- Image URLs are sanitized to only allow Firebase Storage URLs
- All text content is properly escaped to prevent XSS attacks
- Only authenticated admins can upload images and modify content

### Performance
- Images are loaded from Firebase CDN for optimal performance
- Section only loads when data is available (hidden by default)
- Responsive images adjust to screen size

## Contact
For additional help or questions about the Firebase setup, refer to the [Firebase Documentation](https://firebase.google.com/docs).
