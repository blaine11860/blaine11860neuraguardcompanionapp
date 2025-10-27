# Progressive Web App (PWA) Installation Guide

## Overview
The ORS Monitor is now a Progressive Web App that can be installed on iOS devices like a native app. It works offline, has a native app icon, and provides a full-screen experience.

## Installing on iOS (iPhone/iPad)

### Step 1: Open in Safari
1. Open Safari browser on your iOS device
2. Navigate to your ORS Monitor URL
3. Wait for the page to fully load

### Step 2: Add to Home Screen
1. Tap the **Share** button (square with arrow pointing up) at the bottom of Safari
2. Scroll down and tap **"Add to Home Screen"**
3. You'll see the ORS Monitor icon and name
4. Tap **"Add"** in the top right corner

### Step 3: Launch the App
1. Find the ORS Monitor icon on your home screen
2. Tap to launch
3. The app will open in full-screen mode without Safari UI
4. Works offline for cached content

## Installing on Android

### Chrome Installation
1. Open Chrome browser
2. Navigate to the ORS Monitor URL
3. Chrome will automatically show an "Install" prompt at the bottom
4. Tap **"Install"**
5. The app icon will appear on your home screen

### Manual Installation
1. Open Chrome and navigate to the app
2. Tap the **three-dot menu** in the top right
3. Select **"Add to Home screen"**
4. Tap **"Add"**

## Installing on Desktop

### Chrome/Edge
1. Open the ORS Monitor in Chrome or Edge
2. Look for the install icon (⊕ or computer icon) in the address bar
3. Click the icon
4. Click **"Install"**
5. The app will open in its own window

### Manual Installation
1. Open the app
2. Click the **three-dot menu**
3. Select **"Install ORS Monitor"** or **"Add to Desktop"**
4. Confirm installation

## PWA Features

### Offline Functionality
- The app caches essential files for offline access
- Navigation and UI work without internet
- API calls require internet connection (will show error when offline)

### App-like Experience
- Full-screen mode (no browser UI)
- Appears on home screen with custom icon
- Runs in standalone window on desktop
- Native-like transitions and animations

### Updates
- The app automatically updates when you're online
- Reload the page to get the latest version
- Service worker manages updates in the background

## Verifying Installation

### iOS
- ✅ App icon appears on home screen
- ✅ Opens in full screen without Safari bars
- ✅ Status bar matches app theme (blue)
- ✅ Can switch apps using app switcher

### Android
- ✅ App icon on home screen
- ✅ Splash screen on launch
- ✅ Full screen mode
- ✅ Appears in app drawer

### Desktop
- ✅ App in separate window
- ✅ Can pin to taskbar/dock
- ✅ Appears in app switcher
- ✅ Has its own icon in taskbar

## Troubleshooting

### iOS Not Showing "Add to Home Screen"
- Make sure you're using Safari (not Chrome or other browsers)
- Check that the page has fully loaded
- Try reloading the page

### Install Button Not Appearing (Desktop)
- Ensure you're using Chrome, Edge, or another supported browser
- The site must be served over HTTPS (or localhost)
- Clear browser cache and reload

### App Not Working Offline
- First load requires internet to cache files
- Some features (like API calculations) need internet
- Check service worker registration in browser DevTools

### App Not Updating
- Close and reopen the app
- Clear the app cache
- Uninstall and reinstall if needed

## Uninstalling

### iOS
1. Long-press the app icon
2. Tap **"Remove App"**
3. Select **"Delete App"**
4. Confirm deletion

### Android
1. Long-press the app icon
2. Drag to **"Uninstall"** or tap app info
3. Select **"Uninstall"**
4. Confirm

### Desktop
1. Open the installed app
2. Click the three-dot menu
3. Select **"Uninstall ORS Monitor"**
4. Confirm removal

## Technical Details

### Service Worker
- Caches static assets (HTML, CSS, JS)
- Provides offline fallback
- Automatically updates in background

### Manifest
- Defines app name and icon
- Sets display mode to standalone
- Configures theme colors
- Optimized for all platforms

### Browser Support
- ✅ iOS Safari 16+
- ✅ Android Chrome 90+
- ✅ Desktop Chrome 90+
- ✅ Desktop Edge 90+
- ⚠️ Limited support in Firefox

## Privacy & Storage

### What Gets Cached
- Application shell (HTML/CSS/JS)
- App manifest
- App icons
- Essential UI assets

### What Requires Internet
- Backend API calls
- ORS calculations
- Research data retrieval
- Real-time updates

### Storage Usage
- Typical install: ~2-5 MB
- Includes all cached assets
- Can be cleared from browser settings

## Best Practices

1. **First Load**: Ensure stable internet connection for initial install
2. **Updates**: Periodically reload to get latest features
3. **Offline Mode**: Understand which features need internet
4. **Storage**: Monitor device storage if installing many PWAs

## Support

For issues with PWA installation or functionality:
1. Check browser compatibility
2. Ensure HTTPS connection (or localhost)
3. Clear cache and try again
4. Check browser DevTools console for errors
