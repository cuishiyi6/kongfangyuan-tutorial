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

// 移动端联系按钮处理
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const contactButtons = document.querySelectorAll('.contact-button');
        let activeButton = null;
        let hideTimeout;

        contactButtons.forEach(button => {
            button.addEventListener('touchstart', function(e) {
                // 阻止默认行为，防止立即触发链接
                e.preventDefault();
                
                // 如果有其他展开的按钮，先收起
                if (activeButton && activeButton !== this) {
                    activeButton.classList.remove('show');
                }
                
                // 清除之前的定时器
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                }
                
                // 展开当前按钮
                this.classList.add('show');
                activeButton = this;
                
                // 设置定时器，3秒后自动收起
                hideTimeout = setTimeout(() => {
                    this.classList.remove('show');
                    activeButton = null;
                }, 3000);
            });

            // 点击展开的内容时触发实际操作
            button.addEventListener('click', function(e) {
                if (this.classList.contains('show')) {
                    // 允许默认行为（拨打电话）
                    return true;
                }
                // 阻止默认行为
                e.preventDefault();
            });
        });

        // 点击页面其他地方收起展开的按钮
        document.addEventListener('touchstart', function(e) {
            if (activeButton && !e.target.closest('.contact-button')) {
                activeButton.classList.remove('show');
                activeButton = null;
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                }
            }
        });
    }
}); 