# Visual Guide - Privacy Policy & Terms Management

## Admin Dashboard - New Menu Buttons

The admin dashboard sidebar now includes two new menu items:

```
┌────────────────────────────────┐
│ Admin Dashboard                │
├────────────────────────────────┤
│ Update Index              ›    │
│ Manage Rooms                   │
│ Manage Packages                │
│ Main Images                    │
│ Set Room Amenities             │
│ Manage Facilities              │
│ Manage Meetings                │
│ Manage Attractions             │
│ Manage Info                    │
│ ★ Manage Privacy Policy   ← NEW│
│ ★ Manage Terms & Conditions← NEW│
└────────────────────────────────┘
```

## Modal Interface for Editing

When clicking "Manage Privacy Policy" or "Manage Terms & Conditions", a modal appears:

```
╔════════════════════════════════════════════════════════╗
║  Manage Privacy Policy                             [X] ║
╠════════════════════════════════════════════════════════╣
║  ┌──────┬──────┬──────┐                               ║
║  │🇬🇧 EN│🇳🇱 NL│🇫🇷 FR│  ← Language Tabs               ║
║  └──────┴──────┴──────┘                               ║
║                                                        ║
║  Privacy Policy Content (English)                     ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │ [H] [B] [I] [U] [•] [1.] [🔗] [Clear]  ← Toolbar│ ║
║  ├──────────────────────────────────────────────────┤ ║
║  │                                                  │ ║
║  │  Rich Text Editor Area                          │ ║
║  │  • Format with headers                          │ ║
║  │  • Bold, italic, underline                      │ ║
║  │  • Lists (ordered/unordered)                    │ ║
║  │  • Links                                        │ ║
║  │                                                  │ ║
║  │                                                  │ ║
║  │                                                  │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  [Save Changes]  [Cancel]                             ║
╚════════════════════════════════════════════════════════╝
```

### Rich Text Editor Features:
- **Headers**: H1, H2, H3 for section titles
- **Text Formatting**: Bold, Italic, Underline
- **Lists**: Numbered lists and bullet points
- **Links**: Add hyperlinks to external pages
- **Clean**: Remove all formatting

## Public Pages - Privacy Policy

The public-facing pages now have a modern, clean design:

```
┌────────────────────────────────────────────────────────┐
│ [Hotel Elisabeth Logo]                    [☰ Menu]     │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                     Privacy Policy                      │
│                                                         │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│   │🇬🇧 English│  │🇳🇱 Nederlands│  │🇫🇷 Français│  ← Selector│
│   └──────────┘  └──────────┘  └──────────┘           │
│                                                         │
│ ──────────────────────────────────────────────────────│
│                                                         │
│  # Introduction                                         │
│                                                         │
│  Lorem ipsum dolor sit amet, consectetur adipiscing    │
│  elit. Sed do eiusmod tempor incididunt ut labore et   │
│  dolore magna aliqua.                                  │
│                                                         │
│  ## Data Collection                                     │
│                                                         │
│  1. Personal Information                                │
│  2. Usage Data                                         │
│  3. Cookies and Tracking                               │
│                                                         │
│  ### What We Collect                                    │
│                                                         │
│  We collect the following types of information:        │
│  • Name and contact details                            │
│  • Booking information                                 │
│  • Payment details                                     │
│                                                         │
│  [More content...]                                      │
│                                                         │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ FOOTER                                                  │
│ [Logo] [Contact] [Social Media] [Information Links]    │
│ © 2026 Hotel Elisabeth Mechelen                        │
└────────────────────────────────────────────────────────┘
```

## Language Switching Behavior

### Initial Load:
- Page loads with **English** content by default
- English button is highlighted (black background, beige text)
- Content area shows English version

### After Clicking Dutch Button:
```
Selected: 🇳🇱 Nederlands (highlighted)
Others:   🇬🇧 English, 🇫🇷 Français (sage background)

Content switches to Dutch version instantly
No page reload required
```

