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
            keyboard: { focused: true, global: false },
            fullscreen: {
                enabled: true,
                fallback: true,
                iosNative: true // 启用 iOS 原生全屏
            },
            ratio: '16:9'
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

        // 监听全屏变化
        plyrInstance.on('enterfullscreen', () => {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                // 强制横屏
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(() => {
                        // 某些设备可能不支持锁定方向
                        console.log('Orientation lock not supported');
                    });
                }
                // 设置视频容器样式以适应横屏
                player.closest('.video-container').style.height = '100%';
                player.style.height = '100vh';
            }
        });

        // 退出全屏时恢复
        plyrInstance.on('exitfullscreen', () => {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                // 解除横屏锁定
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
                // 恢复原始样式
                player.closest('.video-container').style.height = '';
                player.style.height = '';
            }
        });

        // 处理 iOS 的特殊情况
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            player.setAttribute('playsinline', 'true');
            player.setAttribute('webkit-playsinline', 'true');
            
            // 添加全屏时的样式
            const style = document.createElement('style');
            style.textContent = `
                video::-webkit-media-controls-fullscreen-button {
                    display: flex !important;
                }
                .plyr--fullscreen-active video {
                    object-fit: contain !important;
                    width: 100% !important;
                    height: 100% !important;
                }
            `;
            document.head.appendChild(style);
        }

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