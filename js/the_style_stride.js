// the_style_stride.js - The Style Stride / Our Story Page

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

// Scroll animation for story sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements in cards
                const cards = entry.target.querySelectorAll('.inspiration-card, .goal-item, .timeline-content');
                cards.forEach((card, index) => {
                    card.style.transitionDelay = `${index * 0.1}s`;
                    card.classList.add('fade-in');
                    
                    // Make them visible after a delay
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 100);
                });
            }
        });
    }, observerOptions);

    // Observe all story sections
    const sections = document.querySelectorAll('.story-section, .inspiration-section, .timeline-section, .goals-section, .cta-section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add floating animation to hero year
    const yearElement = document.querySelector('.decoration-year');
    if (yearElement) {
        setInterval(() => {
            yearElement.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                yearElement.style.transform = 'translateY(0)';
            }, 500);
        }, 3000);
    }
}

// Animate timeline items on scroll
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        timelineObserver.observe(item);
    });
}

// Add hover effects to inspiration cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.inspiration-card, .goal-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#fff';
                icon.style.transition = 'transform 0.3s ease, color 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = '#FFD700';
            }
        });
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    setActiveNavLink();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Animate timeline
    animateTimeline();
    
    // Initialize card hover effects
    initCardHoverEffects();
    
    // Add click effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

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

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.backgroundPosition = `center ${rate}px`;
    }
});