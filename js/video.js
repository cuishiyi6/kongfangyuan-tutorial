// 存储所有播放器实例
let players = [];

// 初始化播放器函数
function initializePlayers() {
    // 清除旧的播放器实例
    players.forEach(player => player.destroy());
    players = [];

    // 初始化所有视频播放器
    players = Array.from(document.querySelectorAll('.video-player')).map((player, index) => {
        const plyrInstance = new Plyr(player, {
            controls: [
                'play-large',
                'restart',
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
            loadSprite: false,
            iconUrl: 'https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/plyr.svg',
            blankVideo: 'https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/blank.mp4',
            preload: 'metadata',
            crossOrigin: 'anonymous'
        });

        // 添加错误处理
        handleVideoError(plyrInstance);
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
}

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

// 初始化页面时的播放器
document.addEventListener('DOMContentLoaded', initializePlayers); 