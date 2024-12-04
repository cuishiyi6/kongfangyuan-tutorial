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
function generateVideoHTML() {
    const container = document.getElementById('videoContainer');
    videoData.forEach(video => {
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
}

// 初始化页面
document.addEventListener('DOMContentLoaded', generateVideoHTML);

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