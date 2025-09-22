// 현대적이고 세련된 인터랙션 시스템
class ModernMobileApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupGallery();
        this.setupTouchGestures();
        this.setupAccessibility();
        this.setupPerformance();
        this.setupTabs();
        this.setupThemeToggle();
        this.setupTopButton();
        this.setupSubMenuScroll();
    }

    // 네비게이션 시스템
    setupNavigation() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // 메뉴 토글 애니메이션
        menuToggle?.addEventListener('click', () => {
            this.toggleMenu(menuToggle, navMenu);
        });

        // 네비게이션 링크 클릭 처리
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e, menuToggle, navMenu);
            });
        });

        // 외부 클릭으로 메뉴 닫기
        document.addEventListener('click', (e) => {
            if (!navMenu?.contains(e.target) && !menuToggle?.contains(e.target)) {
                this.closeMenu(menuToggle, navMenu);
            }
        });
    }

    toggleMenu(toggle, menu) {
        const isActive = toggle?.classList.contains('active');
        
        if (isActive) {
            this.closeMenu(toggle, menu);
        } else {
            this.openMenu(toggle, menu);
        }
    }

    openMenu(toggle, menu) {
        toggle?.classList.add('active');
        menu?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 메뉴 아이템들 순차적 애니메이션
        const navItems = menu?.querySelectorAll('.nav-link');
        navItems?.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }

    closeMenu(toggle, menu) {
        toggle?.classList.remove('active');
        menu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    handleNavClick(e, toggle, menu) {
        const target = e.target.getAttribute('href');
        
        // 같은 페이지 내 해시 링크인 경우에만 preventDefault
        if (target?.startsWith('#')) {
            e.preventDefault();
            this.closeMenu(toggle, menu);
            this.smoothScrollTo(target);
        } else {
            // 다른 페이지로 이동하는 경우 메뉴만 닫기
            this.closeMenu(toggle, menu);
        }
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // 스크롤 효과
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const nav = document.querySelector('.mobile-nav');
            
            // 네비게이션 배경 투명도 조절
            if (nav) {
                if (scrolled > 50) {
                    nav.style.background = 'rgba(255, 255, 255, 0.95)';
                    nav.style.backdropFilter = 'blur(20px)';
                    nav.style.borderBottom = '1px solid rgba(226, 232, 240, 0.8)';
                } else {
                    nav.style.background = 'rgba(255, 255, 255, 0.95)';
                    nav.style.backdropFilter = 'blur(20px)';
                    nav.style.borderBottom = '1px solid rgba(226, 232, 240, 0.3)';
                }
            }
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // 애니메이션 시스템
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // 애니메이션 대상 요소들 관찰
        const animatedElements = document.querySelectorAll('.notice-item, .gallery-item, .qa-item, .hero, .section-header');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    animateElement(element) {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    // 갤러리 시스템
    setupGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                this.openImageModal(item);
            });
            
            // 호버 효과
            item.addEventListener('mouseenter', () => {
                this.addHoverEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeHoverEffect(item);
            });
        });
    }

    addHoverEffect(item) {
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.05)';
        }
    }

    removeHoverEffect(item) {
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    }

    openImageModal(item) {
        const img = item.querySelector('img');
        if (!img) return;

        // 모달 생성
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 12px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            transform: scale(0.8);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // 애니메이션
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modalImg.style.transform = 'scale(1)';
        });

        // 모달 닫기
        const closeModal = () => {
            modal.style.opacity = '0';
            modalImg.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        };

        modal.addEventListener('click', closeModal);
        
        // ESC 키로 닫기
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    }

    // 터치 제스처
    setupTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            
            this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
        }, { passive: true });
    }

    handleSwipe(startX, startY, endX, endY) {
        const diffX = startX - endX;
        const diffY = startY - endY;
        const minSwipeDistance = 50;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                // 왼쪽 스와이프 - 메뉴 닫기
                const menuToggle = document.getElementById('menuToggle');
                const navMenu = document.getElementById('navMenu');
                this.closeMenu(menuToggle, navMenu);
            }
        }
    }

    // 접근성 개선
    setupAccessibility() {
        // 키보드 네비게이션
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const menuToggle = document.getElementById('menuToggle');
                const navMenu = document.getElementById('navMenu');
                this.closeMenu(menuToggle, navMenu);
            }
        });

        // 포커스 관리
        const focusableElements = document.querySelectorAll('button, a, input, [tabindex]');
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid #2563eb';
                element.style.outlineOffset = '2px';
            });
        });
    }

    // 성능 최적화
    setupPerformance() {
        // 디바운스된 리사이즈 핸들러
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // 페이지 로드 애니메이션
        window.addEventListener('load', () => {
            this.animatePageLoad();
        });

        // PWA 설치 프롬프트
        this.setupPWA();
    }

    handleResize() {
        // 리사이즈 시 필요한 로직
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (window.innerWidth > 1024) {
            this.closeMenu(menuToggle, navMenu);
        }
    }

    animatePageLoad() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    }

    setupPWA() {
        // PWA 설치 프롬프트 (선택사항)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // 서비스 워커 등록 로직
                console.log('PWA ready');
            });
        }
    }

    // 탭 시스템
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const boardContents = document.querySelectorAll('.board-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // 모든 탭 버튼에서 active 클래스 제거
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // 클릭된 버튼에 active 클래스 추가
                button.classList.add('active');
                
                // 모든 콘텐츠 숨기기
                boardContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // 선택된 탭 콘텐츠 보이기
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            });
        });
    }

    // 다크모드 토글 기능
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // 로컬 스토리지에서 테마 설정 불러오기
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
            
            console.log('Theme changed to:', newTheme);
        });
    }

    updateThemeIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new ModernMobileApp();
});

// 추가 유틸리티 함수들
const utils = {
    // 디바운스 함수
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 스로틀 함수
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 랜덤 ID 생성
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // TOP 버튼 기능
    setupTopButton() {
        // DOM이 완전히 로드된 후 실행
        setTimeout(() => {
            const topButton = document.getElementById('topButton');
            if (!topButton) {
                console.log('TOP 버튼을 찾을 수 없습니다.');
                return;
            }

            console.log('TOP 버튼을 찾았습니다:', topButton);

            // 스크롤 이벤트로 버튼 표시/숨김
            const handleScroll = () => {
                if (window.scrollY > 200) {
                    topButton.classList.add('show');
                } else {
                    topButton.classList.remove('show');
                }
            };

            window.addEventListener('scroll', handleScroll);

            // TOP 버튼 클릭 이벤트 - 강제 실행
            topButton.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('TOP 버튼 클릭됨!');
                
                // 여러 방법으로 스크롤 시도
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                
                // 애니메이션으로 스크롤
                const scrollStep = -window.scrollY / (500 / 15);
                const scrollInterval = setInterval(function(){
                    if (window.scrollY != 0) {
                        window.scrollBy(0, scrollStep);
                    } else {
                        clearInterval(scrollInterval);
                    }
                }, 15);
            };

            // 초기 상태 확인
            handleScroll();
            
            console.log('TOP 버튼 이벤트 리스너가 설정되었습니다.');
        }, 100);
    }

    // 서브메뉴 버튼 스크롤 기능
    setupSubMenuScroll() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                
                // 앵커 링크인 경우 (예: #section-id)
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // PC에서는 상단 메뉴바 높이 고려
                        const isDesktop = window.innerWidth >= 1024;
                        const offset = isDesktop ? 120 : 80;
                        
                        const targetPosition = targetElement.offsetTop - offset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
};

// 전역 유틸리티 노출
window.utils = utils;