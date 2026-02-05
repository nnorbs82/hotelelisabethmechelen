# Firebase Setup Instructions for Translation System

## 📋 Quick Reference

### What to Create in Firebase Realtime Database:
Create a `translations` node at the root level of your database.

### What to Create in Firebase Storage:
**Nothing** - The translation system uses only Realtime Database.

### Frontend Read Paths:
Frontend reads from: `/translations/{section}/{key}/{language}`

Examples:
- `/translations/nav/home/en` → "Home"
- `/translations/nav/home/nl` → "Home" or Dutch translation
- `/translations/home/title/fr` → French home page title

### Translation Key Naming Rules:
- Format: `{section}.{key}` (e.g., `nav.home`, `footer.contactTitle`)
- Use **camelCase** for multi-word keys (e.g., `bookNow`, `checkInLabel`)
- Section names are **lowercase** and match page names
- Descriptive names that indicate purpose

---

## 🔧 Step-by-Step Firebase Setup

### Step 1: Update Firebase Realtime Database Security Rules

1. Open Firebase Console: https://console.firebase.google.com/
2. Select your project: **hotelelisabethmechelen-9dd98**
3. Navigate to: **Realtime Database** → **Rules**
4. Add the following rule for translations:

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

**Important:** If you already have other rules, integrate this rule into your existing structure. For example:

```json
{
  "rules": {
    "mainBannerPhotos": {
      ".read": true,
      ".write": "auth != null"
    },
    "rooms": {
      ".read": true,
      ".write": "auth != null"
    },
    "translations": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

5. Click **"Publish"** to save the rules

**Rule Explanation:**
- `.read: true` → Public read access (allows frontend to load translations without login)
- `.write: "auth != null"` → Only authenticated admins can modify translations

---

### Step 2: Initialize Translation Data

1. Log in to your admin dashboard at: `your-domain.com/admin-dashboard.html`
2. Click **"Page Translations"** in the left sidebar
3. The Translation Management card will open
4. Click **"Save All Translations"** button

This creates the initial Firebase structure with English defaults.

**What happens:**
- Creates `/translations` node in Firebase
- Populates 100+ translation keys with English defaults
- Structure is organized by sections (nav, home, rooms, etc.)

---

### Step 3: Verify Data Structure in Firebase

1. Go to Firebase Console → Realtime Database → Data tab
2. You should see a `translations` node
3. Expand it to verify structure:

```
translations
  ├── nav
  │     ├── home
  │     │     ├── en: "Home"
  │     │     ├── nl: ""
  │     │     └── fr: ""
  │     ├── rooms
  │     │     ├── en: "Rooms"
  │     │     ├── nl: ""
  │     │     └── fr: ""
  │     └── ...
  ├── home
  ├── rooms
  ├── facilities
  └── ...
