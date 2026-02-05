# Translation System - Firebase Setup Guide

## Overview

The Translation Management System allows administrators to manage all static frontend text translations through the admin dashboard. All translations are stored in Firebase Realtime Database and loaded dynamically on the frontend.

## Firebase Realtime Database Structure

The translations are stored under the `translations` node in Firebase Realtime Database with the following structure:

```
translations/
├── nav/
│   ├── home/
│   │   ├── en: "Home"
│   │   ├── nl: "Home"
│   │   └── fr: "Accueil"
│   ├── rooms/
│   │   ├── en: "Rooms"
│   │   ├── nl: "Kamers"
│   │   └── fr: "Chambres"
│   ├── packages/
│   │   ├── en: "Packages"
│   │   ├── nl: "Pakketten"
│   │   └── fr: "Forfaits"
│   ├── facilities/
│   │   ├── en: "Facilities"
│   │   ├── nl: "Faciliteiten"
│   │   └── fr: "Installations"
│   ├── meetings/
│   │   ├── en: "Meetings"
│   │   ├── nl: "Vergaderingen"
│   │   └── fr: "Réunions"
│   ├── info/
│   │   ├── en: "Info"
│   │   ├── nl: "Info"
│   │   └── fr: "Info"
│   ├── more/
│   │   ├── en: "More"
│   │   ├── nl: "Meer"
│   │   └── fr: "Plus"
│   ├── attractions/
│   │   ├── en: "Attractions"
│   │   ├── nl: "Attracties"
│   │   └── fr: "Attractions"
│   ├── groupRequest/
│   │   ├── en: "Group Request"
│   │   ├── nl: "Groepsaanvraag"
│   │   └── fr: "Demande de groupe"
│   └── bookNow/
│       ├── en: "Book Now"
│       ├── nl: "Boek Nu"
│       └── fr: "Réserver"
├── home/
│   ├── title/
│   │   ├── en: "Welcome to Hotel Elisabeth Mechelen"
│   │   ├── nl: "Welkom bij Hotel Elisabeth Mechelen"
│   │   └── fr: "Bienvenue à l'Hôtel Elisabeth Mechelen"
│   ├── checkInLabel/
│   │   ├── en: "Check-in"
│   │   ├── nl: "Inchecken"
│   │   └── fr: "Arrivée"
│   ├── checkOutLabel/
│   │   ├── en: "Check-out"
│   │   ├── nl: "Uitchecken"
│   │   └── fr: "Départ"
│   ├── searchButton/
│   │   ├── en: "Search"
│   │   ├── nl: "Zoeken"
│   │   └── fr: "Rechercher"
│   └── ...
├── rooms/
│   ├── pageTitle/
│   ├── tagline/
│   ├── mainTitle/
│   ├── subtitle/
│   └── ...
├── packages/
│   └── ...
├── facilities/
│   └── ...
├── meetings/
│   └── ...
├── info/
│   └── ...
├── attractions/
│   └── ...
├── groupRequest/
│   └── ...
├── footer/
│   ├── contactTitle/
│   ├── phoneLabel/
│   ├── emailLabel/
│   ├── addressLabel/
│   ├── socialTitle/
│   ├── informationTitle/
│   ├── privacyPolicy/
│   ├── termsConditions/
│   ├── hotelPolicies/
│   └── careers/
└── common/
    ├── loading/
    ├── save/
    ├── cancel/
    ├── delete/
    ├── edit/
    ├── add/
    ├── upload/
    ├── close/
    ├── back/
    ├── next/
    └── previous/
```

### Data Structure Rules

1. **Top-level nodes** represent page sections or categories (e.g., `nav`, `home`, `rooms`, `footer`, `common`)
2. **Second-level nodes** represent specific translation keys (e.g., `home`, `rooms`, `bookNow`)
3. **Third-level nodes** contain the actual translations for each language:
   - `en` - English (default language)
   - `nl` - Dutch (Nederlands)
   - `fr` - French (Français)

### Example Translation Entry

```json
{
  "nav": {
    "home": {
      "en": "Home",
      "nl": "Home",
      "fr": "Accueil"
    },
    "bookNow": {
      "en": "Book Now",
      "nl": "Boek Nu",
      "fr": "Réserver"
    }
  }
}
```

## Firebase Storage

**No Firebase Storage setup is required** for the translation system. All translations are stored in Firebase Realtime Database only.

## Firebase Security Rules

Add the following rules to your Firebase Realtime Database security rules:

```json
{
  "rules": {
    "translations": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

### Rule Explanation

- **`.read: true`** - Allows public read access so frontend pages can load translations without authentication
- **`.write: "auth != null"`** - Only authenticated admin users can write/update translations

## Translation Key Naming Convention

Translation keys follow this naming pattern:

```
{section}.{key}
```

### Examples:
- `nav.home` - Home navigation link
- `nav.bookNow` - Book Now button
- `home.title` - Home page main title
- `footer.contactTitle` - Footer contact section title
- `common.save` - Save button (used across multiple pages)

### Naming Rules:

1. Use **camelCase** for multi-word keys (e.g., `bookNow`, `checkInLabel`)
2. Section names should be **lowercase** and match page names (e.g., `home`, `rooms`, `facilities`)
3. Use descriptive names that indicate the purpose (e.g., `checkInLabel`, `searchButton`)
4. Common elements shared across pages go in the `common` section

## Frontend Integration

### Adding Translation Support to HTML Elements

To make an HTML element load its text from the translation system, add a `data-translate` attribute:

```html
<!-- Navigation -->
<li><a href="index.html" data-translate="nav.home">Home</a></li>
<li><a href="rooms.html" data-translate="nav.rooms">Rooms</a></li>

