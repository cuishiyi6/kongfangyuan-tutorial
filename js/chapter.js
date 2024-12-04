document.addEventListener('DOMContentLoaded', function() {
    const chapterToggle = document.querySelector('.chapter-toggle');
    const chapterModal = document.getElementById('chapterModal');
    const chapterClose = document.querySelector('.chapter-close');
    const chapterLinks = document.querySelectorAll('.chapter-list a');

    // 打开章节列表
    chapterToggle.addEventListener('click', () => {
        chapterModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // 关闭章节列表
    function closeChapterModal() {
        chapterModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    chapterClose.addEventListener('click', closeChapterModal);

    // 点击背景关闭
    chapterModal.addEventListener('click', (e) => {
        if (e.target === chapterModal) {
            closeChapterModal();
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chapterModal.classList.contains('show')) {
            closeChapterModal();
        }
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

            // 关闭章节列表
            closeChapterModal();

            // 滚动到视频位置
            targetVideo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}); 