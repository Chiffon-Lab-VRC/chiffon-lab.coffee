// ==========================================
// 喫茶しふぉん メインスクリプト
// Cafe Chiffon - Main JavaScript
// ==========================================

/**
 * DOMの読み込み完了後に実行
 */
document.addEventListener('DOMContentLoaded', () => {
    // 機能の初期化
    initSmoothScroll();
    initFadeInObserver();
    initLinkCardRipple();
    
    console.log('☕ 喫茶しふぉんへようこそ！');
});

/**
 * スムーズスクロール機能
 * アンカーリンクをクリックした際に滑らかにスクロール
 */
function initSmoothScroll() {
    // ページ内リンクを全て取得
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // "#" のみの場合はスキップ
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // スムーズスクロール
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * フェードインアニメーション
 * Intersection Observerを使用して要素が画面に入ったら表示
 */
function initFadeInObserver() {
    // フェードイン対象の要素を指定
    const fadeElements = document.querySelectorAll('.about-card, .link-card');
    
    // オブザーバーのオプション
    const observerOptions = {
        root: null,           // ビューポートを基準
        threshold: 0.1,       // 10%見えたら発火
        rootMargin: '0px'
    };
    
    // コールバック関数
    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 少し遅延させて順番に表示
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // アニメーション開始
                    requestAnimationFrame(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                }, index * 100); // 100msずつ遅延
                
                // 一度表示したら監視を解除
                observer.unobserve(entry.target);
            }
        });
    };
    
    // オブザーバー作成と監視開始
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * リンクカード波紋エフェクト
 * クリック時に波紋のようなアニメーション
 */
function initLinkCardRipple() {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 既存の波紋要素を削除
            const existingRipple = card.querySelector('.ripple-effect');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            // 波紋要素を作成
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // クリック位置を取得
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 波紋のスタイル設定
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.position = 'absolute';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(184, 212, 232, 0.5)';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '0';
            
            // カードに追加
            card.appendChild(ripple);
            
            // アニメーション終了後に削除
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 波紋アニメーションのCSSを動的に追加
    if (!document.querySelector('#ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: translate(-50%, -50%) scale(30);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * パララックス効果（オプション）
 * スクロールに応じてヒーローセクションを動かす
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

// パララックスはデフォルトではオフ（有効にする場合は下記のコメントを解除）
// initParallax();
