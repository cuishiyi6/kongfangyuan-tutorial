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