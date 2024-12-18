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
            loadSprite: true,
            iconUrl: 'https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/plyr.svg',
            blankVideo: 'https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/blank.mp4',
            previewThumbnails: { enabled: false },
            storage: { enabled: true, key: `plyr-${index}` },
            keyboard: { focused: true, global: false },
            tooltips: { controls: true, seek: true },
            captions: { active: true, language: 'auto' },
            hideControls: false,
            resetOnEnd: false,
            clickToPlay: true,
            disableContextMenu: false
        });

        // 添加错误处理
        handleVideoError(plyrInstance);

        // 初始化视频播放优化
        optimizeVideoPlayback(plyrInstance);
        
        // 初始化播放记忆功能
        initializeVideoPlayer(plyrInstance, index);

        return plyrInstance;
    });

    // 处理加载状态
    handleVideoLoading(players);
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

// 添加视频播放记忆功能
function initializeVideoPlayer(player, videoId) {
    // 读取上次播��位置
    const lastTime = localStorage.getItem(`video-${videoId}-time`);
    if (lastTime) {
        player.currentTime = parseFloat(lastTime);
    }

    // 定期保存播放位置
    player.on('timeupdate', () => {
        localStorage.setItem(`video-${videoId}-time`, player.currentTime);
    });

    // 添加播放速度记忆
    const lastSpeed = localStorage.getItem('video-playback-speed');
    if (lastSpeed) {
        player.speed = parseFloat(lastSpeed);
    }
}

// 视频播放优化
function optimizeVideoPlayback(player) {
    // 自动选择合适的清晰度
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        if (connection.effectiveType === '4g') {
            player.quality = 720;
        } else {
            player.quality = 480;
        }
    }

    // 添加播放错误处理
    player.on('error', (error) => {
        console.error('视频播放错误:', error);
        const container = player.elements.container.closest('.video-container');
        container.innerHTML += `
            <div class="video-error">
                <p>视频加载失败，请刷新页面重试</p>
                <button onclick="location.reload()">刷新页面</button>
            </div>
        `;
    });

    // 添加缓冲提示
    player.on('waiting', () => {
        const container = player.elements.container.closest('.video-container');
        container.classList.add('buffering');
    });

    player.on('playing', () => {
        const container = player.elements.container.closest('.video-container');
        container.classList.remove('buffering');
    });
}

// 添加视频错误处理
function handleVideoError(player) {
    let retryCount = 0;
    const maxRetries = 3;

    player.on('error', async (error) => {
        console.error('视频加载错误:', error);
        
        if (retryCount < maxRetries) {
            retryCount++;
            console.log(`视频加载失败，正在进行第 ${retryCount} 次重试...`);
            
            // 尝试重新加载视频
            try {
                await player.source(player.source);
            } catch (e) {
                console.error('重试失败:', e);
            }
        } else {
            const container = player.elements.container.closest('.video-container');
            const errorElement = document.createElement('div');
            errorElement.className = 'video-error';
            errorElement.innerHTML = `
                <p>视频加载失败，请检查网络连接后重试</p>
                <button onclick="location.reload()">重新加载</button>
                <a href="${player.source}" download class="download-fallback">
                    下载视频
                </a>
            `;
            container.appendChild(errorElement);
        }
    });

    // 添加加载状态监听
    player.on('loadstart', () => {
        const container = player.elements.container.closest('.video-container');
        container.classList.add('loading');
    });

    player.on('canplay', () => {
        const container = player.elements.container.closest('.video-container');
        container.classList.remove('loading');
    });
} 