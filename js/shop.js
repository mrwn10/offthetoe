// shop.js - Shop Page Specific JavaScript

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger to X
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[0].style.width = '25px';
            spans[1].style.opacity = '0';
            spans[1].style.transform = 'translateX(-20px)';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            spans[2].style.width = '25px';
            
            mobileMenuBtn.style.position = 'fixed';
            mobileMenuBtn.style.right = '2rem';
            mobileMenuBtn.style.top = '1.5rem';
        } else {
            spans[0].style.transform = 'none';
            spans[0].style.width = '25px';
            spans[1].style.opacity = '1';
            spans[1].style.transform = 'none';
            spans[2].style.transform = 'none';
            spans[2].style.width = '25px';
            
            mobileMenuBtn.style.position = '';
            mobileMenuBtn.style.right = '';
            mobileMenuBtn.style.top = '';
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
            body.style.overflow = '';
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[1].style.transform = 'none';
            spans[2].style.transform = 'none';
            
            mobileMenuBtn.style.position = '';
            mobileMenuBtn.style.right = '';
            mobileMenuBtn.style.top = '';
        }
    });
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            body.style.overflow = '';
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[1].style.transform = 'none';
            spans[2].style.transform = 'none';
            
            mobileMenuBtn.style.position = '';
            mobileMenuBtn.style.right = '';
            mobileMenuBtn.style.top = '';
        }
    }
});

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        if ((currentPage === 'index.html' && linkPage === 'index.html') ||
            (currentPage !== 'index.html' && linkPage === currentPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Product Data - 20 products with Facebook links
const products = [
    { id: 1, image: '../img/product1.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 2, image: '../img/product2.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 3, image: '../img/product3.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 4, image: '../img/product4.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 5, image: '../img/product5.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 6, image: '../img/product6.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 7, image: '../img/product7.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 8, image: '../img/product8.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 9, image: '../img/product9.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 10, image: '../img/product10.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 11, image: '../img/product11.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 12, image: '../img/product12.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 13, image: '../img/product13.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 14, image: '../img/product14.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 15, image: '../img/product15.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 16, image: '../img/product16.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 17, image: '../img/product17.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 18, image: '../img/product18.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 19, image: '../img/product19.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' },
    { id: 20, image: '../img/product20.jpg', fbLink: 'https://www.facebook.com/profile.php?id=61574832456738' }
];

// Shop functionality
let visibleProducts = 4; // Changed from 5 to 4
const productsPerLoad = 4; // Changed from 5 to 4

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}" style="animation-delay: ${(product.id - 1) * 0.1}s">
            <div class="product-image">
                <img src="${product.image}" alt="Offthetoe Product ${product.id}" loading="lazy">
            </div>
            <div class="product-button-container">
                <a href="${product.fbLink}" target="_blank" class="learn-more-btn">
                    <i class="fas fa-external-link-alt"></i> Learn More
                </a>
            </div>
        </div>
    `;
}

// Display products
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const remainingCount = document.getElementById('remainingCount');
    
    if (!productsGrid) return;
    
    // Clear existing products
    productsGrid.innerHTML = '';
    
    // Display visible products
    const productsToShow = products.slice(0, visibleProducts);
    
    productsToShow.forEach(product => {
        productsGrid.innerHTML += createProductCard(product);
    });
    
    // Update remaining count
    const remaining = products.length - visibleProducts;
    if (remainingCount) {
        if (remaining > 0) {
            remainingCount.textContent = `${remaining} more kicks waiting to be discovered...`;
        } else {
            remainingCount.textContent = 'All kicks loaded! Check out our Facebook for more.';
            remainingCount.style.color = '#FFD700';
        }
    }
    
    // Update load more button
    if (loadMoreBtn) {
        if (remaining <= 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
}

// Load more products
function loadMoreProducts() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!loadMoreBtn) return;
    
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
        visibleProducts = Math.min(visibleProducts + productsPerLoad, products.length);
        displayProducts();
        
        loadMoreBtn.classList.remove('loading');
        loadMoreBtn.disabled = false;
        
        // Scroll to show new products
        const newProducts = document.querySelectorAll(`.product-card:nth-child(n+${visibleProducts - productsPerLoad + 1})`);
        if (newProducts.length > 0) {
            newProducts[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Update button text if last load
        if (visibleProducts >= products.length) {
            const btnText = loadMoreBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = 'ALL KICKS LOADED';
            }
        }
    }, 500);
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    setActiveNavLink();
    
    // Initialize shop
    displayProducts();
    
    // Add event listener to load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
    
    // Add click effect to learn more buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.learn-more-btn')) {
            const btn = e.target.closest('.learn-more-btn');
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        }
    });
    
    // Facebook button animation
    const facebookBtn = document.querySelector('.facebook-btn');
    if (facebookBtn) {
        facebookBtn.addEventListener('mouseenter', () => {
            facebookBtn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        facebookBtn.addEventListener('mouseleave', () => {
            facebookBtn.style.transform = '';
        });
    }
});

// Prevent body scroll when menu is open on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove('active');
        body.style.overflow = '';
        
        // Reset hamburger
        if (mobileMenuBtn) {
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[1].style.transform = 'none';
            spans[2].style.transform = 'none';
            
            mobileMenuBtn.style.position = '';
            mobileMenuBtn.style.right = '';
            mobileMenuBtn.style.top = '';
        }
    }
});