<!-- Buttons -->
<button data-translate="common.save">Save</button>
<button data-translate="nav.bookNow">Book Now</button>

<!-- Headings -->
<h1 data-translate="home.title">Welcome to Hotel Elisabeth Mechelen</h1>

<!-- Input Placeholders -->
<input type="text" data-translate="home.checkInLabel" placeholder="Check-in">
```

### Include Translation Script

Add the Elisabeth translation script to all frontend HTML pages (except admin pages):

```html
<script type="module" src="elisabeth-translations.js"></script>
```

**Important:** Place this script **after** the `language-switcher.js` script and **before** the closing `</body>` tag.

## Admin Dashboard Usage

### Accessing Translation Management

1. Log in to the admin dashboard at `/admin-dashboard.html`
2. Click on **"Page Translations"** in the left sidebar menu
3. The Translation Management card will open

### Managing Translations

1. **View Translations**: All translation keys are organized by page sections
2. **Edit Translations**: 
   - English values are shown as defaults
   - Enter Dutch (NL) translations in the middle column
   - Enter French (FR) translations in the right column
3. **Save Changes**: Click **"Save All Translations"** to save all changes to Firebase
4. **Load from Firebase**: Click **"Load from Firebase"** to reload translations from the database

### Initial Setup (First Time)

When setting up translations for the first time:

1. Click **"Save All Translations"** to create the initial translation structure in Firebase with English defaults
2. Edit the Dutch (NL) and French (FR) translations for each key
3. Click **"Save All Translations"** again to save your translations
4. Test by changing languages on the frontend

## Migration Process

### Step 1: Create Default Translations in Firebase

1. Open the admin dashboard
2. Navigate to "Page Translations"
3. Click "Save All Translations" to create the initial English translations in Firebase

### Step 2: Add Translations to Frontend HTML

Update your frontend HTML files to use the `data-translate` attribute:

**Before:**
```html
<a href="index.html">Home</a>
```

**After:**
```html
<a href="index.html" data-translate="nav.home">Home</a>
```

The English text remains as fallback in case translations fail to load.

### Step 3: Include Translation Script

Add to each frontend HTML page (except admin pages):

```html
<script type="module" src="elisabeth-translations.js"></script>
```

### Step 4: Add Translations

1. Go to Translation Management in admin dashboard
2. Add Dutch and French translations for each key
3. Save changes

### Step 5: Test

1. Change language using the language switcher
2. Verify all translated text updates correctly
3. Test on all pages (Home, Rooms, Facilities, etc.)

## Troubleshooting

### Translations Not Loading

1. Check browser console for errors
2. Verify Firebase Realtime Database rules allow public read access
3. Ensure `elisabeth-translations.js` is included on the page
4. Verify translations exist in Firebase at `/translations` path

### Translations Not Updating

1. Click "Load from Firebase" in Translation Management
2. Clear browser cache and reload
3. Verify language switcher is working (check localStorage for `selectedLanguage`)

### Default Language Not Working

1. Check that English (`en`) translations exist in Firebase
2. Verify fallback logic in `elisabeth-translations.js`
3. Check that `data-translate` attributes use correct key format

## Adding New Translation Keys

To add new translatable text:

1. **Update admin-dashboard.html**:
   - Add the new key to the `translationKeys` object in the JavaScript section
   - Place it in the appropriate section (nav, home, footer, etc.)

2. **Save to Firebase**:
   - Open Translation Management in admin dashboard
   - Refresh the page to see new keys
   - Add translations for all languages
   - Click "Save All Translations"

3. **Update Frontend HTML**:
   - Add `data-translate="section.key"` to the HTML element

Example:
```javascript
// In admin-dashboard.html translationKeys object
footer: {
    contactTitle: "Contact",
    newKey: "New Text Here"  // Add new key
}
```

```html
<!-- In frontend HTML -->
<span data-translate="footer.newKey">New Text Here</span>
```

## Best Practices

1. **Always provide English translations** - English is the fallback language
2. **Keep keys descriptive** - Use clear names like `checkInLabel` not `label1`
3. **Group by page** - Organize translations by page/section for easier management
4. **Test all languages** - Always test Dutch and French translations
5. **Use common section** - Put reusable text (Save, Cancel, etc.) in `common`
6. **Backup regularly** - Export Firebase data regularly as backup

## Summary

### What needs to be created in Firebase Realtime Database:
- A `translations` node containing all translation data organized by section → key → language

### What needs to be created in Firebase Storage:
- **Nothing** - Translation system uses Realtime Database only

### What keys/paths the frontend reads from:
- Frontend reads from `/translations/{section}/{key}/{language}` path
- Example: `/translations/nav/home/nl` returns "Home" (Dutch)

### Naming rules for translation identifiers:
- Format: `{section}.{key}` (e.g., `nav.home`, `footer.contactTitle`)
- Use camelCase for multi-word keys
- Section names are lowercase and match page names
- Keys are descriptive of their purpose

### Setup steps to perform in Firebase:
1. Update Firebase Realtime Database security rules to allow public read access for translations
2. Open admin dashboard and navigate to Translation Management
3. Click "Save All Translations" to create initial structure
4. Add Dutch and French translations
5. Save changes

---

**Last Updated:** 2026-02-05
**System Version:** 1.0
