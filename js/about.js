// about.js - About Page JavaScript

// Mobile Menu Toggle (Consistent with shop.js)
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

// Scroll animations
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Button hover effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.shop-btn, .contact-btn, .facebook-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
        
        // Click effect
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
}

// Add hover effect to mission points
function addMissionPointEffects() {
    const points = document.querySelectorAll('.point');
    
    points.forEach(point => {
        point.addEventListener('mouseenter', () => {
            const icon = point.querySelector('.point-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        point.addEventListener('mouseleave', () => {
            const icon = point.querySelector('.point-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    setActiveNavLink();
    
    // Initialize scroll animations
    handleScrollAnimations();
    
    // Add button effects
    addButtonEffects();
    
    // Add mission point effects
    addMissionPointEffects();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', handleScrollAnimations);
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
    
    // Re-run scroll animations on resize
    handleScrollAnimations();
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        body.style.overflow = '';
        
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

// Image loading optimization
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
});