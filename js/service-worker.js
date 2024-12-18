// 添加 Service Worker 支持离线访问
const CACHE_NAME = 'video-tutorial-v1';
const urlsToCache = [
    '/',
    '/css/style.css',
    '/css/video.css',
    '/css/themes.css',
    '/js/main.js',
    '/js/video.js',
    // 其他资源...
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
}); 