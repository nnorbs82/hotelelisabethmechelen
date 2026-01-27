# Packages Firebase Structure

## Overview
This document describes the Firebase Realtime Database structure and Firebase Storage paths required for the Package Management feature.

## Firebase Realtime Database Structure

The Packages data is stored in the Firebase Realtime Database under the path `/packages`.

### Database Path
```
/packages
```

### Complete Data Structure
```json
{
  "packages": {
    "pkg_1706345678901": {
      "imageUrl": "String - Firebase Storage URL for package image",
      "title_en": "String - Package title in English",
      "title_nl": "String - Package title in Dutch",
      "title_fr": "String - Package title in French",
      "description_en": "String - Package description in English",
      "description_nl": "String - Package description in Dutch",
      "description_fr": "String - Package description in French",
      "inclusions_en": "String - Package inclusions in English (one per line)",
      "inclusions_nl": "String - Package inclusions in Dutch (one per line)",
      "inclusions_fr": "String - Package inclusions in French (one per line)",
      "goodToKnow_en": "String - Good to know information in English (one per line)",
      "goodToKnow_nl": "String - Good to know information in Dutch (one per line)",
      "goodToKnow_fr": "String - Good to know information in French (one per line)",
      "bookingLink": "String - URL for booking/action link",
      "status": "String - 'active' or 'inactive'"
    },
    "pkg_1706345678902": {
      // Another package with same structure
    }
  }
}
```

### Example Data
```json
{
  "packages": {
    "pkg_1706345678901": {
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/hotelelisabethmechelen-9dd98.appspot.com/o/packages%2F1706345678901-romantic-package.jpg?alt=media&token=...",
      "title_en": "Romantic Getaway Package",
      "title_nl": "Romantisch Uitje Pakket",
      "title_fr": "Forfait Escapade Romantique",
      "description_en": "Experience a romantic escape with your loved one in our luxurious accommodations. This package includes everything you need for an unforgettable stay.",
      "description_nl": "Beleef een romantische ontsnapping met je geliefde in onze luxe accommodaties. Dit pakket bevat alles wat je nodig hebt voor een onvergetelijk verblijf.",
      "description_fr": "Vivez une escapade romantique avec votre bien-aimé dans nos hébergements luxueux. Ce forfait comprend tout ce dont vous avez besoin pour un séjour inoubliable.",
      "inclusions_en": "2 nights accommodation\nChampagne on arrival\nRomantic dinner for two\nBreakfast in bed\nLate checkout",
      "inclusions_nl": "2 nachten accommodatie\nChampagne bij aankomst\nRomantisch diner voor twee\nOntbijt op bed\nLate checkout",
      "inclusions_fr": "2 nuits d'hébergement\nChampagne à l'arrivée\nDîner romantique pour deux\nPetit déjeuner au lit\nDépart tardif",
      "goodToKnow_en": "Valid until December 2026\nSubject to availability\nAdvance booking required",
      "goodToKnow_nl": "Geldig tot december 2026\nOnder voorbehoud van beschikbaarheid\nReservering vooraf vereist",
      "goodToKnow_fr": "Valable jusqu'en décembre 2026\nSous réserve de disponibilité\nRéservation préalable requise",
      "bookingLink": "https://www.booking.com/hotel/be/elisabeth-mechelen.html",
      "status": "active"
    },
    "pkg_1706345678902": {
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/hotelelisabethmechelen-9dd98.appspot.com/o/packages%2F1706345678902-business-package.jpg?alt=media&token=...",
      "title_en": "Business Traveler Package",
      "title_nl": "Zakelijke Reiziger Pakket",
      "title_fr": "Forfait Voyageur d'Affaires",
      "description_en": "Perfect for business travelers who need comfort and convenience. Work efficiently and relax after a productive day.",
      "description_nl": "Perfect voor zakelijke reizigers die comfort en gemak nodig hebben. Werk efficiënt en ontspan na een productieve dag.",
      "description_fr": "Parfait pour les voyageurs d'affaires qui ont besoin de confort et de commodité. Travaillez efficacement et détendez-vous après une journée productive.",
      "inclusions_en": "Free high-speed WiFi\nAccess to business center\nFree parking\nFlexible check-in/out\nComplimentary coffee",
      "inclusions_nl": "Gratis hoge snelheid WiFi\nToegang tot business center\nGratis parkeren\nFlexibele check-in/uit\nGratis koffie",
      "inclusions_fr": "WiFi haut débit gratuit\nAccès au centre d'affaires\nParking gratuit\nEnregistrement/départ flexible\nCafé offert",
      "goodToKnow_en": "Available year-round\nExtendable stays possible\nMeeting rooms available on request",
      "goodToKnow_nl": "Het hele jaar beschikbaar\nVerlengbare verblijven mogelijk\nVergaderzalen op aanvraag beschikbaar",
      "goodToKnow_fr": "Disponible toute l'année\nSéjours prolongeables possibles\nSalles de réunion disponibles sur demande",
      "bookingLink": "https://www.booking.com/hotel/be/elisabeth-mechelen.html",
      "status": "active"
    }
  }
}
```

## Firebase Storage Structure

Images for packages are stored in Firebase Storage under the following path:

### Storage Path
```
/packages/
```

