# Hotel Elisabeth Mechelen Website

This repository contains the website for Hotel Elisabeth Mechelen, including an admin panel with Firebase authentication.

## Files Structure

### Main Website Pages
- `index.html` - Home page
- `rooms.html` - Rooms information
- `packages.html` - Special packages and offers
- `facilities.html` - Hotel facilities
- `meetings.html` - Meetings and events
- `info.html` - Hotel information
- `attractions.html` - Local attractions
- `policies.html` - Hotel policies
- `photos.html` - Photo gallery
- `privacypolicy.html` - Privacy policy
- `termsandconditions.html` - Terms and conditions
- `career.html` - Career opportunities

### Admin Panel
- `hoteladmin.html` - Admin login page
- `admin-dashboard.html` - Admin dashboard (requires authentication)

### Supporting Files
- `styles.css` - Main stylesheet with color scheme (Black, #D4D3C3, #959380, White)
- `firebase-config.js` - Firebase configuration and initialization
- `auth.js` - Authentication logic (no hardcoded credentials)

## Firebase Setup

### Authentication
The admin login uses **Firebase Authentication** with the following configuration:
- **App ID**: `1:201071640171:web:8d5964d0eaff32ba823b2e`
- **Project ID**: `hotelelisabethmechelen-9dd98`
- **Authentication Method**: Email/Password

**Important**: Admin credentials are stored securely in Firebase Authentication, NOT hardcoded in the website files.

### Database
The website is configured to use Firebase Realtime Database for dynamic content storage.

## How Admin Login Works (Without Hardcoded Credentials)

### Security Approach
1. Admin user credentials are created in Firebase Console (already done)
2. The website uses Firebase Authentication SDK to verify credentials
3. When an admin enters their email and password, it is sent securely to Firebase
4. Firebase validates the credentials against its secure database
5. No passwords or credentials are stored in the website code

### Steps to Add/Manage Admin Users
Admin users should be managed through the Firebase Console:

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: `hotelelisabethmechelen-9dd98`
3. Navigate to Authentication → Users
4. Add new users with email/password or manage existing users
5. No code changes needed - users can login immediately

## Color Scheme
- **Black** (#000000) - Primary color for cards and headers
- **Beige** (#D4D3C3) - Buttons and text accents
- **Sage** (#959380) - Secondary buttons and accents
- **White** (#FFFFFF) - Background and contrast text

## Google Maps Integration

The website includes an interactive Google Maps section on the **homepage (index.html only)** showing the hotel location.

### Setting up Google Maps API Key

**Important**: The homepage map uses the Google Maps JavaScript API.

1. Get a Google Maps API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Maps JavaScript API"
   - Create credentials (API Key)
   - Restrict the API key to your domain for security

2. Update the API key in `index.html` if needed:
   - Look for the Maps JavaScript API script tag near the bottom of the file.
   - Replace the key value with your latest API key.
   - This key is intentionally client-side, so restrict it to your domain and rotate it immediately if it is exposed.
   - The script tag looks like this:
     ```html
     <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_KEY&callback=initMap"></script>
     ```

3. Map Configuration:
   - **Location**: plus code `2FJJ+J4 Mechelen, Belgium`
   - **Fallback Coordinates**: 51.0259°N, 4.4774°E
   - **Theme**: Dark map style with road color `#8a7753`
   - **Features**: Zoom controls, fullscreen, no map type or street view controls

### Map Styling
The map section uses a dark theme with custom road color (#8a7753) and is 500px height, full-width, positioned just before the footer on the homepage.

## Usage

### Running Locally
Simply open `index.html` in a web browser. For the admin panel to work properly with Firebase, you may need to serve the files through a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then access the site at `http://localhost:8000`

### Admin Access
Navigate to `hoteladmin.html` and login with credentials created in Firebase Console.

## Firebase Configuration Details

The Firebase configuration is stored in `firebase-config.js` and includes:
- API Key (public, safe to expose)
- Auth Domain
- Project ID
- Storage Bucket
- Messaging Sender ID
- App ID
- Measurement ID

These values are public and used by the client-side SDK to connect to your Firebase project. Security is maintained through Firebase Security Rules, not by hiding these values.

## Future Enhancements

### Recommended Next Steps:
1. Add Firebase Realtime Database rules to secure data access
2. Implement admin dashboard functionality for managing:
   - Room information
   - Package management (completed)
   - Photo uploads
   - Booking management
3. Add content management system (CMS) features
4. Implement user roles (super admin, editor, viewer)
5. Add email verification for admin accounts
6. Implement password reset functionality

## Security Notes

1. **No Hardcoded Credentials**: All authentication is handled by Firebase
2. **Client-Side Auth**: Uses Firebase Authentication SDK
3. **Secure by Default**: Firebase handles password hashing and security
4. **Environment Ready**: Ready for production deployment

## Deployment

To deploy this website:
1. Upload all files to your web hosting service
2. Ensure Firebase configuration is correct
3. Configure Firebase Security Rules for production
4. Enable proper CORS settings if needed
5. Consider using Firebase Hosting for seamless integration

## Support

For Firebase-related issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database)
