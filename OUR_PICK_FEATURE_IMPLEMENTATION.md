# Our Pick Feature Implementation Guide

## Overview

This document describes the implementation of the "Our Pick" feature for Hotel Elisabeth Mechelen's package management system. This feature allows administrators to mark specific packages to be prominently displayed on the homepage in a dedicated "Our Picks" section.

## What's New

### 1. Admin Dashboard Enhancement

#### Our Pick Toggle
A new checkbox toggle has been added to the package management modal:
- **Location**: Admin Dashboard → Manage Packages → Add/Edit Package Modal
- **Label**: "Our Pick (Display on Index Page)"
- **Description**: "When enabled, this package will be featured in the 'Our Picks' section on the homepage."
- **Default**: Unchecked (false) for all new packages

#### How It Works
- Administrators can toggle the "Our Pick" checkbox when creating or editing a package
- The `ourPick` boolean field is saved to Firebase along with other package data
- Only packages with `status: 'active'` AND `ourPick: true` appear on the homepage

### 2. Homepage Changes

#### Removed Section
The static welcome card has been removed:
```
"Welcome to Hotel Elisabeth Mechelen
Experience luxury and comfort in the heart of Mechelen.
View Our Rooms"
```

#### New "Our Picks" Section
A new dynamic section now appears between the "Ads Bottom" section and the map:
- **Location**: Between `#ads-bottom-section` and `.map-section`
- **Visibility**: Only displays when there are active packages with `ourPick: true`
- **Design**: Matches the expandable card design from packages.html

### 3. Section Features

#### Multi-Language Support
Section title automatically adapts to browser language:
- **English**: "Our Picks"
- **Dutch**: "Onze Keuzes"
- **French**: "Nos Choix"

#### Expandable Card Design
Each package is displayed as a compact card that expands on click:

**Collapsed State:**
- Package image (400px wide on desktop)
- Package title
- Brief teaser (first 120 characters of description)
- "View Details" button with arrow icon

**Expanded State:**
- Full package image
- Complete description
- Two-column layout:
  - Left: Full description
  - Right: Inclusions list
- "Good to Know" section
- "Book Now" button (if booking link provided)

#### Interactive Elements
- Hover effects on cards and buttons
- Smooth expand/collapse animation
- Only one card can be expanded at a time
- Click "View Details" to expand, "Hide Details" to collapse

## Technical Implementation

### Database Structure

```javascript
/packages
  └── pkg_1706345678901
      ├── imageUrl: "https://..."
      ├── title_en: "Package Title"
      ├── title_nl: "Pakket Titel"
      ├── title_fr: "Titre du forfait"
      ├── description_en: "Description..."
      ├── description_nl: "Beschrijving..."
      ├── description_fr: "Description..."
      ├── inclusions_en: "Item 1\nItem 2\nItem 3"
      ├── inclusions_nl: "Item 1\nItem 2\nItem 3"
      ├── inclusions_fr: "Élément 1\nÉlément 2\nÉlément 3"
      ├── goodToKnow_en: "Info 1\nInfo 2"
      ├── goodToKnow_nl: "Info 1\nInfo 2"
      ├── goodToKnow_fr: "Info 1\nInfo 2"
      ├── bookingLink: "https://booking-url.com"
      ├── status: "active"
      └── ourPick: true  // NEW FIELD
```

### Files Modified

#### 1. admin-dashboard.html
**Changes:**
- Added "Our Pick" checkbox in package modal (after Status field)
- Added `ourPick` field to packageData object in save function
- Checkbox automatically reflects package's current `ourPick` value when editing

**Code Location:**
```javascript
// Line ~2932: Modal HTML (after Status field)
<!-- Our Pick Toggle -->
<div style="margin: 1rem 0;">
    <label style="display: flex; align-items: center; cursor: pointer;">
        <input type="checkbox" id="package-our-pick" 
               ${pkg && pkg.ourPick ? 'checked' : ''} 
               style="margin-right: 0.5rem; width: 20px; height: 20px; cursor: pointer;">
        <span style="font-weight: 600;">Our Pick (Display on Index Page)</span>
    </label>
    <p style="font-size: 0.85rem; color: #666; margin: 0.5rem 0 0 26px;">
        When enabled, this package will be featured in the "Our Picks" section on the homepage.
    </p>
</div>

// Line ~3016: Save function
ourPick: document.getElementById('package-our-pick').checked
```

#### 2. index.html
**Changes:**
- Removed welcome card section (lines 98-104)
- Added `<section id="our-picks-section">` placeholder
- Added `loadOurPicks()` function after `loadAdsBottom()`
- Function loads packages with `ourPick: true` and renders them

