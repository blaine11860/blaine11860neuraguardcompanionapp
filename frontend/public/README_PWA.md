# PWA Status - ORS Monitor

## Current Implementation

This app is a **Progressive Web App (PWA)** with the following features:

### ✅ Working Features
- **Installable on iOS/Android/Desktop** - Add to home screen functionality
- **App-like experience** - Runs in standalone mode without browser UI
- **Custom app icon** - Professional medical icon on home screen
- **iOS-optimized** - Proper safe areas, status bar, and touch icons
- **Runtime caching** - Assets are cached after first load for faster subsequent visits
- **Partial offline support** - App works offline after visiting once while online

### ⚠️ Current Limitations
- **First offline visit** - Requires initial online load to cache assets
- **Not fully offline-first** - JavaScript bundles load from network on first visit
- **Manual refresh needed** - Service worker updates require page refresh

## How It Works

### Installation Flow
1. User visits app online (first time)
2. Service worker registers and caches HTML, manifest, and icons
3. As user navigates, JS/CSS/images are cached dynamically
4. User can add to home screen
5. Subsequent visits work faster and can handle brief offline periods

### Offline Behavior
- **After first online visit**: App shell, JS, CSS cached → works offline
- **Cold start offline**: Will show blank page (needs online first load)
- **API calls**: Always require internet (shows error message when offline)

## Upgrade Path for Full Offline Support

To achieve true offline-first behavior, implement:

1. **Workbox** - Google's PWA tooling
   ```js
   import { injectManifest } from 'workbox-build';
   ```

2. **Build-time precaching** - Generate asset manifest during build
   ```js
   // vite.config.js with workbox plugin
   ```

3. **Update prompts** - Notify users when new version available

## User Experience

### What Users See
1. **iOS Safari**:
   - Tap Share → Add to Home Screen
   - App icon appears with name "ORS Monitor"
   - Opens full screen with blue status bar
   - Works like native app

2. **Offline (after first visit)**:
   - App loads immediately from cache
   - All UI functional
   - API calls show "Offline" error
   - Can view cached data

3. **Updates**:
   - Automatic in background
   - Refresh page to get latest version
   - Service worker version increments (currently v2)

## Technical Details

### Service Worker Strategy
```
Static Cache: HTML, manifest, icons (precached on install)
Runtime Cache: JS, CSS, images (cached on first fetch)
Network-First: API calls (with offline fallback)
```

### Cache Management
- Static cache: `ors-monitor-v2`
- Runtime cache: `ors-runtime-v2`
- Old caches deleted on activation
- Assets cached indefinitely (until version bump)

### Browser Support
- ✅ iOS Safari 16+ (Add to Home Screen)
- ✅ Android Chrome 90+ (Install prompt)
- ✅ Desktop Chrome/Edge (Install app)
- ⚠️ Firefox (limited PWA support)

## Recommendations

### For Production Use
1. Implement Workbox for better caching
2. Add update notifications
3. Use HTTPS (required for service workers)
4. Test on real devices
5. Monitor cache storage usage

### For Users
1. Visit app online first before going offline
2. Refresh periodically to get updates
3. Clear cache if experiencing issues
4. Keep app updated via refresh

## Testing Checklist

- [x] Manifest loads correctly
- [x] Service worker registers
- [x] Icons display properly on iOS
- [x] App installs to home screen
- [x] Standalone mode works
- [x] Safe areas respected on iOS
- [ ] Fully works offline (cold start)
- [x] Runtime assets cache properly
- [ ] Update prompt implemented

## Next Steps

To upgrade to full PWA:
1. Install @vite-plugin-pwa
2. Configure workbox in vite.config.js
3. Generate asset manifest at build time
4. Implement update notifications
5. Test offline-first behavior
