// 快捷键控制
document.addEventListener('DOMContentLoaded', () => {
    const shortcuts = document.getElementById('keyboardShortcuts');
    const toggleBtn = document.getElementById('toggleShortcuts');
    const closeBtn = document.getElementById('closeShortcuts');

    function showShortcuts() {
        shortcuts.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function hideShortcuts() {
        shortcuts.classList.remove('show');
        document.body.style.overflow = '';
    }

    // 点击按钮显示
    toggleBtn.addEventListener('click', showShortcuts);

    // 点击关闭按钮
    closeBtn.addEventListener('click', hideShortcuts);

    // 点击背景关闭
    shortcuts.addEventListener('click', (e) => {
        if (e.target === shortcuts) {
            hideShortcuts();
        }
    });

    // 按 ? 键显示快捷键
    document.addEventListener('keydown', (e) => {
        if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
            e.preventDefault();
            showShortcuts();
        }
        // ESC 键关闭
        if (e.key === 'Escape' && shortcuts.classList.contains('show')) {
            hideShortcuts();
        }
    });
}); 