### After Clicking French Button:
```
Selected: 🇫🇷 Français (highlighted)
Others:   🇬🇧 English, 🇳🇱 Nederlands (sage background)

Content switches to French version instantly
No page reload required
```

## Color Theme

The implementation uses the website's existing color scheme:

```
┌─────────────────┬────────────────────────────┐
│ Black (#000000) │ Text, active buttons       │
│ Beige (#D4D3C3) │ Accents, hover states      │
│ Sage (#959380)  │ Buttons, borders, links    │
│ White (#FFFFFF) │ Backgrounds, button text   │
└─────────────────┴────────────────────────────┘
```

### Button States:
```
Normal State:     [Sage background, White text]
Hover State:      [Beige background, Black text]
Active State:     [Black background, Beige text]
```

## Responsive Design

### Desktop (>768px):
- Language buttons in horizontal row
- Full-width editor
- Generous spacing

### Tablet (768px):
- Language buttons wrap if needed
- Adapted content width
- Touch-friendly buttons

### Mobile (<768px):
- Stacked language buttons
- Full-width content
- Larger touch targets
- Collapsible menu

## Data Flow

```
┌─────────────────────────────────────────────────────┐
│                   ADMIN WORKFLOW                     │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │  Admin clicks button in sidebar │
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Load existing data from Firebase│
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Show modal with Quill editors   │
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Admin edits content (3 languages)│
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │  Admin clicks "Save Changes"    │
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Data saved to Firebase Database │
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │  Success alert shown to admin   │
        └─────────────────────────────────┘


┌─────────────────────────────────────────────────────┐
│                  VISITOR WORKFLOW                    │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Visitor opens public page       │
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Show loading indicator          │
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Load content from Firebase      │
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Display English content (default)│
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Visitor clicks language button  │
        └─────────────────────────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ Content switches to new language│
        │ (instant, no reload)            │
        └─────────────────────────────────┘
```

## Firebase Data Structure

```
Firebase Realtime Database
│
├── privacyPolicy/
│   ├── en: "<p>Privacy policy content in English...</p>"
│   ├── nl: "<p>Privacybeleid inhoud in het Nederlands...</p>"
│   └── fr: "<p>Contenu de la politique de confidentialité en français...</p>"
│
└── termsAndConditions/
    ├── en: "<p>Terms and conditions content in English...</p>"
    ├── nl: "<p>Algemene voorwaarden inhoud in het Nederlands...</p>"
    └── fr: "<p>Contenu des termes et conditions en français...</p>"
```

### Firebase Rules:
```json
{
  "privacyPolicy": {
    ".read": true,           // Anyone can read
    ".write": "auth != null" // Only authenticated users can write
  },
  "termsAndConditions": {
    ".read": true,           // Anyone can read
    ".write": "auth != null" // Only authenticated users can write
  }
}
```

## Integration Points

### Files Modified:
1. **admin-dashboard.html**
   - Added Quill CDN links
   - Added 2 new menu buttons
   - Added ~300 lines of JavaScript for modals and Firebase

2. **styles.css**
   - Added ~80 lines for modal styling
   - Integrated with existing color scheme

3. **privacypolicy.html**
   - Complete redesign (~280 lines)
   - Language selector
   - Firebase integration

4. **termsandconditions.html**
   - Complete redesign (~280 lines)
   - Language selector
   - Firebase integration

### New Files:
1. **PRIVACY_TERMS_FIREBASE_SETUP.md**
   - Firebase configuration instructions
   - Security rules
   - Troubleshooting guide

2. **PRIVACY_TERMS_IMPLEMENTATION.md**
   - Complete implementation summary
   - Feature documentation
   - Testing checklist

## Success Indicators

✓ Buttons appear in admin sidebar
✓ Modals open without errors
✓ Quill editors load with toolbars
✓ Language tabs switch correctly
✓ Content saves to Firebase
✓ Public pages load without errors
✓ Content displays from Firebase
✓ Language selector works
✓ Styling matches site theme
✓ Responsive on all devices
✓ Documentation complete
