// Mobile Menu Toggle with Full Screen Coverage
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger to X with better animation
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[0].style.width = '25px';
            spans[1].style.opacity = '0';
            spans[1].style.transform = 'translateX(-20px)';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            spans[2].style.width = '25px';
            
            // Change button to close position
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
            
            // Reset button position
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
            
            // Reset hamburger animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[1].style.transform = 'none';
            spans[2].style.transform = 'none';
            
            // Reset button position
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
            
            // Reset hamburger animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[1].style.transform = 'none';
            spans[2].style.transform = 'none';
            
            // Reset button position
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

// Video hover effect with smooth transition
const videoContainers = document.querySelectorAll('.video-container');
videoContainers.forEach(container => {
    const video = container.querySelector('video');
    
    if (video) {
        container.addEventListener('mouseenter', () => {
            video.style.filter = 'brightness(1.2)';
            video.playbackRate = 1.2;
        });
        
        container.addEventListener('mouseleave', () => {
            video.style.filter = 'brightness(1)';
            video.playbackRate = 1.0;
        });
    }
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');

document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Simple featured items animation
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    
    // Remove any problematic inline styles that might hide elements
    const featuredItems = document.querySelectorAll('.featured-item');
    featuredItems.forEach(item => {
        // Reset any inline styles that might hide the items
        item.style.opacity = '';
        item.style.transform = '';
    });
    
    // Simple scroll animation for featured items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);
    
    // Apply animation only if not already visible
    featuredItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            observer.observe(item);
        }
    });
});

// Prevent body scroll when menu is open
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
            
            // Reset button position
            mobileMenuBtn.style.position = '';
            mobileMenuBtn.style.right = '';
            mobileMenuBtn.style.top = '';
        }
    }
});