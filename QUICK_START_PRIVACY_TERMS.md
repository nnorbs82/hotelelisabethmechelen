# Quick Start Guide - Privacy Policy & Terms Management

Welcome! This guide will help you get started with managing your Privacy Policy and Terms & Conditions content on your hotel website.

## 🎯 What's New

You can now easily manage your Privacy Policy and Terms & Conditions in **three languages** (English, Dutch, French) using a user-friendly rich text editor right from your admin dashboard.

## 📋 Step-by-Step Setup

### Step 1: Update Firebase Rules (One-time setup)

Before you can use the new features, you need to update your Firebase Realtime Database rules:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Click **Realtime Database** in the left sidebar
4. Click the **Rules** tab
5. Add these two sections to your existing rules:

```json
"privacyPolicy": {
  ".read": true,
  ".write": "auth != null"
},
"termsAndConditions": {
  ".read": true,
  ".write": "auth != null"
}
```

6. Click **Publish**

✅ That's it! This is a one-time setup.

**Need detailed instructions?** See `PRIVACY_TERMS_FIREBASE_SETUP.md` for complete Firebase setup with full rules examples.

### Step 2: Access the Admin Dashboard

1. Go to your admin dashboard: `admin-dashboard.html`
2. Log in with your credentials
3. Look for the new menu items in the left sidebar:
   - **Manage Privacy Policy**
   - **Manage Terms & Conditions**

### Step 3: Add Your Privacy Policy

1. Click **"Manage Privacy Policy"** in the sidebar
2. A modal window will open with three language tabs: 🇬🇧 EN, 🇳🇱 NL, 🇫🇷 FR
3. Start with English (EN tab is active by default)
4. Use the rich text editor to write your privacy policy:
   - **Headers**: Click the header dropdown to add titles (H1, H2, H3)
   - **Bold/Italic/Underline**: Format important text
   - **Lists**: Add bullet points or numbered lists
   - **Links**: Add hyperlinks to external pages
5. Switch to the Dutch tab (🇳🇱 NL) and add the Dutch version
6. Switch to the French tab (🇫🇷 FR) and add the French version
7. Click **"Save Changes"**
8. You'll see a success message confirming the save

### Step 4: Add Your Terms & Conditions

Follow the same steps as above, but click **"Manage Terms & Conditions"** instead.

### Step 5: View on Your Website

1. Visit `privacypolicy.html` on your website
2. You should see your content displayed beautifully
3. Click the language buttons to switch between languages
4. Visit `termsandconditions.html` to see your terms

## 🎨 Using the Rich Text Editor

The editor toolbar provides these formatting options:

```
[H ▾] [B] [I] [U] [• ▾] [1. ▾] [🔗] [🧹]
 │     │   │   │    │     │      │    │
 │     │   │   │    │     │      │    └─ Clean formatting
 │     │   │   │    │     │      └────── Add link
 │     │   │   │    │     └───────────── Numbered list
 │     │   │   │    └─────────────────── Bullet list
 │     │   │   └──────────────────────── Underline
 │     │   └──────────────────────────── Italic
 │     └──────────────────────────────── Bold
 └────────────────────────────────────── Headers (H1/H2/H3)
```

### Example Content Structure:

```
# Privacy Policy                    ← Use H1 for main title
## Data Collection                  ← Use H2 for sections
### What We Collect                 ← Use H3 for subsections

We collect the following:
• Personal information              ← Use bullet lists
• Booking details
• Payment information

For more details, visit our website ← You can add links
```

## 🌍 Multi-Language Support

### Important Notes:
- You must add content for **all three languages** (EN, NL, FR)
- Each language is independent - there's no automatic translation
- Visitors can switch between languages on the public pages
- If a language has no content, visitors will see a "content not available" message

### Best Practice:
1. Write your content in English first
2. Translate to Dutch
3. Translate to French
4. Review all three versions before saving

## 🔍 Viewing Your Content

### Public Pages:
- **Privacy Policy**: `https://yourdomain.com/privacypolicy.html`
- **Terms & Conditions**: `https://yourdomain.com/termsandconditions.html`

### Language Selector:
Visitors will see three buttons at the top:
```
[🇬🇧 English]  [🇳🇱 Nederlands]  [🇫🇷 Français]
```

Clicking a button instantly switches the language without reloading the page.

## ✏️ Editing Existing Content

To edit content that's already saved:

1. Go to admin dashboard
2. Click "Manage Privacy Policy" or "Manage Terms & Conditions"
3. The modal will open with your existing content loaded
4. Make your changes in any language tab
5. Click "Save Changes"
6. Changes are immediately visible on the public pages

## 🆘 Troubleshooting

### "Failed to load" error
**Problem**: Can't load existing content  
**Solution**: 
- Make sure you've updated Firebase rules (Step 1)
- Check that you're logged in to the admin dashboard
- Verify your internet connection

### "Failed to save" error
**Problem**: Can't save new content  
**Solution**:
- Make sure you've updated Firebase rules (Step 1)
- Confirm you're logged in as an authenticated admin user
- Check browser console for detailed error messages

### Content not displaying on public page
**Problem**: Public page shows "content not available"  
**Solution**:
- Verify you've saved content in the admin dashboard
- Check that Firebase rules allow public read access (`.read: true`)
- Clear your browser cache and refresh the page

### Editor not loading
**Problem**: Modal opens but editor doesn't appear  
**Solution**:
- Check your internet connection (Quill loads from CDN)
- Try refreshing the admin dashboard page
- Check browser console for JavaScript errors

## 📚 Additional Documentation

For more detailed information, see these files:

- **PRIVACY_TERMS_FIREBASE_SETUP.md**: Complete Firebase configuration guide
- **PRIVACY_TERMS_IMPLEMENTATION.md**: Technical implementation details
- **VISUAL_GUIDE.md**: Visual mockups and workflows

## 💡 Tips & Best Practices

1. **Start Simple**: Begin with basic content, then enhance with formatting
2. **Use Headers**: Break up content with clear section headers (H2, H3)
3. **Lists**: Use lists for policies that have multiple points
4. **Links**: Add links to related pages or external resources
5. **Preview**: Save frequently and preview on the public page
6. **All Languages**: Don't forget to add content in all three languages
7. **Legal Review**: Have your legal team review before publishing
8. **Updates**: Update the "Last Updated" date when making changes

## 📞 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review the detailed documentation files
3. Check browser console for error messages
4. Verify Firebase rules are correctly configured

## 🎉 You're Ready!

You now have everything you need to manage your Privacy Policy and Terms & Conditions. Start by adding your content in the admin dashboard, and your visitors will be able to view it in their preferred language!

---

**Last Updated**: February 2026  
**Version**: 1.0  
**Feature**: Privacy Policy & Terms Management with Multi-Language Support
