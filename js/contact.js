// 处理弹窗交互
document.addEventListener('DOMContentLoaded', function() {
    const wechatBtn = document.getElementById('wechatBtn');
    const wechatModal = document.getElementById('wechatModal');
    const closeBtn = wechatModal.querySelector('.close-btn');

    // 打开弹窗
    wechatBtn.addEventListener('click', function() {
        wechatModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 关闭弹窗
    function closeModal() {
        wechatModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    
    // 点击背景关闭弹窗
    wechatModal.addEventListener('click', function(e) {
        if (e.target === wechatModal) {
            closeModal();
        }
    });

    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && wechatModal.classList.contains('show')) {
            closeModal();
        }
    });
}); 