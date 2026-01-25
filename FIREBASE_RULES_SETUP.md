# Firebase Rules Configuration

This document contains the Firebase Security Rules you need to configure for the photo management feature to work properly.

## Firebase Storage Rules

These rules allow authenticated admin users to upload, read, and delete photos in the `main-banner` folder.

### How to apply these rules:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Click on **Storage** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with the rules below
6. Click **Publish**

### Storage Rules:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to read all files
    match /{allPaths=**} {
      allow read: if request.auth != null;
    }
    
    // Allow authenticated users to write/delete files in main-banner folder
    match /main-banner/{fileName} {
      allow write, delete: if request.auth != null;
    }
  }
}
```

## Firebase Realtime Database Rules

These rules allow authenticated admin users to read and write photo metadata in the database.

### How to apply these rules:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Click on **Realtime Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with the rules below
6. Click **Publish**

### Database Rules:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "mainBanner": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## Security Considerations

- **Authentication Required**: All operations require the user to be authenticated via Firebase Authentication
- **Admin Only**: Only users with valid credentials can access the admin dashboard
- **No Public Write Access**: Public users cannot upload or modify photos
- **Read Access**: Only authenticated users can read photos (you may want to make this public if photos should be visible on the public website)

## Optional: Public Read Access

If you want the main banner photos to be visible on the public website (recommended for a hotel website), you can modify the Storage rules to allow public read access:

### Modified Storage Rules (Public Read):

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow anyone to read files in main-banner folder
    match /main-banner/{fileName} {
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

### Modified Database Rules (Public Read):

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "mainBanner": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## Verification

After applying the rules:

1. Log in to the admin dashboard at `hoteladmin.html`
2. Click on **Update Index** button - a submenu should slide down
3. Click on **Main Banner** button - a photo management card should appear
4. Try uploading a photo - it should upload successfully
5. Try deleting and reordering photos - all operations should work

If you encounter any permission errors, double-check that:
- The rules are published correctly
- You are logged in as an authenticated user
- The Firebase Storage and Realtime Database services are enabled in your Firebase project
