# Photo Management Feature - User Guide

This document explains how to use the new photo management feature in the admin dashboard.

## Feature Overview

The photo management feature allows you to upload, delete, and rearrange photos for the main banner section of your hotel website. All photos are stored securely in Firebase Storage with metadata tracked in Firebase Realtime Database.

## How to Use

### Step 1: Access the Admin Dashboard

1. Navigate to `hoteladmin.html`
2. Log in with your admin credentials
3. You will be redirected to the admin dashboard

### Step 2: Open the Update Index Submenu

1. Click the **Update Index** button in the top navigation
2. A submenu will slide down smoothly below the navigation bar
3. The submenu contains the **Main Banner** button (and space for 3-4 more buttons in the future)

### Step 3: Open the Photo Management Card

1. Click the **Main Banner** button in the submenu
2. A photo management card will appear on the page
3. The page will automatically scroll to show the card

### Step 4: Upload Photos

1. Click the **Add Photo** button
2. Select an image file from your computer (JPG, PNG, GIF, etc.)
3. The photo will be uploaded to Firebase Storage
4. A thumbnail will appear in the photo grid with controls

### Step 5: Manage Photos

**Reorder Photos:**
- Use the "Up" button to move a photo up in the order
- Use the "Down" button to move a photo down in the order
- The position number updates automatically

**Delete Photos:**
- Click the "Delete" button on any photo
- Confirm the deletion in the popup dialog
- The photo will be removed from both Storage and Database
- Remaining photos will automatically reorder

## Technical Implementation

### Firebase Storage Structure

Photos are stored in Firebase Storage with the following path structure:
```
main-banner/
  ├── [timestamp]-[filename].jpg
  ├── [timestamp]-[filename].png
  └── ...
```

### Firebase Database Structure

Photo metadata is stored in Firebase Realtime Database:
```json
{
  "mainBanner": {
    "1234567890": {
      "url": "https://firebasestorage.googleapis.com/...",
      "filename": "main-banner/1234567890-photo.jpg",
      "timestamp": 1234567890,
      "order": 0
    },
    "1234567891": {
      "url": "https://firebasestorage.googleapis.com/...",
      "filename": "main-banner/1234567891-photo.jpg",
      "timestamp": 1234567891,
      "order": 1
    }
  }
}
```

### Features

✅ **Upload Multiple Photos** - Add as many photos as needed
✅ **Delete Photos** - Remove unwanted photos with confirmation
✅ **Reorder Photos** - Change the display order with arrow buttons
✅ **Automatic Reordering** - When a photo is deleted, remaining photos reorder automatically
✅ **Visual Feedback** - Loading states and disabled buttons during operations
✅ **Responsive Design** - Works on desktop and mobile devices
✅ **Secure** - Only authenticated admin users can upload, delete, or reorder photos

## User Interface

### Color Scheme
- Background: Sage green (#959380)
- Cards: Black (#000000) with beige text (#D4D3C3)
- Buttons: Beige (#D4D3C3) with hover effects
- Photo Items: Sage background with rounded corners

### Layout
- **Submenu**: Slides down smoothly with 300ms animation
- **Photo Grid**: Responsive grid layout (250px minimum per item)
- **Photo Items**: Display image, control buttons, and position number
- **Mobile Responsive**: Single column layout on mobile devices

## Future Enhancements

Possible future additions:
- Drag and drop reordering
- Bulk upload
- Image cropping/editing
- Preview of how photos will look on the main page
- Additional categories (not just Main Banner)

## Troubleshooting

**Photos not uploading?**
- Check Firebase Storage rules are configured correctly
- Ensure you're logged in as an authenticated user
- Check browser console for error messages

**Photos not displaying?**
- Check Firebase Realtime Database rules
- Verify photos were uploaded successfully in Firebase Console
- Clear browser cache and reload

**Permission errors?**
- Make sure Firebase rules are published
- Verify your account has admin access
- Check Firebase Authentication is working

## Support

For technical issues or questions, refer to:
- `FIREBASE_RULES_SETUP.md` - Firebase configuration
- `FIREBASE_ADMIN_SETUP.md` - Admin account setup
- Firebase Console - Monitor uploads and storage usage
