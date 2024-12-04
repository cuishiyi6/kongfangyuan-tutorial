// Plyr播放器配置和初始化
document.addEventListener('DOMContentLoaded', function() {
    // 存储所有播放器实例
    let players = [];

    // 初始化所有视频播放器
    players = Array.from(document.querySelectorAll('.video-player')).map((player, index) => {
        const plyrInstance = new Plyr(player, {
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
            storage: { enabled: true, key: 'plyr' },
            keyboard: { focused: true, global: false }
        });

        // 加载保存的播放进度
        const savedTime = localStorage.getItem(`video-${index}-progress`);
        if (savedTime) {
            plyrInstance.on('ready', () => {
                plyrInstance.currentTime = parseFloat(savedTime);
            });
        }

        // 每5秒保存一次播放进度
        plyrInstance.on('timeupdate', () => {
            localStorage.setItem(`video-${index}-progress`, plyrInstance.currentTime);
        });

        // 播放时自动获得焦点
        plyrInstance.on('play', () => {
            player.focus();
        });

        return plyrInstance;
    });

    // 处理加载状态
    handleVideoLoading(players);

    // 添加播放控制
    players.forEach((player, index) => {
        player.on('play', () => {
            // 暂停其他所有视频
            players.forEach((otherPlayer, otherIndex) => {
                if (otherIndex !== index && otherPlayer.playing) {
                    otherPlayer.pause();
                }
            });
        });
    });
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