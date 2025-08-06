const CACHE_NAME = 'arch-taplink-v1';
const STATIC_CACHE_NAME = 'arch-static-v1';
const DYNAMIC_CACHE_NAME = 'arch-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/arch-logo.svg',
  '/arch-corgi-logo.svg',
  '/favicon.ico',
  '/favicon.svg',
  // Add critical CSS and JS files that Next.js generates
];

// Routes to cache dynamically
const CACHEABLE_ROUTES = [
  '/',
  '/privacy-policy',
  '/terms',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
  
  // Force the service worker to become active immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches that don't match current version
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName.startsWith('arch-')) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all clients immediately
  return self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and external requests
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return;
  }
  
  // Handle different types of requests with appropriate strategies
  if (isStaticAsset(request)) {
    // Cache First strategy for static assets
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(request)) {
    // Network First strategy for API requests
    event.respondWith(networkFirst(request));
  } else if (isPageRequest(request)) {
    // Stale While Revalidate for pages
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache First Strategy - for static assets
async function cacheFirst(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    const response = await fetch(request);
    if (response.status === 200) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// Network First Strategy - for API requests
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    // Return offline fallback for API requests
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'Content not available offline' 
      }), 
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Stale While Revalidate Strategy - for pages
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cached = await cache.match(request);
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch((error) => {
    console.error('[SW] Background fetch failed:', error);
  });
  
  // Return cached version immediately if available
  if (cached) {
    // Don't await the fetch promise to return immediately
    fetchPromise;
    return cached;
  }
  
  // If not cached, wait for network
  try {
    return await fetchPromise;
  } catch (error) {
    // Return offline fallback page
    return new Response(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ARCH - Офлайн</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #2B2827;
            color: white;
            margin: 0;
            padding: 2rem;
            text-align: center;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          h1 { color: #FF731D; }
          .logo { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; }
        </style>
      </head>
      <body>
        <div class="logo">ARCH</div>
        <h1>Вы офлайн</h1>
        <p>Проверьте подключение к интернету и попробуйте еще раз.</p>
        <button onclick="window.location.reload()" style="
          background: #FF731D;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 16px;
        ">Попробовать снова</button>
      </body>
      </html>
    `, {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}

// Helper functions to determine request types
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot|ico)$/);
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || 
         url.pathname.startsWith('/ingest/') ||
         url.hostname.includes('posthog.com');
}

function isPageRequest(request) {
  const url = new URL(request.url);
  return request.headers.get('accept')?.includes('text/html') &&
         !isStaticAsset(request) &&
         !isAPIRequest(request);
}

// Handle background sync for form submissions (future enhancement)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag);
  // Implement background sync logic here if needed
});

// Handle push notifications (future enhancement)
self.addEventListener('push', (event) => {
  console.log('[SW] Push event received');
  // Implement push notification logic here if needed
});