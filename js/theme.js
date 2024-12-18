// 主题切换功能优化
document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let isThemeSwitching = false;
    
    // 从本地存储获取主题设置
    const savedTheme = localStorage.getItem('theme') || 'auto';
    setTheme(savedTheme, false);
    
    // 为每个主题按钮添加点击事件
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isThemeSwitching) return;
            
            const theme = btn.dataset.theme;
            setTheme(theme, true);
            localStorage.setItem('theme', theme);
            
            // 添加点击反馈
            btn.classList.add('clicked');
            setTimeout(() => btn.classList.remove('clicked'), 300);
        });
    });
    
    // 监听系统主题变化
    prefersDarkScheme.addListener((e) => {
        if (localStorage.getItem('theme') === 'auto') {
            setTheme('auto', true);
        }
    });
    
    // 设置主题
    function setTheme(theme, animate = true) {
        if (isThemeSwitching) return;
        isThemeSwitching = true;
        
        // 添加过渡动画
        if (animate) {
            document.documentElement.classList.add('theme-switching');
        }
        
        // 设置主题
        document.documentElement.setAttribute('data-theme', theme);
        updateActiveButton(theme);
        
        // 更新下载框样式
        updateDownloadStyles(theme);
        
        // 更新模态框样式
        updateModalStyles(theme);
        
        // 移除过渡动画
        setTimeout(() => {
            document.documentElement.classList.remove('theme-switching');
            isThemeSwitching = false;
        }, 300);
        
        // 更新 meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', 
                theme === 'dark' ? '#1a1a1a' : '#409EFF'
            );
        }
    }
    
    // 更新活动按钮状态
    function updateActiveButton(theme) {
        themeButtons.forEach(btn => {
            const isActive = btn.dataset.theme === theme;
            btn.classList.toggle('active', isActive);
            
            // 添加焦点状态
            if (isActive) {
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }
    
    // 添加键盘支持
    themeButtons.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
}); 

// 添加主题切换过渡效果
function switchTheme(theme) {
    document.documentElement.classList.add('theme-switching');
    requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-theme', theme);
        setTimeout(() => {
            document.documentElement.classList.remove('theme-switching');
        }, 300);
    });
} 

// 更新下载框样式
function updateDownloadStyles(theme) {
    const isDark = theme === 'dark' || 
        (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // 更新图标颜色
    const icons = document.querySelectorAll('.doc-icon, .excel-icon');
    icons.forEach(icon => {
        icon.style.transition = 'fill 0.3s ease';
        icon.style.fill = isDark ? '#79bbff' : '#409EFF';
    });
} 

// 更新模态框样式
function updateModalStyles(theme) {
    const isDark = theme === 'dark' || 
        (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // 更新图标颜色
    const icons = document.querySelectorAll('.doc-icon, .excel-icon');
    icons.forEach(icon => {
        icon.style.transition = 'fill 0.3s ease';
        icon.style.fill = isDark ? '#79bbff' : '#409EFF';
    });
} 