**Key Functions:**
```javascript
// Load and display Our Pick packages
async function loadOurPicks() {
    // Fetch packages from Firebase
    // Filter for active packages with ourPick: true
    // Render expandable cards
    // Add click handlers for expand/collapse
}
```

#### 3. styles.css
**Changes:**
- Added complete styling for `#our-picks-section` (lines 6195-6500+)
- Matches packages.html card design exactly
- Includes responsive styles for mobile devices
- Seamless integration with existing design

**Key Classes:**
```css
#our-picks-section
.our-picks-container
.our-picks-header
.our-picks-list
.package-card (scoped to #our-picks-section)
.package-header
.package-thumbnail
.package-summary
.package-title
.package-teaser
.package-header-cta
.package-details
.package-content
.package-two-column-layout
.package-section
.package-list
.package-actions
```

## Usage Instructions

### For Administrators

#### Marking a Package as "Our Pick"

1. **Log into Admin Dashboard**
   - Navigate to `/admin-dashboard.html`
   - Log in with admin credentials

2. **Open Package Management**
   - Click "MENU" button
   - Select "Manage Packages"

3. **Create or Edit a Package**
   - Click "Add New Package" for new package, or "Edit" for existing
   - Fill in all required fields (image, titles, descriptions, etc.)

4. **Enable Our Pick**
   - Scroll to the bottom of the form
   - Find "Our Pick (Display on Index Page)" checkbox
   - Check the box to enable
   - Ensure "Status" is set to "Active"

5. **Save the Package**
   - Click "Save Package" button
   - Package is now marked as "Our Pick"

6. **Verify on Homepage**
   - Navigate to the homepage
   - Scroll to the section between ads and map
   - Your package should appear in "Our Picks" section

#### Managing Our Picks

**Multiple Our Picks:**
- You can mark multiple packages as "Our Pick"
- All active packages with `ourPick: true` will display
- They appear in the order they're stored in Firebase

**Removing from Our Picks:**
1. Edit the package
2. Uncheck "Our Pick" checkbox
3. Save
4. Package disappears from homepage (but remains on packages page if active)

**Temporarily Hiding:**
- Option 1: Uncheck "Our Pick" toggle
- Option 2: Change status to "Inactive" (removes from both homepage and packages page)

### For Website Visitors

#### Viewing Our Picks

1. **Navigate to Homepage**
   - Visit the hotel website main page

2. **Scroll to Our Picks Section**
   - Section appears between promotional ads and map
   - Section only visible when there are Our Pick packages

3. **View Package Details**
   - Click "View Details" button on any package card
   - Card expands to show full information
   - Click "Hide Details" to collapse

4. **Book a Package**
   - Expand the package card
   - Click "Book Now" button
   - Redirected to booking page in new tab

## Design Specifications

### Layout

```
┌─────────────────────────────────────┐
│         Banner / Hero                │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│       Index Ads Section              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│       About Us Section               │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│      Ads Bottom Section              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│     OUR PICKS SECTION (NEW)          │
│  ┌───────────────────────────────┐  │
│  │  Expandable Package Card      │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  Expandable Package Card      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           Map Section                │
└─────────────────────────────────────┘
```

### Card Structure

**Compact View (Collapsed):**
```
┌────────────┬──────────────────────────┐
│            │  Package Title            │
│   Image    │  Brief description...     │
│  (400px)   │  [View Details ↓]         │
└────────────┴──────────────────────────┘
```

**Full View (Expanded):**
```
┌────────────┬──────────────────────────┐
│            │  Package Title            │
│   Image    │  Brief description...     │
│  (400px)   │  [Hide Details ↑]         │
└────────────┴──────────────────────────┘
┌──────────────────────────────────────┐
│        Full Package Image            │
├──────────────┬───┬───────────────────┤
│ Description  │ │ │  • Inclusion 1   │
│              │ │ │  • Inclusion 2   │
│              │ │ │  • Inclusion 3   │
├──────────────┴───┴───────────────────┤
│ Good to Know                         │
│  • Info 1                            │
│  • Info 2                            │
├──────────────────────────────────────┤
│                    [Book Now →]      │
└──────────────────────────────────────┘
```

### Spacing & Colors

- **Background**: White (`#FFFFFF`)
- **Card Background**: White with shadow
- **Text Colors**: 
  - Titles: Black (`#000000`)
  - Body: Dark gray (`#555555`)
- **Accent**: Sage (`#959380`)
- **Spacing**: No gap between Our Picks section and map
- **Card Shadow**: `0 4px 24px rgba(0, 0, 0, 0.06)`
- **Hover Shadow**: `0 8px 32px rgba(0, 0, 0, 0.1)`

### Responsive Breakpoints

