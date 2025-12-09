// see_them_in_action.js - Gallery Page JavaScript

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
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            
            mobileMenuBtn.style.position = 'fixed';
            mobileMenuBtn.style.right = '2rem';
            mobileMenuBtn.style.top = '1.5rem';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
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

// Lightbox Functionality
function initLightbox() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxTags = document.getElementById('lightboxTags');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    let currentIndex = 0;
    let galleryItems = [];
    
    // Collect gallery items data (only for image cards, not the Learn More card)
    galleryCards.forEach((card, index) => {
        // Skip if it's inside a learn more card link
        if (card.closest('.learn-more-card')) return;
        
        const image = card.querySelector('.gallery-image');
        const title = card.querySelector('.gallery-info h3').textContent;
        const description = card.querySelector('.gallery-info p').textContent;
        const tags = card.querySelectorAll('.image-tags .tag');
        
        galleryItems.push({
            src: image.src,
            alt: image.alt,
            title: title,
            description: description,
            tags: Array.from(tags).map(tag => tag.textContent)
        });
        
        // Add click event to open lightbox
        card.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });
    
    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightboxModal.classList.add('active');
        body.style.overflow = 'hidden';
    }
    
    // Update lightbox content
    function updateLightbox() {
        const item = galleryItems[currentIndex];
        
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        lightboxTitle.textContent = item.title;
        lightboxDescription.textContent = item.description;
        
        // Update tags
        lightboxTags.innerHTML = '';
        item.tags.forEach(tagText => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = tagText;
            lightboxTags.appendChild(tag);
        });
        
        // Update counter
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
        
        // Update navigation buttons state
        lightboxPrev.disabled = currentIndex === 0;
        lightboxNext.disabled = currentIndex === galleryItems.length - 1;
    }
    
    // Close lightbox
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        body.style.overflow = '';
    }
    
    // Navigate to previous image
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightbox();
        }
    }
    
    // Navigate to next image
    function nextImage() {
        if (currentIndex < galleryItems.length - 1) {
            currentIndex++;
            updateLightbox();
        }
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Close lightbox when clicking outside content
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

// Image Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('.gallery-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Gallery Hover Effects
function initGalleryHoverEffects() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    const learnMoreCard = document.querySelector('.learn-more-card');
    
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.gallery-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.gallery-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Learn More card hover effect
    if (learnMoreCard) {
        learnMoreCard.addEventListener('mouseenter', () => {
            const icon = learnMoreCard.querySelector('.learn-more-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        learnMoreCard.addEventListener('mouseleave', () => {
            const icon = learnMoreCard.querySelector('.learn-more-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    }
}

// Page Load Animations
function initPageAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const infoCards = document.querySelectorAll('.info-card');
    const ctaSection = document.querySelector('.cta-section');
    
    // Animate gallery items on scroll
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });
    
    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });
    
    // Animate info cards on scroll
    const infoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    infoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        infoObserver.observe(card);
    });
    
    // Animate CTA section
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });
    
    if (ctaSection) {
        ctaSection.style.opacity = '0';
        ctaSection.style.transform = 'translateY(20px)';
        ctaSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        ctaObserver.observe(ctaSection);
    }
}

// Learn More Card Click Animation
function initLearnMoreCard() {
    const learnMoreCard = document.querySelector('.learn-more-card');
    
    if (learnMoreCard) {
        learnMoreCard.addEventListener('click', (e) => {
            // Add click animation
            learnMoreCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                learnMoreCard.style.transform = '';
            }, 150);
            
            // Open Facebook in new tab (already handled by href)
        });
    }
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    setActiveNavLink();
    
    // Initialize lightbox (for image cards only)
    initLightbox();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize hover effects
    initGalleryHoverEffects();
    
    // Initialize page animations
    initPageAnimations();
    
    // Initialize Learn More card
    initLearnMoreCard();
    
    // Add click effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add click effect
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
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
            spans[2].style.transform = 'none';
            
            mobileMenuBtn.style.position = '';
            mobileMenuBtn.style.right = '';
            mobileMenuBtn.style.top = '';
        }
    }
});