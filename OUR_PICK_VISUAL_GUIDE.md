# Our Pick Feature - Visual Guide

## Admin Dashboard - Our Pick Toggle

When editing or creating a package in the Admin Dashboard, you'll see the new "Our Pick" toggle:

```
┌─────────────────────────────────────────────────┐
│  Package Management Modal                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Upload Package Image]                         │
│                                                 │
│  Title (EN/NL/FR): ___________________________  │
│  Description: _________________________________  │
│  Inclusions: __________________________________  │
│  Good to Know: ________________________________  │
│  Booking Link: ________________________________  │
│                                                 │
│  Status: [Dropdown: Active/Inactive]           │
│                                                 │
│  ┌────────────────────────────────────────┐    │
│  │ ☑ Our Pick (Display on Index Page)    │    │
│  │                                        │    │
│  │ When enabled, this package will be     │    │
│  │ featured in the "Our Picks" section    │    │
│  │ on the homepage.                       │    │
│  └────────────────────────────────────────┘    │
│                                                 │
│              [Cancel]  [Save Package]           │
└─────────────────────────────────────────────────┘
```

## Homepage Layout - Before and After

### BEFORE (Old Layout)
```
┌─────────────────────────────────────────────────┐
│           Hero Banner / Slideshow                │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│         Index Ads (3 Cards)                      │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│            About Us Section                      │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│         Ads Bottom Section                       │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│     ┌─────────────────────────────────┐         │
│     │ Welcome to Hotel Elisabeth      │         │
│     │ Experience luxury and comfort   │  ← REMOVED
│     │ in the heart of Mechelen.       │         │
│     │                                 │         │
│     │        [View Our Rooms]         │         │
│     └─────────────────────────────────┘         │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│              Google Map                          │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│              Footer                              │
└─────────────────────────────────────────────────┘
```

### AFTER (New Layout with Our Picks)
```
┌─────────────────────────────────────────────────┐
│           Hero Banner / Slideshow                │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│         Index Ads (3 Cards)                      │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│            About Us Section                      │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│         Ads Bottom Section                       │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│              OUR PICKS                           │  ← NEW SECTION
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  [Image] │ Package Title                   │ │
│  │  400px   │ Short description of the...     │ │
│  │          │ [View Details ↓]                │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  [Image] │ Another Package                 │ │
│  │  400px   │ Brief teaser text...            │ │
│  │          │ [View Details ↓]                │ │
│  └────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│              Google Map                          │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│              Footer                              │
└─────────────────────────────────────────────────┘
```

## Package Card States

### Collapsed State (Default)
```
┌────────────────────────────────────────────────────────┐
│                        │                               │
│                        │  Romantic Weekend Getaway     │
│    [Package Image]     │                               │
│       400px wide       │  Enjoy a luxurious romantic   │
│       280px height     │  escape in the heart of...    │
│                        │                               │
│                        │  ┌──────────────────────┐     │
│                        │  │ View Details    ↓   │     │
│                        │  └──────────────────────┘     │
└────────────────────────────────────────────────────────┘
```

### Expanded State (After Click)
```
┌────────────────────────────────────────────────────────┐
│                        │                               │
│                        │  Romantic Weekend Getaway     │
│    [Package Image]     │                               │
│       400px wide       │  Enjoy a luxurious romantic   │
│       280px height     │  escape in the heart of...    │
│                        │                               │
│                        │  ┌──────────────────────┐     │
│                        │  │ Hide Details    ↑   │     │
│                        │  └──────────────────────┘     │
├────────────────────────────────────────────────────────┤
│                                                        │
│              [Full Package Image]                      │
│                 1200px wide                            │
│                                                        │
├────────────────────────────────────────────────────────┤
│                           │                            │
│  Full Description         │    INCLUDED                │
│                           │    • Champagne on arrival  │
│  Immerse yourself in a    │    • Romantic dinner       │
│  weekend of luxury and    │    • Late checkout         │
│  romance...               │    • Spa access            │
│                           │                            │
├────────────────────────────────────────────────────────┤
│  GOOD TO KNOW                                          │
│  • Valid on weekends only                              │
│  • Advance booking required                            │
├────────────────────────────────────────────────────────┤
│                                    ┌────────────────┐  │
│                                    │  Book Now  →   │  │
│                                    └────────────────┘  │
└────────────────────────────────────────────────────────┘
```