#### Desktop (> 768px)
- Image: 400px width
- Two-column layout for description/inclusions
- Full card layout

#### Tablet (≤ 768px)
- Image: Full width, 250px height
- Single column layout
- Reduced padding

#### Mobile (≤ 480px)
- Smaller titles and buttons
- Optimized touch targets
- Full-width cards

## Best Practices

### Choosing Our Picks

**Criteria:**
1. **Seasonality**: Highlight seasonal or limited-time offers
2. **Popularity**: Feature best-selling packages
3. **Strategy**: Promote packages you want to push
4. **Variety**: Show diverse package types (romantic, business, family)
5. **Quality**: Only feature packages with complete information and images

**Recommended Number:**
- Ideal: 2-4 packages
- Maximum: 6 packages (for readability)
- Minimum: 1 package (section hidden if 0)

### Content Guidelines

**Images:**
- Use high-quality, professional photos
- 1200x800px recommended (maintains aspect ratio)
- Keep file size under 500KB

**Titles:**
- Keep concise (3-6 words)
- Use compelling, benefit-focused language
- Translate accurately to all languages

**Descriptions:**
- 2-3 sentences for teaser
- Highlight unique value proposition
- Use engaging, persuasive language

**Inclusions:**
- List specific, tangible benefits
- Be clear and concise
- Use consistent formatting across packages

### Testing Checklist

After marking a package as "Our Pick":

- [ ] Package appears on homepage
- [ ] Card displays correctly in collapsed state
- [ ] Expand/collapse animation works smoothly
- [ ] All content displays (image, title, description, inclusions)
- [ ] "Book Now" button links correctly
- [ ] Multi-language content displays properly
- [ ] Responsive design works on mobile
- [ ] No gaps between sections
- [ ] Only one card expands at a time

## Troubleshooting

### Our Picks Section Not Appearing

**Possible Causes:**
1. No packages marked with `ourPick: true`
2. Packages are set to "Inactive"
3. Firebase connection issue
4. JavaScript error in console

**Solutions:**
1. Verify at least one package has Our Pick enabled
2. Check package status is "Active"
3. Check browser console for errors
4. Verify Firebase configuration

### Package Not Showing After Toggle

**Possible Causes:**
1. Changes not saved to Firebase
2. Package status is "Inactive"
3. Browser cache
4. Network delay

**Solutions:**
1. Re-save the package
2. Verify status is "Active"
3. Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
4. Wait a few seconds and refresh

### Card Not Expanding

**Possible Causes:**
1. JavaScript error
2. Browser compatibility
3. Content structure issue

**Solutions:**
1. Check browser console for errors
2. Use modern browser (Chrome, Firefox, Safari, Edge)
3. Verify all required fields are filled
4. Check that booking link is valid URL

### Design Issues

**Gaps Between Sections:**
- Check that Our Picks section CSS has `margin: 0`
- Verify no extra spacing in HTML

**Card Layout Broken:**
- Ensure image URL is valid
- Check that styles.css loaded correctly
- Verify responsive breakpoints

**Hover Effects Not Working:**
- Clear browser cache
- Check CSS selectors match
- Verify no conflicting styles

## Migration Guide

### For Existing Packages

All existing packages will have `ourPick: false` by default:
1. Edit each package you want as "Our Pick"
2. Check the "Our Pick" toggle
3. Save the package
4. Verify on homepage

### No Breaking Changes

This feature is fully backward compatible:
- Existing packages work without modification
- Packages page unchanged
- Only homepage updated
- Default behavior: packages not shown on homepage

## Future Enhancements

Potential improvements for future versions:

1. **Order Control**: Drag-and-drop reordering of Our Picks
2. **Date Range**: Schedule Our Picks for specific dates
3. **Analytics**: Track views and clicks on Our Picks
4. **A/B Testing**: Test different packages as Our Picks
5. **Preview**: Preview Our Picks section before saving
6. **Bulk Actions**: Enable/disable multiple Our Picks at once
7. **Templates**: Save Our Pick configurations as templates
8. **Notifications**: Alert when Our Pick package expires

## Support

For questions or issues:

1. Check this documentation first
2. Review `PACKAGE_MANAGEMENT_IMPLEMENTATION.md` for package details
3. Check browser console for error messages
4. Verify Firebase Console for data integrity
5. Test in different browsers

## Version History

- **v1.1.0** (2026-02-03): Our Pick feature implementation
  - Added `ourPick` toggle in admin dashboard
  - Removed welcome card from homepage
  - Added dynamic "Our Picks" section between ads and map
  - Implemented expandable card design
  - Multi-language support for section title
  - Responsive design for all devices
  - Seamless integration with existing design

---

**Last Updated**: February 3, 2026  
**Status**: Production Ready ✅
