// contact.js - Contact Page JavaScript

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

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Close other questions
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove('active');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    if (otherAnswer) {
                        otherAnswer.classList.remove('active');
                    }
                }
            });
            
            // Toggle current question
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            if (answer) {
                answer.classList.toggle('active');
            }
        });
    });
}

// Directions Button Handler
function initDirectionsButton() {
    const directionsBtn = document.getElementById('directionsBtn');
    
    if (directionsBtn) {
        directionsBtn.addEventListener('click', () => {
            // For demonstration, we'll show a notification
            // In a real implementation, this would open Google Maps or similar
            
            const address = "Brgy. Masico, Pila, Laguna";
            
            // Try to open Google Maps
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            
            // Show notification with link
            showNotification(
                `Opening directions to: ${address}. <br><a href="${mapsUrl}" target="_blank" style="color: #FFD700; text-decoration: underline;">Click here if not redirected</a>`,
                'info'
            );
            
            // Open in new tab
            setTimeout(() => {
                window.open(mapsUrl, '_blank');
            }, 1000);
        });
    }
}

// Contact card click handlers
function initContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', () => {
            const icon = card.querySelector('.contact-icon i');
            const title = card.querySelector('h3').textContent;
            
            // Add click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
            
            // Handle different card types
            if (icon.classList.contains('fa-phone')) {
                // Phone card - show call confirmation
                const phoneNumber = card.querySelector('p').textContent.trim();
                showCallConfirmation(phoneNumber);
            } else if (icon.classList.contains('fa-map-marker-alt')) {
                // Location card - show address
                const address = card.querySelector('p').textContent.trim();
                showAddressInfo(address);
            }
        });
    });
}

// Show call confirmation
function showCallConfirmation(phoneNumber) {
    const confirmCall = confirm(`Do you want to call ${phoneNumber}?`);
    
    if (confirmCall) {
        // Create a temporary link to trigger phone call
        const link = document.createElement('a');
        link.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show notification
        showNotification(`Calling ${phoneNumber}...`, 'info');
    }
}

// Show address information
function showAddressInfo(address) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    
    const message = `
        <div style="text-align: left;">
            <strong>Address:</strong> ${address}<br><br>
            <a href="${mapsUrl}" target="_blank" style="color: #FFD700; text-decoration: none; display: inline-block; padding: 8px 16px; background: rgba(255, 215, 0, 0.1); border: 1px solid #FFD700; border-radius: 4px;">
                <i class="fas fa-map-marker-alt"></i> Open in Google Maps
            </a>
        </div>
    `;
    
    showNotification(message, 'info');
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(33, 150, 243, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 300px;
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    // Add keyframes for animation
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
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            flex: 1;
        }
        
        .notification-content i {
            margin-top: 2px;
            flex-shrink: 0;
        }
        
        .notification-content span {
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            font-size: 1rem;
            opacity: 0.8;
            transition: opacity 0.2s;
            flex-shrink: 0;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .notification a {
            color: #FFD700 !important;
            text-decoration: underline !important;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animate elements on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.contact-card, .social-card, .direct-contact-card, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// Add animation styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .contact-card,
        .social-card,
        .direct-contact-card,
        .faq-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .contact-card.animate-in,
        .social-card.animate-in,
        .direct-contact-card.animate-in,
        .faq-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .contact-card:nth-child(1) { transition-delay: 0.1s; }
        .contact-card:nth-child(2) { transition-delay: 0.2s; }
        .contact-card:nth-child(3) { transition-delay: 0.3s; }
        .contact-card:nth-child(4) { transition-delay: 0.4s; }
        
        .direct-contact-card:nth-child(1) { transition-delay: 0.2s; }
        .direct-contact-card:nth-child(2) { transition-delay: 0.4s; }
        
        .social-card:nth-child(1) { transition-delay: 0.3s; }
        .social-card:nth-child(2) { transition-delay: 0.5s; }
        
        .faq-item:nth-child(1) { transition-delay: 0.1s; }
        .faq-item:nth-child(2) { transition-delay: 0.2s; }
        .faq-item:nth-child(3) { transition-delay: 0.3s; }
        .faq-item:nth-child(4) { transition-delay: 0.4s; }
        .faq-item:nth-child(5) { transition-delay: 0.5s; }
        .faq-item:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
}

// Contact card hover effects enhancement
function enhanceContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.contact-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.contact-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    setActiveNavLink();
    
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize directions button
    initDirectionsButton();
    
    // Initialize contact cards
    initContactCards();
    
    // Add animation styles
    addAnimationStyles();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Enhance contact cards
    enhanceContactCards();
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