# Careers Management System - Firebase Setup Instructions

## Overview
The Careers Management System allows hotel administrators to create, manage, and publish job listings on the Hotel Elisabeth Mechelen website.

## Firebase Configuration Required

### 1. Firebase Authentication Setup

The admin panel (`careersadmin.html`) requires Firebase Authentication to be enabled.

#### Steps:
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Navigate to **Authentication** in the left sidebar
4. Click on **Sign-in method** tab
5. Enable **Email/Password** authentication if not already enabled
6. Click on the **Users** tab
7. Add an admin user by clicking **Add user**:
   - Enter admin email (e.g., `admin@elisabeth-hotel.be`)
   - Enter a secure password
   - Click **Add user**

**Important:** Keep these credentials secure. This user will have full access to manage job listings.

### 2. Firebase Realtime Database Structure

The careers data is stored in Firebase Realtime Database under the path `/careers`.

#### Database Structure:
```
careers/
  ├── {jobId1}/
  │   ├── title: "Front Desk Receptionist"
  │   ├── type: "Full-time"
  │   ├── department: "Front Office"
  │   ├── location: "Mechelen, Belgium"
  │   ├── description: "We are looking for a friendly..."
  │   ├── requirements: "• Excellent communication skills\n• Experience with..."
  │   ├── status: "active"
  │   ├── createdAt: 1706889600000
  │   └── updatedAt: 1706889600000
  ├── {jobId2}/
  │   └── ...
```

#### Field Descriptions:
- **title** (string): Job position title
- **type** (string): Employment type (Full-time, Part-time, Contract, Temporary, Internship)
- **department** (string): Department name (Front Office, Housekeeping, Food & Beverage, etc.)
- **location** (string): Job location
- **description** (string): Detailed job description
- **requirements** (string): Job requirements (newline-separated list)
- **status** (string): Either "active" or "inactive"
- **createdAt** (number): Unix timestamp when job was created
- **updatedAt** (number): Unix timestamp when job was last updated

### 3. Firebase Security Rules

Add the following security rules to protect the careers data:

#### Navigate to Database Rules:
1. Go to **Realtime Database** in Firebase Console
2. Click on the **Rules** tab
3. Add the following rules:

```json
{
  "rules": {
    "careers": {
      ".read": true,
      ".write": "auth != null",
      "$jobId": {
        ".validate": "newData.hasChildren(['title', 'type', 'department', 'description', 'status', 'createdAt', 'updatedAt'])",
        "title": {
          ".validate": "newData.isString() && newData.val().length > 0"
        },
        "type": {
          ".validate": "newData.isString() && newData.val().matches(/^(Full-time|Part-time|Contract|Temporary|Internship)$/)"
        },
        "department": {
          ".validate": "newData.isString() && newData.val().length > 0"
        },
        "location": {
          ".validate": "newData.isString()"
        },
        "description": {
          ".validate": "newData.isString() && newData.val().length > 0"
        },
        "requirements": {
          ".validate": "newData.isString()"
        },
        "status": {
          ".validate": "newData.isString() && newData.val().matches(/^(active|inactive)$/)"
        },
        "createdAt": {
          ".validate": "newData.isNumber()"
        },
        "updatedAt": {
          ".validate": "newData.isNumber()"
        }
      }
    }
  }
}
```

**Rule Explanation:**
- **Public Read Access**: Anyone can view active job listings on the frontend
- **Authenticated Write Access**: Only logged-in admin users can create, update, or delete jobs
- **Data Validation**: Ensures all required fields are present and properly formatted

4. Click **Publish** to apply the rules

### 4. Testing the Setup

#### Test Admin Access:
1. Navigate to: `https://yourdomain.com/careersadmin.html`
2. Login with the admin credentials you created
3. Try creating a test job listing:
   - Fill in all required fields
   - Click "Save Job Listing"
   - Verify the job appears in the list below

#### Test Frontend Display:
1. Navigate to: `https://yourdomain.com/careers.html`
2. Verify the job listing appears on the page
3. Test the "Apply Now" button (should open email client)

### 5. Managing Job Listings

#### Creating a New Job:
1. Log in to `careersadmin.html`
2. Fill in the job form at the top
3. Click "Save Job Listing"

#### Editing a Job:
1. In the jobs list, click the "Edit" button on any job
2. The form will populate with the job data
3. Make your changes
4. Click "Save Job Listing"

#### Deactivating a Job:
1. Click the "Deactivate" button on an active job
2. The job will no longer appear on the frontend careers page
3. It remains in the database and can be reactivated

#### Deleting a Job:
1. Click the "Delete" button on any job
2. Confirm the deletion
3. The job will be permanently removed from the database

## Frontend Integration

The careers page (`careers.html`) automatically:
- Loads all active job listings from Firebase
- Displays them in a modern card-based layout
- Shows a "no jobs" message when no active positions exist
- Updates in real-time when jobs are added/modified/deleted

## Email Application Flow

When a user clicks "Apply Now" on a job listing:
1. Their default email client opens
2. Email is pre-addressed to: `info@elisabeth-hotel.be`
3. Subject line includes the job title
4. User can compose and send their application

**Note:** You may want to set up a dedicated careers email address (e.g., `careers@elisabeth-hotel.be`) and update the email in both `careers.html` and `careersadmin.html`.

## Security Best Practices

1. **Admin Credentials**: Store admin login credentials securely. Use a password manager.
2. **Regular Audits**: Periodically review who has access to the admin panel
3. **HTTPS**: Ensure your website uses HTTPS to encrypt login credentials in transit
4. **Logout**: Always log out after managing job listings
5. **Backup**: Periodically export your Firebase data as a backup

## Troubleshooting

### Cannot log in to admin panel
- Verify the user exists in Firebase Authentication
- Check the email and password are correct
- Ensure Email/Password authentication is enabled in Firebase

### Jobs not appearing on frontend
- Check that job status is set to "active"
- Verify Firebase Realtime Database rules allow public read access
- Check browser console for JavaScript errors

### Cannot save jobs
- Ensure you are logged in
- Verify Firebase Realtime Database rules allow authenticated write access
- Check that all required fields are filled

### Firebase quota exceeded
- Firebase has free tier limits on database reads/writes
- Monitor usage in Firebase Console
- Consider upgrading to a paid plan if needed

## Support

For technical issues or questions:
- Email: info@elisabeth-hotel.be
- Firebase Documentation: https://firebase.google.com/docs

---

**Last Updated:** February 2026
**Version:** 1.0
