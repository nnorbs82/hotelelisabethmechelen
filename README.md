# Hotel Elisabeth Mechelen

A modern hotel website with Firebase-powered admin dashboard for content management.

## Features

### Content Management
- **Main Banner Management**: Upload and manage hero slideshow images with drag-and-drop reordering
- **Index Ads Management**: Manage three promotional ad cards with multi-language support (EN/NL/FR)
- **Ads Bottom Management**: NEW - Manage bottom section ads with titles and three promotional cards
- **About Us Management**: Manage the About Us section content in three languages
- **Background Photo Management**: Set page background images

### Multi-language Support
All content supports three languages:
- English (EN) 🇬🇧
- Dutch (NL) 🇳🇱
- French (FR) 🇫🇷

### Security
- Firebase Authentication for admin access
- Secure image upload to Firebase Storage
- XSS protection with proper content escaping
- Database rules for read/write access control

## Admin Dashboard

Access the admin dashboard at `/admin-dashboard.html`

### Update Index Submenu
- Main Banner
- Index Ads
- **Ads Bottom** (NEW)
- About Us

### Ads Bottom Management
The new Ads Bottom feature allows you to manage a promotional section displayed at the bottom of the index page:

**Tabs:**
- **Titles**: Three customizable title fields for the section header
- **Ad 1, Ad 2, Ad 3**: Individual ad cards with:
  - Image upload (Firebase Storage)
  - Title text (multi-language)
  - Body text with line break support (multi-language)

**Firebase Structure:**
See [ADS_BOTTOM_FIREBASE_STRUCTURE.md](./ADS_BOTTOM_FIREBASE_STRUCTURE.md) for complete documentation on:
- Database paths and structure
- Storage paths
- Example data
- Setup instructions

## Documentation

- [ADS_BOTTOM_FIREBASE_STRUCTURE.md](./ADS_BOTTOM_FIREBASE_STRUCTURE.md) - Ads Bottom feature Firebase documentation
- [FIREBASE_ADMIN_SETUP.md](./FIREBASE_ADMIN_SETUP.md) - Admin authentication setup
- [FIREBASE_RULES_SETUP.md](./FIREBASE_RULES_SETUP.md) - Database and Storage rules
- [SETUP.md](./SETUP.md) - General setup instructions

## Running Locally

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server

# Then navigate to http://localhost:8000
```

## Firebase Project
- Project ID: `hotelelisabethmechelen-9dd98`
- Authentication: Email/Password
- Database: Firebase Realtime Database
- Storage: Firebase Storage