## Responsive Design

### Desktop (> 768px)
- Image: 400px width, left side
- Content: Right side
- Two-column layout for details
- Full hover effects

### Tablet (≤ 768px)
- Image: Full width, 250px height, on top
- Content: Below image
- Single column layout
- Touch-optimized buttons

### Mobile (≤ 480px)
- Smaller text sizes
- Reduced padding
- Full-width buttons
- Optimized for small screens

## User Interaction Flow

```
1. User visits homepage
   ↓
2. Scrolls past ads and about section
   ↓
3. Sees "Our Picks" section
   ↓
4. Views compact package cards
   ↓
5. Clicks "View Details" on a package
   ↓
6. Card expands smoothly
   ↓
7. User reads full details
   ↓
8. Clicks "Book Now" → Opens booking page
   OR
   Clicks "Hide Details" → Card collapses
```

## Multi-Language Example

### English
```
┌─────────────────────────────────────┐
│           OUR PICKS                 │
│                                     │
│  [Package Card]                     │
│  View Details ↓                     │
└─────────────────────────────────────┘
```

### Dutch
```
┌─────────────────────────────────────┐
│         ONZE KEUZES                 │
│                                     │
│  [Pakket Kaart]                     │
│  Bekijk details ↓                   │
└─────────────────────────────────────┘
```

### French
```
┌─────────────────────────────────────┐
│          NOS CHOIX                  │
│                                     │
│  [Carte de forfait]                 │
│  Voir les détails ↓                 │
└─────────────────────────────────────┘
```

## Color Scheme

```
Background:        White (#FFFFFF)
Card Background:   White with shadow
Card Border:       None (clean design)
Primary Text:      Black (#000000)
Secondary Text:    Gray (#666666, #555555)
Accent Color:      Sage (#959380)
Accent Line:       Sage (#959380) - 4px vertical bar

Shadows:
- Default:  0 4px 24px rgba(0, 0, 0, 0.06)
- Hover:    0 8px 32px rgba(0, 0, 0, 0.1)
- Expanded: 0 8px 30px rgba(0, 0, 0, 0.1)
```

## Button States

### View Details Button

**Default State:**
```
┌──────────────────────┐
│ View Details    ↓   │  ← Light sage border
└──────────────────────┘    Transparent background
```

**Hover State:**
```
┌──────────────────────┐
│ View Details    ↓   │  ← Sage background
└──────────────────────┘    White text
```

**Expanded State:**
```
┌──────────────────────┐
│ Hide Details    ↑   │  ← Black background
└──────────────────────┘    White text
                            Arrow rotated 180°
```

### Book Now Button

**Default State:**
```
┌──────────────────────┐
│  Book Now       →   │  ← Sage background
└──────────────────────┘    White text
```

**Hover State:**
```
┌──────────────────────┐
│  Book Now       →   │  ← Darker sage
└──────────────────────┘    White text
                            Arrow shifts right
```

## Key Design Principles

1. **Seamless Integration**: No visual gaps between sections
2. **Consistency**: Matches existing package page design exactly
3. **Accessibility**: Proper ARIA labels, keyboard navigation
4. **Performance**: Lazy-loading of content, smooth animations
5. **Mobile-First**: Responsive at all breakpoints
6. **User-Centric**: Clear call-to-actions, intuitive interactions

## Quick Reference

| Feature | Description |
|---------|-------------|
| **Toggle Location** | Admin → Manage Packages → Edit Package → Bottom of form |
| **Section Location** | Homepage → Between Ads Bottom and Map |
| **Visibility Rule** | `status: 'active' && ourPick: true` |
| **Languages** | EN (Our Picks), NL (Onze Keuzes), FR (Nos Choix) |
| **Default State** | Collapsed (compact view) |
| **Expand Trigger** | Click "View Details" button |
| **Max Packages** | No limit (recommended: 2-4) |
| **Min Packages** | 0 (section hidden if none) |

---

**Version**: 1.1.0  
**Date**: February 3, 2026  
**Status**: Production Ready ✅
