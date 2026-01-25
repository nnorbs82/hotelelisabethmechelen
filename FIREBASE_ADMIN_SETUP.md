# Firebase Admin Setup Guide

## Overview
This guide explains how to set up and manage admin access for the Hotel Elisabeth Mechelen website using Firebase Authentication, **without hardcoding any credentials in the website code**.

## Why No Hardcoded Credentials?

**Security Best Practices:**
1. **Hardcoded credentials** can be exposed if:
   - Source code is shared or leaked
   - Repository becomes public
   - Code is decompiled or reverse-engineered
   
2. **Firebase Authentication** provides:
   - Secure credential storage on Firebase servers
   - Encrypted transmission of credentials
   - Built-in security features (rate limiting, etc.)
   - Easy credential management without code changes

## How It Works

### Architecture
```
User enters credentials → Firebase Authentication SDK → Firebase Servers → Validation → Response
```

### Step-by-Step Flow
1. Admin opens `hoteladmin.html`
2. Enters email and password in the form
3. JavaScript calls `loginAdmin(email, password)` from `auth.js`
4. `auth.js` uses Firebase SDK's `signInWithEmailAndPassword()` function
5. Firebase SDK sends credentials securely to Firebase servers
6. Firebase validates against its user database
7. If valid, returns authentication token
8. User is redirected to `admin-dashboard.html`

### Key Point
**No credentials are stored in the code**. The website only contains:
- Firebase project configuration (public information)
- Logic to call Firebase Authentication API
- UI for collecting credentials

## Setting Up Admin Users

### Prerequisites
- Access to Firebase Console
- Project: `hotelelisabethmechelen-9dd98`

### Adding a New Admin User

1. **Go to Firebase Console**
   - URL: https://console.firebase.google.com/
   - Login with your Google account

2. **Select Your Project**
   - Click on `hotelelisabethmechelen-9dd98`

3. **Navigate to Authentication**
   - In the left sidebar, click "Authentication"
   - Click on the "Users" tab

4. **Add User**
   - Click "Add User" button
   - Enter the admin's email address
   - Enter a secure password (or let Firebase generate one)
   - Click "Add User"

5. **Done!**
   - The new admin can now login immediately
   - No code changes needed
   - No deployment required

### Managing Existing Users

**To disable an admin:**
1. Go to Authentication → Users
2. Click on the user
3. Click "Disable user"

**To reset password:**
1. Go to Authentication → Users
2. Click on the user
3. Click "Reset password"
4. Firebase will send a password reset email

**To delete an admin:**
1. Go to Authentication → Users
2. Click on the user
3. Click "Delete user"

## Firebase Configuration Files

### firebase-config.js
Contains public Firebase project configuration:
- API Key (safe to expose publicly)
- Project ID
- Auth Domain
- Other configuration values

**Note:** These values are meant to be public. Security is handled by Firebase Security Rules, not by hiding these values.

### auth.js
Contains authentication logic:
- `loginAdmin()` - Handles login
- `logoutAdmin()` - Handles logout
- `checkAuthState()` - Checks if user is authenticated

**Important:** This file contains no credentials, only function calls to Firebase SDK.

## Security Features

### Built-in Firebase Security
1. **Password Hashing:** Firebase automatically hashes passwords
2. **Rate Limiting:** Prevents brute force attacks
3. **Secure Transmission:** All credentials sent over HTTPS
4. **Token-based Auth:** Uses JWT tokens for session management

### Additional Security Recommendations

1. **Enable Email Verification**
   ```
   Firebase Console → Authentication → Settings → 
   Email Verification → Enable
   ```

2. **Set Password Policies**
   ```
   Firebase Console → Authentication → Settings → 
   Password Policy → Set minimum requirements
   ```

3. **Enable Multi-Factor Authentication (MFA)**
   ```
   Firebase Console → Authentication → Settings → 
   Multi-factor authentication → Enable
   ```

4. **Monitor Authentication Activity**
   ```
   Firebase Console → Authentication → Users → 
   Check login activity
   ```

## Connecting to Firebase Realtime Database

### Database Structure (Recommended)
```
/hotel-data
  /rooms
    /room-id-1
      - name: "Deluxe Room"
      - price: 150
      - description: "..."
  /offers
    /offer-id-1
      - title: "Weekend Special"
      - discount: 20
  /bookings
    /booking-id-1
      - guest: "..."
      - room: "..."
```

### Security Rules for Database
Set these rules in Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    ".read": "auth == null",  // Public can read (for website display)
    ".write": "auth != null"  // Only authenticated users can write (admins)
  }
}
```

### Accessing Database in Code
```javascript
import { database } from './firebase-config.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Write data (admin only)
async function updateRoom(roomId, data) {
  const roomRef = ref(database, `hotel-data/rooms/${roomId}`);
  await set(roomRef, data);
}

// Read data (anyone)
async function getRooms() {
  const roomsRef = ref(database, 'hotel-data/rooms');
  const snapshot = await get(roomsRef);
  return snapshot.val();
}
```

## Testing the Admin Login

### Test Locally
1. Start a local web server:
   ```bash
   python3 -m http.server 8000
   # or
   npx http-server
   ```

2. Open browser to `http://localhost:8000/hoteladmin.html`

3. Enter the admin credentials you created in Firebase Console

4. If successful, you'll be redirected to the admin dashboard

### Expected Behavior
- **Valid credentials:** Redirected to `admin-dashboard.html`
- **Invalid credentials:** Error message displayed
- **No credentials:** Cannot submit form

## Troubleshooting

### "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"
- **Cause:** Ad blocker or privacy extension blocking Firebase
- **Solution:** Disable ad blockers for localhost or add exception

### "auth/invalid-credential"
- **Cause:** Wrong email or password
- **Solution:** Verify credentials in Firebase Console

### "auth/user-not-found"
- **Cause:** Admin user not created in Firebase
- **Solution:** Create user in Firebase Console → Authentication → Users

### Page redirects to login even after successful login
- **Cause:** Browser not accepting cookies or localStorage
- **Solution:** Check browser settings, allow cookies for localhost

## Deployment Considerations

### When deploying to production:

1. **Use HTTPS:** Firebase requires HTTPS for production
   
2. **Update authorized domains:**
   ```
   Firebase Console → Authentication → Settings → 
   Authorized domains → Add your domain
   ```

3. **Consider using Firebase Hosting:**
   - Automatic HTTPS
   - Global CDN
   - Easy integration with Firebase services
   
   ```bash
   npm install -g firebase-tools
   firebase init hosting
   firebase deploy
   ```

4. **Set up proper Database Security Rules** for production

## Summary

✅ **Admin credentials stored securely in Firebase, not in code**  
✅ **Easy to add/remove/manage admin users without code changes**  
✅ **Built-in security features (hashing, rate limiting, etc.)**  
✅ **Ready for Firebase Realtime Database integration**  
✅ **Professional authentication flow**  

The system is now ready for you to add admin users through the Firebase Console and start using the admin panel!
