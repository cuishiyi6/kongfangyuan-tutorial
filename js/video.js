// Plyr播放器配置和初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有视频播放器
    const players = Array.from(document.querySelectorAll('.video-player')).map(player => {
        return new Plyr(player, {
            controls: [
                'play-large',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'settings',
                'fullscreen'
            ],
            settings: ['quality', 'speed'],
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
            quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
            loadSprite: true,
            iconUrl: 'https://cdn.plyr.io/3.7.8/plyr.svg',
            blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
            previewThumbnails: { enabled: false },
            storage: { enabled: true, key: 'plyr' }
        });
    });

    // 处理加载状态
    handleVideoLoading(players);
});

// 处理视频加载状态
function handleVideoLoading(players) {
    players.forEach(player => {
        const container = player.elements.container.closest('.video-container');
        const loading = container.querySelector('.video-loading');
        
        player.on('ready', () => loading.style.display = 'none');
        player.on('loadstart', () => loading.style.display = 'block');
        player.on('canplay', () => loading.style.display = 'none');
    });
} 