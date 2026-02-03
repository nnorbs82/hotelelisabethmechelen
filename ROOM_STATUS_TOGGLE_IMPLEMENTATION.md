# Room Status Toggle Implementation

## Overview
This feature allows administrators to toggle room availability status between "Available" and "Offline" on the admin dashboard. When a room is set to offline, it will no longer appear on the public-facing rooms.html page.

## What Was Changed

### 1. Admin Dashboard (admin-dashboard.html)
- **Toggle UI**: Added a visual toggle switch in the Room Management section that displays the current status of each room
- **Status Display**: Each room now shows its status (Available/Offline) with color-coded indicators:
  - Green = Available
  - Gray = Offline
- **Toggle Function**: Added `toggleRoomStatus()` function to update room status in Firebase when toggled
- **Save Function**: Updated room save logic to preserve status when editing rooms (defaults to 'available' for new rooms)

### 2. Rooms Page (rooms.html)
- **Filtering**: Modified the `loadRooms()` function to filter out rooms with status = 'offline'
- **Default Behavior**: Rooms without a status field are treated as 'available' (backward compatibility)

### 3. Firebase Rules Documentation (FIREBASE_RULES_SETUP.md)
Updated the documentation to include:
- **Database Rules**: Added `rooms` section with public read access (needed for front-end display)
- **Storage Rules**: Added `room-photos` folder rules for room photo management

## Firebase Configuration Required

### ⚠️ IMPORTANT: You MUST update your Firebase Rules

For this feature to work properly, you need to update your Firebase Security Rules in the Firebase Console:

### Step 1: Update Realtime Database Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hotelelisabethmechelen-9dd98`
3. Click on **Realtime Database** in the left sidebar
4. Click on the **Rules** tab
5. Add this section to your rules (if not already present):

```json
"rooms": {
  ".read": true,
  ".write": "auth != null"
}
```

**Full example with rooms section:**
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "rooms": {
      ".read": true,
      ".write": "auth != null"
    },
    // ... other sections ...
  }
}
```

### Step 2: Update Storage Rules (if not already set)

1. In Firebase Console, click on **Storage** in the left sidebar
2. Click on the **Rules** tab
3. Add this section to your rules (if not already present):

```
// Allow anyone to read files in room-photos folder
match /room-photos/{allPaths=**} {
  allow read: if true;
  allow write, delete: if request.auth != null;
}
```

**Note**: The storage rules for room-photos may already be covered by the catch-all rule. If room photos are already working, you can skip this step.

## How to Use

### For Administrators:

1. Log in to the admin dashboard (`hoteladmin.html`)
2. Click on **Room Management** in the sidebar
3. You'll see all rooms with their current status
4. Each room has a toggle switch:
   - **Green + "Available"** = Room is visible on the website
   - **Gray + "Offline"** = Room is hidden from the website
5. Click the toggle to switch between Available and Offline
6. The change is saved immediately to Firebase

### For Website Visitors:

- Only rooms marked as "Available" will appear on the rooms.html page
- Offline rooms are automatically filtered out
- No visible change in the rooms page interface - offline rooms simply don't appear

## Data Structure

Each room in Firebase now has a `status` field:

```json
{
  "rooms": {
    "room_123456": {
      "name_en": "Deluxe Suite",
      "status": "available",  // or "offline"
      // ... other room fields ...
    }
  }
}
```

- **Default**: New rooms are created with `status: "available"`
- **Backward Compatibility**: Existing rooms without a status field are treated as "available"

## Technical Details

### Admin Dashboard Changes

1. **renderRoomsList()** - Updated to display status toggle for each room
2. **toggleRoomStatus()** - New function to handle status changes
3. **Save Room Logic** - Preserves status when editing, defaults to 'available' for new rooms

### Rooms Page Changes

1. **loadRooms()** - Added filter to exclude rooms where `status === 'offline'`

### Firebase Rules

- **Database**: Rooms need public read access so the front-end can display them
- **Storage**: Room photos need public read access for display on the website
- **Security**: Only authenticated admins can write/modify room data

## Testing Checklist

- [ ] Toggle a room to offline on admin dashboard
- [ ] Verify the room disappears from rooms.html
- [ ] Toggle the room back to available
- [ ] Verify the room reappears on rooms.html
- [ ] Create a new room and verify it defaults to available
- [ ] Edit an existing room and verify status is preserved

## Troubleshooting

### Room toggles don't work
- **Check**: Ensure you're logged in as an admin
- **Check**: Verify Firebase Database rules allow authenticated writes to `rooms/`

### Offline rooms still appear on website
- **Check**: Clear browser cache and refresh rooms.html
- **Check**: Verify the status field in Firebase Database is set to "offline"

### Room photos don't display
- **Check**: Verify Firebase Storage rules allow public read access to `room-photos/`
- **Check**: Ensure the photo URLs in Firebase Database are correct

## Security Considerations

- ✅ Only authenticated admins can change room status
- ✅ Public users can read room data but cannot modify it
- ✅ Room photos are publicly readable (required for website display)
- ✅ Offline status is a soft delete - no data is actually removed

## Future Enhancements

Potential improvements for future versions:
- Add a filter/tab to view offline vs available rooms separately
- Add bulk toggle functionality (toggle multiple rooms at once)
- Add scheduling (set rooms offline for specific date ranges)
- Add reason field for why a room is offline (maintenance, renovation, etc.)
