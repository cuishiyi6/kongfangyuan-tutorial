// 设备适配处理
class DeviceHandler {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.isIPad = /iPad/.test(navigator.userAgent);
        this.isLandscape = window.matchMedia("(orientation: landscape)").matches;
        
        this.init();
    }
    
    init() {
        this.handleOrientation();
        this.handleTouchEvents();
        this.handleSafeArea();
        this.handleDeviceSpecific();
    }
    
    handleOrientation() {
        window.addEventListener('orientationchange', () => {
            this.isLandscape = window.matchMedia("(orientation: landscape)").matches;
            this.updateLayout();
        });
    }
    
    handleTouchEvents() {
        if (this.isMobile) {
            document.addEventListener('touchstart', this.handleTouchStart.bind(this));
            document.addEventListener('touchmove', this.handleTouchMove.bind(this));
            document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        }
    }
    
    handleSafeArea() {
        if (this.isIOS) {
            document.body.style.setProperty('--safe-area-inset-top', `env(safe-area-inset-top)`);
            document.body.style.setProperty('--safe-area-inset-bottom', `env(safe-area-inset-bottom)`);
        }
    }
    
    handleDeviceSpecific() {
        if (this.isIPad) {
            document.body.classList.add('is-ipad');
        }
        
        if (this.isMobile) {
            document.body.classList.add('is-mobile');
        }
        
        // 处理折叠屏
        if (window.screen && window.screen.availWidth <= 280) {
            document.body.classList.add('is-foldable');
        }
    }
    
    updateLayout() {
        // 更新布局逻辑
        if (this.isLandscape && this.isMobile) {
            document.body.classList.add('is-landscape');
        } else {
            document.body.classList.remove('is-landscape');
        }
    }
}

// 初始化设备处理
document.addEventListener('DOMContentLoaded', () => {
    window.deviceHandler = new DeviceHandler();
}); 