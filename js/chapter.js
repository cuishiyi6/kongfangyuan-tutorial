document.addEventListener('DOMContentLoaded', function() {
    const chapterNav = document.querySelector('.chapter-nav');
    const chapterToggle = document.querySelector('.chapter-toggle');
    const chapterList = document.querySelector('.chapter-list');
    const chapterLinks = document.querySelectorAll('.chapter-list a');

    // 切换章节列表显示
    chapterToggle.addEventListener('click', () => {
        chapterNav.classList.toggle('active');
        chapterList.style.display = chapterNav.classList.contains('active') ? 'flex' : 'none';
    });

    // 点击章节链接
    chapterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有active类
            chapterLinks.forEach(l => l.classList.remove('active'));
            
            // 添加active类到当前链接
            link.classList.add('active');

            // 获取目标视频
            const videoId = link.getAttribute('data-video');
            const targetVideo = document.querySelector(`.video-container:nth-child(${videoId})`);

            // 滚动到视频位置
            targetVideo.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // 如果是移动端，点击后关闭章节列表
            if (window.innerWidth <= 768) {
                chapterNav.classList.remove('active');
                chapterList.style.display = 'none';
            }
        });
    });

    // 监听滚动，高亮当前章节
    window.addEventListener('scroll', () => {
        const videos = document.querySelectorAll('.video-container');
        const windowMiddle = window.scrollY + window.innerHeight / 2;

        videos.forEach((video, index) => {
            const videoTop = video.offsetTop;
            const videoBottom = videoTop + video.offsetHeight;

            if (windowMiddle >= videoTop && windowMiddle < videoBottom) {
                chapterLinks.forEach(link => link.classList.remove('active'));
                chapterLinks[index].classList.add('active');
            }
        });
    });
}); 