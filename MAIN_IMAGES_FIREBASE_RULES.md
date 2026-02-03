# Main Images Firebase Rules Configuration

This document contains the Firebase Security Rules needed to support the new Main Image Management feature.

## New Image Types Added

The following new image types have been added to the Main Image Management section:

1. **Rooms Main Image** - Background image for rooms.html
2. **Info Main Image** - Background image for info.html header
3. **Group Main Image** - Background image for grouprequest.html header

## Firebase Realtime Database Rules

Add these new sections to your existing Firebase Realtime Database rules:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "mainBanner": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "indexAds": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "indexBackground": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "aboutUs": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "adsBottom": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "packages": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "facilities": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "facilitiesHero": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "facilitiesLibrary": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "attractions": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "attractionsMainImage": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "meetingsMainImage": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "hotelInfo": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    // ===== NEW RULES FOR MAIN IMAGE MANAGEMENT =====
    "roomsMainImage": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "infoMainImage": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "groupMainImage": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Public Read Access (Recommended)

If you want these images to be visible to public users (recommended for a hotel website), use:

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
    },
    "facilities": {
      ".read": true,
      ".write": "auth != null"
    },
    "facilitiesHero": {
      ".read": true,
      ".write": "auth != null"
    },
    "facilitiesLibrary": {
      ".read": true,
      ".write": "auth != null"
    },
    "attractions": {
      ".read": true,
      ".write": "auth != null"
    },
    "attractionsMainImage": {
      ".read": true,
      ".write": "auth != null"
    },
    "meetingsMainImage": {
      ".read": true,
      ".write": "auth != null"
    },
    "hotelInfo": {
      ".read": true,
      ".write": "auth != null"
    },
    // ===== NEW RULES FOR MAIN IMAGE MANAGEMENT =====
    "roomsMainImage": {
      ".read": true,
      ".write": "auth != null"
    },
    "infoMainImage": {
      ".read": true,
      ".write": "auth != null"
    },
    "groupMainImage": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## Firebase Storage Rules

Add these new storage paths to your existing Firebase Storage rules:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow anyone to read files (public access for website images)
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow authenticated users to write/delete files in main-banner folder
    match /main-banner/{fileName} {
      allow write, delete: if request.auth != null;
    }
    
    // Allow authenticated users to write/delete files in index-ads folder
    match /index-ads/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }
    
    // Allow authenticated users to write/delete files in index-background folder
    match /index-background/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }
    
    // Allow authenticated users to write/delete files in ads-bottom folder
    match /ads-bottom/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }
    
    // Allow authenticated users to write/delete files in packages folder
    match /packages/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }

    // Allow authenticated users to write/delete files in facilities folders
    match /facilities-hero/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }

    match /facilities-library/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }

    // Allow authenticated users to write/delete files in attractions folders
    match /attractions-main/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }

    match /attractions/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }

    // Allow authenticated users to write/delete files in meetings-main folder
    match /meetings-main/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }

    // ===== NEW STORAGE RULES FOR MAIN IMAGE MANAGEMENT =====
    // Allow authenticated users to write/delete files in rooms-main folder
    match /rooms-main/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }

    // Allow authenticated users to write/delete files in info-main folder
    match /info-main/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }

    // Allow authenticated users to write/delete files in group-main folder
    match /group-main/{allPaths=**} {
      allow write, delete: if request.auth != null;
    }
  }
}
```

## How to Apply These Rules

### For Firebase Realtime Database:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Click on **Realtime Database** in the left sidebar
4. Click on the **Rules** tab
5. Add the new sections for `roomsMainImage`, `infoMainImage`, and `groupMainImage`
6. Click **Publish**

### For Firebase Storage:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Click on **Storage** in the left sidebar
4. Click on the **Rules** tab
5. Add the new match sections for `rooms-main`, `info-main`, and `group-main`
6. Click **Publish**

## Summary of Changes

### Database Rules Added:
- `roomsMainImage` - For storing rooms page main image metadata
- `infoMainImage` - For storing info page main image metadata
- `groupMainImage` - For storing group request page main image metadata

### Storage Paths Added:
- `rooms-main/` - For storing rooms page main images
- `info-main/` - For storing info page main images
- `group-main/` - For storing group request page main images

## Security Considerations

- **Authentication Required for Writes**: Only authenticated admin users can upload/delete images
- **Public Read Access**: Public users can view images (recommended for hotel website)
- **No Public Write Access**: Public users cannot upload or modify images
- **Path-based Security**: Each image type has its own storage path for better organization

## Testing

After applying the rules:

1. Log in to the admin dashboard at `admin-dashboard.html`
2. Click on **Main Images** in the menu
3. Try uploading images for each new image type
4. Verify images appear on the respective pages:
   - Rooms Main Image → rooms.html background
   - Info Main Image → info.html header background
   - Group Main Image → grouprequest.html header background
5. Try deleting images to ensure proper cleanup

If you encounter permission errors, verify that:
- The rules are published correctly
- You are logged in as an authenticated user
- The Firebase Storage and Realtime Database services are enabled