```

---

### Step 4: Add Dutch and French Translations

1. In the admin dashboard Translation Management card
2. For each text item:
   - English (EN) column shows the default text
   - Enter Dutch translation in the middle (NL) column
   - Enter French translation in the right (FR) column
3. Click **"Save All Translations"** when done

**Tips:**
- You don't need to fill in all translations at once
- Empty translations will fall back to English
- Translations update immediately when saved

---

## 📝 Translation Key Reference

### Complete List of Sections and Keys

#### Navigation Menu (`nav`)
- `home` - Home link
- `rooms` - Rooms link
- `packages` - Packages link
- `facilities` - Facilities link
- `meetings` - Meetings link
- `info` - Info link
- `more` - More dropdown button
- `attractions` - Attractions link
- `groupRequest` - Group Request link
- `bookNow` - Book Now button

#### Home Page (`home`)
- `title` - Main page title
- `checkInLabel` - Check-in label
- `checkOutLabel` - Check-out label
- `searchButton` - Search button
- `aboutUsTitle` - About Us section title
- `ourPicksTitle` - Our Picks section title

#### Rooms Page (`rooms`)
- `pageTitle` - Page title
- `tagline` - Page tagline
- `mainTitle` - Main heading
- `subtitle` - Subtitle
- `sectionTitle` - Section title
- `ctaTitle` - Call-to-action title
- `ctaButton` - Call-to-action button

#### Packages Page (`packages`)
- `pageTitle` - Page title
- `mainTitle` - Main heading
- `subtitle` - Subtitle

#### Facilities Page (`facilities`)
- `pageTitle` - Page title
- `mainTitle` - Main heading
- `subtitle` - Subtitle

#### Meetings Page (`meetings`)
- `pageTitle` - Page title
- `mainTitle` - Main heading
- `subtitle` - Subtitle

#### Info Page (`info`)
- `pageTitle` - Page title
- `mainTitle` - Main heading
- `checkInTitle` - Check-in section title
- `checkOutTitle` - Check-out section title
- `breakfastTitle` - Breakfast section title
- `paymentTitle` - Payment section title
- `servicesTitle` - Services section title
- `generalTitle` - General info title
- `parkingTitle` - Parking section title

#### Attractions Page (`attractions`)
- `pageTitle` - Page title
- `mainTitle` - Main heading
- `subtitle` - Subtitle

#### Group Request Page (`groupRequest`)
- `pageTitle` - Page title
- `mainTitle` - Main heading
- `subtitle` - Subtitle
- `submitButton` - Submit button

#### Footer (`footer`)
- `contactTitle` - Contact section heading
- `phoneLabel` - Phone label
- `emailLabel` - Email label
- `addressLabel` - Address label
- `socialTitle` - Social section heading
- `informationTitle` - Information section heading
- `privacyPolicy` - Privacy Policy link
- `termsConditions` - Terms & Conditions link
- `hotelPolicies` - Hotel Policies link
- `careers` - Careers link

#### Common Elements (`common`)
- `loading` - Loading text
- `save` - Save button
- `cancel` - Cancel button
- `delete` - Delete button
- `edit` - Edit button
- `add` - Add button
- `upload` - Upload button
- `close` - Close button
- `back` - Back button
- `next` - Next button
- `previous` - Previous button

---

## 🧪 Testing the System

### Test in Admin Dashboard:

1. Click "Load from Firebase" - should load translations without errors
2. Edit a translation (e.g., change nav.home Dutch to "Hoofdpagina")
3. Click "Save All Translations"
4. Click "Load from Firebase" again - your changes should persist
5. Check Firebase Console - you should see the updated value

### Test Database Access:

Open browser console and run:
```javascript
// Check if data exists
fetch('https://hotelelisabethmechelen-9dd98-default-rtdb.europe-west1.firebasedatabase.app/translations/nav/home.json')
  .then(r => r.json())
  .then(d => console.log(d));

// Should return: { en: "Home", nl: "...", fr: "..." }
```

---

## ⚠️ Troubleshooting

### "Permission Denied" Error
**Problem:** Can't save translations
**Solution:** 
- Verify you're logged in to admin dashboard
- Check Firebase Realtime Database rules include the translations rule
- Ensure `.write: "auth != null"` is set correctly

### Translations Not Loading
**Problem:** Admin dashboard doesn't load translations
**Solution:**
- Click "Save All Translations" first to create initial data
- Check Firebase Console - verify `/translations` node exists
- Check browser console for error messages

### "Failed to Save" Message
**Problem:** Save button shows error
**Solution:**
- Verify Firebase security rules are published
- Check your Firebase project is active
- Ensure you have editor permissions in Firebase Console

---

## 📊 Data Size Estimate

With 100+ translation keys × 3 languages:
- **Estimated storage:** ~50-100 KB in Realtime Database
- **Read operations:** ~1 read per page load
- **Write operations:** Only when admin saves changes
- **Cost impact:** Minimal (well within free tier limits)

---

## 🔐 Security Best Practices

1. **Public Read Access is Safe:**
   - Translations are public information anyway
   - No sensitive data in translations
   - Same as text directly in HTML

2. **Admin-Only Write:**
   - Only authenticated admins can modify
   - Uses Firebase Authentication
   - Prevents unauthorized changes

3. **Backup Recommendations:**
   - Export Firebase data regularly (JSON export)
   - Keep backup of translation keys in documentation
   - Version control your translation structure

---

## 📚 Additional Resources

- **Full Setup Guide:** See `TRANSLATION_SYSTEM_SETUP.md`
- **Implementation Details:** See `TRANSLATION_IMPLEMENTATION_SUMMARY.md`
- **Firebase Console:** https://console.firebase.google.com/
- **Your Database URL:** https://hotelelisabethmechelen-9dd98-default-rtdb.europe-west1.firebasedatabase.app/

---

**Last Updated:** February 5, 2026
**Firebase Project:** hotelelisabethmechelen-9dd98
**Database Region:** europe-west1
