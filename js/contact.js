// 处理弹窗交互
document.addEventListener('DOMContentLoaded', function() {
    const wechatBtn = document.getElementById('wechatBtn');
    if (!wechatBtn) {
        console.error('微信按钮未找到');
        return; // 检查按钮是否存在
    }
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

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    const contactButtons = document.querySelectorAll('.contact-button');
    
    // 检查是否存在联系按钮
    if (!contactButtons || contactButtons.length === 0) return;
    
    // 移动端触摸处理
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        contactButtons.forEach(button => {
            let touchTimeout;
            
            button.addEventListener('touchstart', () => {
                touchTimeout = setTimeout(() => {
                    button.classList.add('show');
                }, 200);
            });
            
            button.addEventListener('touchend', () => {
                clearTimeout(touchTimeout);
                setTimeout(() => {
                    button.classList.remove('show');
                }, 1000);
            });
        });
    }
}); 