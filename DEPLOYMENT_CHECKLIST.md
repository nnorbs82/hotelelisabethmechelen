# Deployment Checklist for Hotel Elisabeth Mechelen Website

## ✅ Pre-Deployment Checklist

### 1. Firebase Setup (REQUIRED)
- [ ] Go to Firebase Console: https://console.firebase.google.com/
- [ ] Select project: `hotelelisabethmechelen-9dd98`
- [ ] Navigate to Authentication → Sign-in method
- [ ] Enable Email/Password authentication if not already enabled
- [ ] Add admin user(s):
  - Authentication → Users → Add User
  - Enter email and password for admin
  - Save credentials securely

### 2. Test Admin Login Locally
- [ ] Start local server: `python3 -m http.server 8000`
- [ ] Open: `http://localhost:8000/hoteladmin.html`
- [ ] Test login with Firebase admin credentials
- [ ] Verify redirect to admin dashboard works
- [ ] Test logout functionality

### 3. Test All Pages
- [ ] Check all 13 HTML pages load correctly
- [ ] Verify navigation links work
- [ ] Confirm color scheme is consistent
- [ ] Test on mobile/tablet viewports

### 4. Firebase Realtime Database Setup (Optional but Recommended)
- [ ] Firebase Console → Realtime Database → Create Database
- [ ] Set Security Rules:
```json
{
  "rules": {
    ".read": "auth == null",
    ".write": "auth != null"
  }
}
```
- [ ] Plan database structure for hotel data

### 5. Production Deployment

#### Option A: Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting
# Select existing project: hotelelisabethmechelen-9dd98
# Set public directory: . (current directory)
# Configure as single-page app: No
# Set up automatic builds: No

# Deploy
firebase deploy --only hosting
```

#### Option B: Traditional Web Hosting
- [ ] Upload all HTML, CSS, JS files to web server
- [ ] Ensure HTTPS is enabled (required for Firebase)
- [ ] Add your domain to Firebase authorized domains:
  - Firebase Console → Authentication → Settings → Authorized domains
  - Add your production domain

### 6. Post-Deployment Verification
- [ ] Test admin login on production URL
- [ ] Verify all pages load with HTTPS
- [ ] Check Firebase Analytics is working
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices

### 7. Security Hardening
- [ ] Enable email verification for admin users
- [ ] Set up password reset flow
- [ ] Review Firebase Security Rules
- [ ] Enable Firebase App Check (optional, for bot protection)
- [ ] Set up monitoring and alerts

## 📝 Important Notes

### Firebase API Key is Public
✅ The Firebase API key in `firebase-config.js` is designed to be public  
✅ Security is enforced through Firebase Security Rules  
✅ No sensitive data is exposed by having the API key in source code  

### Admin Credentials
🔐 Admin credentials are NEVER in the code  
🔐 All admin users managed through Firebase Console  
🔐 No code changes needed to add/remove admins  

### HTTPS Requirement
⚠️ Firebase Authentication requires HTTPS in production  
⚠️ Most hosting providers offer free SSL/TLS certificates  
⚠️ Firebase Hosting includes HTTPS automatically  

## 🆘 Troubleshooting

### Login doesn't work in production
- Verify domain is added to Firebase authorized domains
- Check HTTPS is working
- Verify admin user exists in Firebase Console
- Check browser console for errors

### "Failed to load resource" errors
- Ensure ad blockers are disabled
- Check Firebase SDK URLs are accessible
- Verify Firebase project is active

### Database permission denied
- Check Firebase Security Rules
- Verify user is authenticated before writing
- Review rules match your access patterns

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth/web/start)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database/web/start)

## ✨ Project Files Overview

**HTML Pages (13):**
- Main: index, rooms, offers, facilities, meetings, info, attractions, photos
- Legal: policies, privacypolicy, termsandconditions
- Other: career
- Admin: hoteladmin, admin-dashboard

**JavaScript:**
- firebase-config.js (Firebase setup)
- auth.js (Authentication logic)

**Styling:**
- styles.css (Complete site styling)

**Documentation:**
- SETUP.md (Setup overview)
- FIREBASE_ADMIN_SETUP.md (Admin management guide)
- DEPLOYMENT_CHECKLIST.md (This file)

---

**Ready to deploy!** 🚀
