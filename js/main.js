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

    // 点击模态���外部关闭
    templateModal.addEventListener('click', function(e) {
        if (e.target === templateModal) {
            templateModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

// 添加移动端检测和适配代码
document.addEventListener('DOMContentLoaded', function() {
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 调整视频容器的布局
        const videoContainers = document.querySelectorAll('.video-container');
        videoContainers.forEach(container => {
            container.style.margin = '10px 0';
            container.style.padding = '10px';
        });

        // 调整章节导航按钮位置
        const chapterNav = document.querySelector('.chapter-nav');
        if (chapterNav) {
            chapterNav.style.position = 'fixed';
            chapterNav.style.left = '10px';
            chapterNav.style.bottom = '20px';
            chapterNav.style.top = 'auto';
            chapterNav.style.transform = 'none';
            chapterNav.style.zIndex = '1000';
        }

        // 调整联系按钮位置
        const contactButton = document.querySelector('.contact-button');
        if (contactButton) {
            contactButton.style.right = '10px';
            contactButton.style.bottom = '20px';
        }

        // 调整返回顶部按钮位置
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.style.right = '10px';
            backToTop.style.bottom = '80px';
        }

        // 优化模态框在移动端的显示
        const modalContents = document.querySelectorAll('.download-modal-content, .template-modal-content, .chapter-list');
        modalContents.forEach(content => {
            content.style.width = '95%';
            content.style.margin = '20px auto';
            content.style.maxHeight = '80vh';
            content.style.overflow = 'auto';
        });

        // 优化按钮组在移动端的显示
        const buttonGroup = document.querySelector('.button-group');
        if (buttonGroup) {
            buttonGroup.style.flexDirection = 'column';
            buttonGroup.style.gap = '10px';
        }

        // 添加触摸滑动支持
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, false);

        document.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].clientY;
            handleSwipe();
        }, false);

        function handleSwipe() {
            const swipeDistance = touchEndY - touchStartY;
            // 向上滑动超过50px时显示返回顶部按钮
            if (swipeDistance < -50 && window.scrollY > 300) {
                backToTop.classList.add('show');
            }
            // 向下滑动超过50px时隐藏返回顶部按钮
            else if (swipeDistance > 50) {
                backToTop.classList.remove('show');
            }
        }

        // 优化搜索框在移动端的体验
        const searchInput = document.getElementById('videoSearch');
        if (searchInput) {
            // 点击搜索框时自动滚动到可见区域
            searchInput.addEventListener('focus', function() {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });

            // 添加清除按钮
            const clearButton = document.createElement('button');
            clearButton.className = 'search-clear';
            clearButton.innerHTML = '×';
            clearButton.style.display = 'none';
            searchInput.parentNode.appendChild(clearButton);

            searchInput.addEventListener('input', function() {
                clearButton.style.display = this.value ? 'block' : 'none';
            });

            clearButton.addEventListener('click', function() {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                this.style.display = 'none';
            });
        }

        // 优化视频播放器控件大小
        const players = document.querySelectorAll('.plyr__video-embed');
        players.forEach(player => {
            player.style.fontSize = '14px';
        });

        // 处理键盘弹出时的布局问题
        const originalHeight = window.innerHeight;
        window.addEventListener('resize', function() {
            if (window.innerHeight < originalHeight) {
                // 键盘弹出时
                document.body.style.height = window.innerHeight + 'px';
            } else {
                // 键盘收起时
                document.body.style.height = '';
            }
        });
    }
}); 