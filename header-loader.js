// 헤더 로더 스크립트
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 헤더 HTML 로드
        const response = await fetch('header.html');
        const headerHTML = await response.text();
        
        // 헤더 삽입
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // 이벤트 리스너 설정
        setupEventListeners();
        
    } catch (error) {
        console.error('헤더 로드 실패:', error);
    }
});

function setupEventListeners() {
    // 다크모드 토글
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    
    if (darkModeToggle) {
        setupDarkMode(darkModeToggle);
    }
    if (themeToggle) {
        setupDarkMode(themeToggle);
    }
    if (themeToggleMobile) {
        setupDarkMode(themeToggleMobile);
    }

    // 모바일 메뉴 토글
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && mobileNav && navMenu) {
        setupMobileMenu(menuToggle, mobileNav, navMenu);
    }
}

function setupDarkMode(toggle) {
    const body = document.body;
    
    // 로컬 스토리지에서 다크모드 상태 확인
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        if (isDark) {
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'true');
        } else {
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'false');
        }
    });
}

function setupMobileMenu(menuToggle, mobileNav, navMenu) {
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mobileNav.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}
