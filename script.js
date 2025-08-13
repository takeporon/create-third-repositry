// 商品データ
const products = [
    {
        id: 1,
        title: "iPhone 13 Pro",
        price: 85000,
        description: "美品のiPhone 13 Proです。256GB、パールホワイト。傷や汚れはありません。",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
        category: "電化製品",
        seller: "テックショップ",
        rating: 4.8,
        location: "東京",
        condition: "美品"
    },
    {
        id: 2,
        title: "Nike Air Max 270",
        price: 12000,
        description: "Nike Air Max 270、サイズ27cm。履き心地抜群で、デザインもおしゃれです。",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        category: "ファッション",
        seller: "スニーカーファン",
        rating: 4.5,
        location: "大阪",
        condition: "良品"
    },
    {
        id: 3,
        title: "MacBook Air M1",
        price: 120000,
        description: "MacBook Air M1、8GB RAM、256GB SSD。軽量で高性能、バッテリーも長持ちします。",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
        category: "電化製品",
        seller: "アップルユーザー",
        rating: 4.9,
        location: "神奈川",
        condition: "美品"
    },
    {
        id: 4,
        title: "ユニクロ ダウンジャケット",
        price: 8000,
        description: "ユニクロのダウンジャケット、サイズM。暖かくて軽い、冬の必需品です。",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        category: "ファッション",
        seller: "ファッション好き",
        rating: 4.3,
        location: "福岡",
        condition: "良品"
    },
    {
        id: 5,
        title: "Nintendo Switch",
        price: 25000,
        description: "Nintendo Switch、Joy-Con付き。ゲームソフトも数本付属します。",
        image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop",
        category: "ゲーム",
        seller: "ゲームマニア",
        rating: 4.6,
        location: "愛知",
        condition: "良品"
    },
    {
        id: 6,
        title: "IKEA デスクチェア",
        price: 15000,
        description: "IKEAのデスクチェア、ブラック。長時間座っても疲れにくい設計です。",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        category: "インテリア",
        seller: "インテリアショップ",
        rating: 4.4,
        location: "埼玉",
        condition: "美品"
    },
    {
        id: 7,
        title: "Kindle Paperwhite",
        price: 18000,
        description: "Kindle Paperwhite、8GB。目に優しい画面で、読書が楽しめます。",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        category: "電化製品",
        seller: "読書好き",
        rating: 4.7,
        location: "京都",
        condition: "美品"
    },
    {
        id: 8,
        title: "アディダス トレーニングウェア",
        price: 6000,
        description: "アディダスのトレーニングウェア、サイズL。快適で動きやすい素材です。",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        category: "ファッション",
        seller: "フィットネス愛好家",
        rating: 4.2,
        location: "兵庫",
        condition: "良品"
    }
];

// DOM要素の取得
const productGrid = document.getElementById('productGrid');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const cartCount = document.querySelector('.cart-count');

// カートの状態
let cart = [];

// 商品カードの作成
function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">¥${product.price.toLocaleString()}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span>⭐ ${product.rating}</span>
                    <span>${product.location}</span>
                </div>
            </div>
        </div>
    `;
}

// 商品グリッドの表示
function displayProducts(productsToShow = products) {
    productGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    
    // 商品カードのクリックイベントを追加
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.dataset.productId);
            const product = products.find(p => p.id === productId);
            openProductModal(product);
        });
    });
}

// 商品モーダルの表示
function openProductModal(product) {
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductTitle').textContent = product.title;
    document.getElementById('modalProductPrice').textContent = `¥${product.price.toLocaleString()}`;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// モーダルの閉じる
function closeProductModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 検索機能
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

// カートに商品を追加
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification('商品をカートに追加しました！');
    }
}

// カート数の更新
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// 通知の表示
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ナビゲーションのアクティブ状態管理
function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// スムーススクロール
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// カテゴリーカードのクリックイベント
function initCategoryCards() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            const filteredProducts = products.filter(product => 
                product.category === category
            );
            displayProducts(filteredProducts);
            
            // 商品セクションまでスクロール
            document.getElementById('featured-products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    // 初期商品表示
    displayProducts();
    
    // モーダル関連
    closeModal.addEventListener('click', closeProductModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });
    
    // 検索機能
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchProducts(query);
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchProducts(query);
            }
        }
    });
    
    // カートボタンのクリック
    document.querySelector('.btn-cart').addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`カートに${cart.length}個の商品があります。\n合計: ¥${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}`);
        } else {
            alert('カートは空です。');
        }
    });
    
    // 出品ボタンのクリック
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent === '出品する') {
            btn.addEventListener('click', () => {
                alert('出品機能は準備中です。');
            });
        }
    });
    
    // モーダル内のボタン
    document.addEventListener('click', (e) => {
        if (e.target.textContent === '購入する') {
            const productTitle = document.getElementById('modalProductTitle').textContent;
            const product = products.find(p => p.title === productTitle);
            if (product) {
                addToCart(product.id);
                closeProductModal();
            }
        }
        
        if (e.target.textContent === 'お気に入りに追加') {
            showNotification('お気に入りに追加しました！');
        }
    });
    
    // 初期化
    updateActiveNav();
    initSmoothScroll();
    initCategoryCards();
});

// アニメーション用CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .product-card {
        animation: fadeInUp 0.6s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .category-card {
        animation: fadeInUp 0.6s ease;
    }
    
    .category-card:nth-child(1) { animation-delay: 0.1s; }
    .category-card:nth-child(2) { animation-delay: 0.2s; }
    .category-card:nth-child(3) { animation-delay: 0.3s; }
    .category-card:nth-child(4) { animation-delay: 0.4s; }
    .category-card:nth-child(5) { animation-delay: 0.5s; }
    .category-card:nth-child(6) { animation-delay: 0.6s; }
`;
document.head.appendChild(style);

// パフォーマンス最適化: 画像の遅延読み込み
function initLazyLoading() {
    const images = document.querySelectorAll('.product-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ページ読み込み完了後に遅延読み込みを初期化
window.addEventListener('load', initLazyLoading); 