### File Naming Convention
Images are automatically named using the following pattern:
```
{timestamp}-{originalFilename}
```

Example:
- `packages/1706345678901-romantic-package.jpg`
- `packages/1706345678902-business-package.png`
- `packages/1706345678903-family-package.jpg`

### Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

## Firebase Rules Setup

### Updated Realtime Database Rules

You need to add the `packages` node to your existing database rules:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "mainBanner": {
      ".read": true,
      ".write": "auth != null"
    },
    "indexAds": {
      ".read": true,
      ".write": "auth != null"
    },
    "indexBackground": {
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
    "packages": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

### How to apply Database rules:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Click on **Realtime Database** in the left sidebar
4. Click on the **Rules** tab
5. Update the existing rules to include the `packages` node as shown above
6. Click **Publish**

### Updated Storage Rules

You need to add the `packages` folder to your existing storage rules:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow anyone to read files in main-banner folder
    match /main-banner/{fileName} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // Allow anyone to read files in index-ads folder
    match /index-ads/{allPaths=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // Allow anyone to read files in index-background folder
    match /index-background/{allPaths=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // Allow anyone to read files in ads-bottom folder
    match /ads-bottom/{allPaths=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // Allow anyone to read files in packages folder
    match /packages/{allPaths=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // For all other paths, require authentication
    match /{allPaths=**} {
      allow read: if request.auth != null;
    }
  }
}
```

### How to apply Storage rules:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Click on **Storage** in the left sidebar
4. Click on the **Rules** tab
5. Update the existing rules to include the `packages` folder as shown above
6. Click **Publish**

## Using the Admin Dashboard

### Accessing Package Management
1. Login to the admin dashboard at `admin-dashboard.html`
2. Click on **MENU** button
3. Click on **Manage Packages**

### Managing Packages

#### Adding a New Package
1. Click on **Add New Package** button
2. Upload a package image (recommended size: 1200x800px or similar aspect ratio)
3. Fill in the package details in all three languages (EN, NL, FR):
   - Title
   - Description
   - Inclusions (one per line)
   - Good to Know (one per line)
4. Enter the booking/action link URL
5. Set the status (Active/Inactive)
6. Click **Save Package**

#### Editing a Package
1. Find the package in the list
2. Click the **Edit** button
3. Modify the details as needed
4. Click **Save Package**

#### Deleting a Package
1. Find the package in the list
2. Click the **Delete** button
3. Confirm the deletion

#### Reordering Packages
1. Click and drag a package by the drag handle (⋮⋮)
2. Drop it in the desired position
3. The order is saved automatically

#### Activating/Deactivating Packages
1. Find the package in the list
2. Click the **Activate** or **Deactivate** button
3. The package will move to the appropriate tab

### Viewing Active/Inactive Packages
- Click on **Active Packages** tab to view packages visible to guests
- Click on **Inactive Packages** tab to view packages hidden from guests

## Frontend Display (packages.html)

The Packages page automatically loads and displays packages when:
1. Data exists in the `/packages` database path
2. Packages have `status: "active"`

The page includes:
- Beige background color
- Vertical listing of packages
- Package image
- Package title
- Package description
- Package inclusions list
- Good to Know information
- Book button with the stored booking URL
- Multi-language support (based on browser language)

## Security Considerations

- **Authentication Required for Admin**: Only authenticated admin users can create, edit, or delete packages
- **Public Read Access**: The packages are publicly readable so they can be displayed on the website
- **No Public Write Access**: Public users cannot create or modify packages
- **Image Validation**: Only image files can be uploaded
- **URL Sanitization**: Booking URLs are validated to ensure they're proper URLs

## Data Structure Notes

### Multi-language Fields
All text content supports three languages:
- English (en) 🇬🇧
- Dutch (nl) 🇳🇱
- French (fr) 🇫🇷

### Line-separated Lists
The following fields support multiple items separated by newlines:
- `inclusions_[lang]` - Package inclusions
- `goodToKnow_[lang]` - Good to know information

When displaying on the frontend, split these by newline (`\n`) to create list items.

### Package Status
- `active` - Package is visible on the frontend
- `inactive` - Package is hidden from the frontend but preserved in the database

### Package ID Format
Package IDs are automatically generated in the format: `pkg_{timestamp}`
Example: `pkg_1706345678901`

## Troubleshooting

### Packages not displaying on frontend
- Verify data exists in Firebase Realtime Database at `/packages`
- Check that packages have `status: "active"`
- Check browser console for errors
- Verify Firebase rules allow public read access to packages

### Images not uploading
- Check file size (should be < 10MB)
- Verify file format is supported (jpg, png, gif, webp)
- Check Firebase Storage rules allow authenticated writes to `packages/` folder
- Verify admin is logged in

### Changes not reflecting immediately
- Clear browser cache
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check Firebase Console to verify data was saved

## Performance Considerations

- Images are loaded from Firebase CDN for optimal performance
- Package data is cached locally to reduce database reads
- Recommended image size: 1200x800px or 16:9 aspect ratio
- Image file size should be optimized (< 500KB recommended)

## Contact
For additional help or questions about the Firebase setup, refer to the [Firebase Documentation](https://firebase.google.com/docs).
