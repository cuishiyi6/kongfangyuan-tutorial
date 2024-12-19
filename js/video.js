// 存储所有播放器实例
let players = [];
let currentPlayingPlayer = null;  // 添加当前播放的播放器引用

// 初始化播放器函数
function initializePlayers() {
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
            i18n: {
                restart: '重新播放',
                play: '播放',
                pause: '暂停',
                fastForward: '快进',
                rewind: '快退',
                settings: '设置',
                mute: '静音',
                unmute: '取消静音',
                enterFullscreen: '全屏',
                exitFullscreen: '退出全屏',
                speed: '播放速度',
                normal: '正常'
            },
            settings: ['quality', 'speed'],
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
            loadSprite: false,
            iconUrl: '',
            blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
            preload: 'metadata',
            ratio: '16:9',
            fullscreen: {
                enabled: true,
                fallback: true,
                iosNative: true
            },
            resetOnEnd: false,
            clickToPlay: true,
            hideControls: false,
            keyboard: { focused: true, global: false }
        });

        // 添加播放事件监听
        plyrInstance.on('play', () => {
            // 如果有其他视频在播放，就暂停它
            if (currentPlayingPlayer && currentPlayingPlayer !== plyrInstance) {
                currentPlayingPlayer.pause();
            }
            // 更新当前播放的视频
            currentPlayingPlayer = plyrInstance;
        });

        // 添加暂停事件监听
        plyrInstance.on('pause', () => {
            // 如果暂停的是当前播放的视频，清除引用
            if (currentPlayingPlayer === plyrInstance) {
                currentPlayingPlayer = null;
            }
        });

        // 添加结束事件监听
        plyrInstance.on('ended', () => {
            // 视频���时清除引用
            if (currentPlayingPlayer === plyrInstance) {
                currentPlayingPlayer = null;
            }
        });

        // 添加错误处理
        handleVideoError(plyrInstance);
        return plyrInstance;
    });

    // 处理加载状态
    handleVideoLoading(players);
}

// 处理视频加载状态
function handleVideoLoading(players) {
    players.forEach(player => {
        const container = player.elements.container.closest('.video-container');
        if (!container) {
            console.error('视频容器未找到');
            return; // 检查 container 是否存在
        }
        const loading = container.querySelector('.video-loading');
        if (!loading) {
            console.error('加载指示器未找到');
            return; // 检查 loading 是否存在
        }
        
        player.on('ready', () => loading.style.display = 'none');
        player.on('loadstart', () => loading.style.display = 'block');
        player.on('canplay', () => loading.style.display = 'none');
    });
}

// 初始化页面时的播放器
document.addEventListener('DOMContentLoaded', () => {
    initializePlayers();
});

// 添加视频播放记忆功能
function initializeVideoPlayer(player, videoId) {
    // 读取上次播放位置
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