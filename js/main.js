// 视频数据
const videoData = [
    {
        id: 1,
        title: "物业注册到孔方源平台",
        file: "A1.mp4"
    },
    {
        id: 2,
        title: "登陆物业平台添加小区",
        file: "A2.mp4"
    },
    {
        id: 3,
        title: "小区添加楼栋、单元、房间",
        file: "A3.mp4"
    },
    {
        id: 4,
        title: "添加业主的两种方式",
        file: "A4.mp4"
    },
    {
        id: 5,
        title: "如何创建收费标准",
        file: "A5.mp4"
    },
    {
        id: 6,
        title: "房间绑定收费标准之后如何批量生成账单",
        file: "A6.mp4"
    },
    {
        id: 7,
        title: "如何对业主账单进行收费",
        file: "A7.mp4"
    }
];

// 生成视频HTML
function generateVideoHTML(videos = videoData) {
    const container = document.getElementById('videoContainer');
    container.innerHTML = ''; // 清空容器
    
    videos.forEach(video => {
        container.innerHTML += `
            <div class="video-container">
                <div class="title-container">
                    <div class="video-number">${video.id}</div>
                    <h3>A${video.id} - ${video.title}</h3>
                </div>
                <video 
                    class="video-player plyr__video-embed" 
                    playsinline 
                    controls
                    data-poster=""
                >
                    <source src="./video/${video.file}" type="video/mp4">
                    您的浏览器不支持视频播放。
                </video>
                <div class="video-loading"></div>
            </div>
        `;
    });

    // 重新初始化视频播放器
    initializePlayers();
}

// 搜索功能
function initializeSearch() {
    const searchInput = document.getElementById('videoSearch');
    const searchSection = document.querySelector('.search-section');
    
    // 创建下拉框
    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    searchSection.appendChild(dropdown);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            dropdown.classList.remove('show');
            generateVideoHTML();
            return;
        }

        const filteredVideos = videoData.filter(video => 
            video.title.toLowerCase().includes(searchTerm)
        );

        if (filteredVideos.length === 0) {
            dropdown.innerHTML = `
                <div class="search-item">
                    <span class="video-title">没有找到相关视频</span>
                </div>
            `;
        } else {
            dropdown.innerHTML = filteredVideos.map(video => `
                <div class="search-item" data-video-id="${video.id}">
                    <div class="video-number">${video.id}</div>
                    <span class="video-title">${video.title}</span>
                </div>
            `).join('');
        }
        
        dropdown.classList.add('show');
    });

    // 点击下拉项
    dropdown.addEventListener('click', (e) => {
        const searchItem = e.target.closest('.search-item');
        if (!searchItem) return;

        const videoId = searchItem.dataset.videoId;
        if (!videoId) return;

        // 滚动到对应视频
        const targetVideo = document.querySelector(`.video-container:nth-child(${videoId})`);
        if (targetVideo) {
            targetVideo.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // 清空搜索
            searchInput.value = '';
            dropdown.classList.remove('show');
        }
    });

    // 点击外部关闭下拉框
    document.addEventListener('click', (e) => {
        if (!searchSection.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // ESC键关闭下拉框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('show');
            searchInput.blur();
        }
    });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    generateVideoHTML();
    initializeSearch();
});

// 返回顶部功能
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// 下载模态框功能
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadModal = document.getElementById('downloadModal');
    const downloadModalClose = document.querySelector('.download-modal-close');

    // 打开模态框
    downloadBtn.addEventListener('click', function() {
        downloadModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 关闭模态框
    downloadModalClose.addEventListener('click', function() {
        downloadModal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // 点击模态框外部关闭
    downloadModal.addEventListener('click', function(e) {
        if (e.target === downloadModal) {
            downloadModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

// 模板模态框功能
document.addEventListener('DOMContentLoaded', function() {
    const templateBtn = document.getElementById('templateBtn');
    const templateModal = document.getElementById('templateModal');
    const templateModalClose = document.querySelector('.template-modal-close');

    // 打开模态框
    templateBtn.addEventListener('click', function() {
        templateModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // 关闭模态框
    templateModalClose.addEventListener('click', function() {
        templateModal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // 点击模态框外部关闭
    templateModal.addEventListener('click', function(e) {
        if (e.target === templateModal) {
            templateModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

// 添加防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 添加节流函数
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 修改移动端适配代码
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 防止页面弹跳
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.body.style.overscrollBehavior = 'none';
        
        // 处理搜索框焦点
        const searchInput = document.getElementById('videoSearch');
        if (searchInput) {
            const handleFocus = debounce(() => {
                setTimeout(() => {
                    window.scrollTo(0, searchInput.offsetTop - 10);
                }, 300);
            }, 100);

            searchInput.addEventListener('focus', handleFocus);
        }

        // 优化滚动处理
        const handleScroll = throttle(() => {
            const backToTop = document.getElementById('backToTop');
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);

        // 优化返回顶部按钮点击
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            const scrollToTop = throttle(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 500);

            backToTop.addEventListener('click', scrollToTop);
        }

        // 处理模态框
        const handleModal = (modalId, btnId, closeClass) => {
            const modal = document.getElementById(modalId);
            const btn = document.getElementById(btnId);
            const close = modal.querySelector(`.${closeClass}`);

            const showModal = debounce(() => {
                modal.classList.add('show');
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.top = `-${window.scrollY}px`;
            }, 100);

            const hideModal = debounce(() => {
                modal.classList.remove('show');
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }, 100);

            btn.addEventListener('click', showModal);
            close.addEventListener('click', hideModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) hideModal();
            });
        };

        // 初始化模态框
        handleModal('downloadModal', 'downloadBtn', 'download-modal-close');
        handleModal('templateModal', 'templateBtn', 'template-modal-close');

        // 处理触摸滑动
        let touchStartY = 0;
        const handleTouchStart = throttle((e) => {
            touchStartY = e.touches[0].clientY;
        }, 100);

        const handleTouchEnd = throttle((e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const swipeDistance = touchEndY - touchStartY;
            const backToTop = document.getElementById('backToTop');
            
            if (swipeDistance < -50 && window.scrollY > 300) {
                backToTop.classList.add('show');
            } else if (swipeDistance > 50) {
                backToTop.classList.remove('show');
            }
        }, 100);

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);
    }
}); 