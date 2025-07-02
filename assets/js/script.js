/**
 * Villa Waha - Clean JavaScript
 * Modern, maintainable JavaScript for enhanced user experience
 */

class VillaWaha {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // this.setupSmoothScrolling();
        // this.setupAnimations();
        this.setupImageLazyLoading();
        this.setupContactForm();
        this.setupGallery();
        this.setupAccessibility();
        this.setupPerformanceOptimizations();
        this.setupCalendar();
        this.setupExclusiveSlider();
        this.setupPhotoGallery();
    }

    /**
     * Setup smooth scrolling for navigation links
     */
    // setupSmoothScrolling() {
    //     const links = document.querySelectorAll('a[href^="#"]');
        
    //     links.forEach(link => {
    //         link.addEventListener('click', (e) => {
    //             e.preventDefault();
    //             const targetId = link.getAttribute('href');
    //             const targetElement = document.querySelector(targetId);
                
    //             if (targetElement) {
    //                 const headerOffset = 80; // Account for fixed header if any
    //                 const elementPosition = targetElement.getBoundingClientRect().top;
    //                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    //                 window.scrollTo({
    //                     top: offsetPosition,
    //                     behavior: 'smooth'
    //                 });
    //             }
    //         });
    //     });
    // }

    /**
     * Setup scroll-triggered animations
     */
    // setupAnimations() {
    //     // Create intersection observer for animations
    //     const observerOptions = {
    //         threshold: 0.1,
    //         rootMargin: '0px 0px -50px 0px'
    //     };

    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 entry.target.classList.add('animate-in');
    //                 observer.unobserve(entry.target);
    //             }
    //         });
    //     }, observerOptions);

    //     // Observe elements that should animate
    //     const animateElements = document.querySelectorAll(
    //         '.section-title, .about-description, .feature-item, .gallery-item, .contact-items'
    //     );
        
    //     animateElements.forEach(el => {
    //         el.classList.add('animate-element');
    //         observer.observe(el);
    //     });

    //     // Add CSS for animations
    //     this.addAnimationStyles();
    // }

    /**
     * Add animation styles dynamically
     */
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .feature-item.animate-element {
                transition-delay: 0.1s;
            }
            
            .feature-item:nth-child(2).animate-element {
                transition-delay: 0.2s;
            }
            
            .feature-item:nth-child(3).animate-element {
                transition-delay: 0.3s;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Setup lazy loading for images
     */
    setupImageLazyLoading() {
        // Use native lazy loading if supported, otherwise implement intersection observer
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading is supported
            return;
        }

        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }

    /**
     * Setup gallery functionality
     */
    setupGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openLightbox(item.querySelector('img'), index);
            });
            
            // Add keyboard support
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View image ${index + 1} in gallery`);
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openLightbox(item.querySelector('img'), index);
                }
            });
        });
    }

    /**
     * Open lightbox for gallery images
     */
    openLightbox(img, index) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img src="${img.src}" alt="${img.alt}" class="lightbox-image">
                <div class="lightbox-caption">${img.alt}</div>
            </div>
        `;

        // Add lightbox styles
        this.addLightboxStyles();

        // Add to DOM
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Setup close functionality
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const closeHandler = () => this.closeLightbox(lightbox);
        
        closeBtn.addEventListener('click', closeHandler);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeHandler();
        });

        // Keyboard support
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeHandler();
                document.removeEventListener('keydown', escHandler);
            }
        });

        // Focus management
        setTimeout(() => closeBtn.focus(), 100);
    }

    /**
     * Close lightbox
     */
    closeLightbox(lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }, 300);
    }

    /**
     * Add lightbox styles
     */
    addLightboxStyles() {
        if (document.querySelector('#lightbox-styles')) return;

        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
            .lightbox-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 1;
                transition: opacity 0.3s ease;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                text-align: center;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 8px;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: -10px;
                background: none;
                border: none;
                color: white;
                font-size: 30px;
                cursor: pointer;
                padding: 10px;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.3s ease;
            }
            
            .lightbox-close:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            .lightbox-caption {
                color: white;
                margin-top: 15px;
                font-size: 16px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Setup contact form functionality
     */
    setupContactForm() {
        // Add a simple contact form if needed
        const contactSection = document.querySelector('.contact-section');
        
        // Add click handlers for contact items
        const contactItems = document.querySelectorAll('.contact-items');
        contactItems.forEach(item => {
            const details = item.querySelector('.contact-details p');
            if (details) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    // Copy to clipboard functionality
                    const text = details.textContent;
                    if (text.includes('@')) {
                        // Email
                        window.location.href = `mailto:${text}`;
                    } else if (text.includes('+')) {
                        // Phone
                        window.location.href = `tel:${text}`;
                    }
                });
            }
        });
    }

    /**
     * Setup accessibility enhancements
     */
    setupAccessibility() {
        // Skip link functionality
        // const skipLink = document.querySelector('.skip-link');
        // if (skipLink) {
        //     skipLink.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         const target = document.querySelector(skipLink.getAttribute('href'));
        //         if (target) {
        //             target.focus();
        //             target.scrollIntoView({ behavior: 'smooth' });
        //         }
        //     });
        // }

        // Add focus indicators for better keyboard navigation
        const focusableElements = document.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(el => {
            el.addEventListener('focusin', () => {
                el.style.outline = '2px solid #623e2a';
                el.style.outlineOffset = '2px';
            });
            
            el.addEventListener('focusout', () => {
                el.style.outline = '';
                el.style.outlineOffset = '';
            });
        });
    }

    /**
     * Setup performance optimizations
     */
    setupPerformanceOptimizations() {
        // Throttle scroll events
        // let ticking = false;
        
        // const handleScroll = () => {
        //     if (!ticking) {
        //         requestAnimationFrame(() => {
        //             // Add scroll-based functionality here if needed
        //             ticking = false;
        //         });
        //         ticking = true;
        //     }
        // };

        // window.addEventListener('scroll', handleScroll, { passive: true });

        // Preload critical images
        this.preloadCriticalImages();
    }

    /**
     * Preload critical images
     */
    preloadCriticalImages() {
        const criticalImages = [
            'sources/villawaha-home-centered-e.jpg',
            'sources/caa1d37ab6bb25f02534d0e52bcac10c.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    /**
     * Setup Calendar functionality
     */
    setupCalendar() {
        this.currentDate = new Date();
        this.selectedDates = [];
        this.bookedDates = this.generateBookedDates();
        
        const prevButton = document.getElementById('prevMonth');
        const nextButton = document.getElementById('nextMonth');
        
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => this.previousMonth());
            nextButton.addEventListener('click', () => this.nextMonth());
            
            this.renderCalendar();
        }
    }

    /**
     * Generate fake booked dates (fully booked for next 3 months)
     */
    generateBookedDates() {
        const bookedDates = new Set();
        const today = new Date();
        
        // Book all dates for the next 3 months (July, August, September 2025)
        for (let month = 0; month < 3; month++) {
            const date = new Date(today.getFullYear(), today.getMonth() + month, 1);
            const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                bookedDates.add(dateStr);
            }
        }
        
        return bookedDates;
    }

    /**
     * Render the calendar for the current month
     */
    renderCalendar() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const monthYearElement = document.getElementById('currentMonthYear');
        const calendarDaysElement = document.getElementById('calendarDays');
        
        if (!monthYearElement || !calendarDaysElement) return;
        
        // Update month/year display
        monthYearElement.textContent = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        // Clear previous days
        calendarDaysElement.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        // Generate calendar days
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
            const cellDate = new Date(startDate);
            cellDate.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = cellDate.getDate();
            
            const dateStr = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
            
            // Add appropriate classes
            if (cellDate.getMonth() !== this.currentDate.getMonth()) {
                dayElement.classList.add('other-month');
            }
            
            if (cellDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }
            
            if (cellDate < today) {
                dayElement.classList.add('disabled');
            } else if (this.bookedDates.has(dateStr)) {
                dayElement.classList.add('booked');
            } else {
                dayElement.classList.add('available');
                dayElement.addEventListener('click', () => this.selectDate(cellDate, dayElement));
            }
            
            if (this.selectedDates.some(selected => selected.toDateString() === cellDate.toDateString())) {
                dayElement.classList.add('selected');
            }
            
            calendarDaysElement.appendChild(dayElement);
        }
    }

    /**
     * Handle date selection
     */
    selectDate(date, element) {
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
        if (this.bookedDates.has(dateStr) || date < new Date()) {
            return; // Can't select booked or past dates
        }
        
        // Toggle selection
        const existingIndex = this.selectedDates.findIndex(selected => selected.toDateString() === date.toDateString());
        
        if (existingIndex > -1) {
            this.selectedDates.splice(existingIndex, 1);
            element.classList.remove('selected');
        } else {
            // For demo purposes, limit to 2 selected dates (check-in and check-out)
            if (this.selectedDates.length >= 2) {
                // Clear all selections and start fresh
                this.selectedDates = [];
                document.querySelectorAll('.calendar-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });
            }
            
            this.selectedDates.push(new Date(date));
            element.classList.add('selected');
        }
        
        // Sort selected dates
        this.selectedDates.sort((a, b) => a - b);
        
        // Show selection info
        this.displaySelectedDates();
    }

    /**
     * Display selected dates information
     */
    displaySelectedDates() {
        if (this.selectedDates.length === 0) return;
        
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        let message = '';
        
        if (this.selectedDates.length === 1) {
            message = `Selected: ${this.selectedDates[0].toLocaleDateString('en-US', options)}`;
        } else if (this.selectedDates.length === 2) {
            const nights = Math.ceil((this.selectedDates[1] - this.selectedDates[0]) / (1000 * 60 * 60 * 24));
            message = `Check-in: ${this.selectedDates[0].toLocaleDateString('en-US', options)}\nCheck-out: ${this.selectedDates[1].toLocaleDateString('en-US', options)}\n${nights} night${nights !== 1 ? 's' : ''}`;
        }
        
        // You could display this in a dedicated element or as an alert for demo
        console.log(message);
    }

    /**
     * Navigate to previous month
     */
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    /**
     * Navigate to next month
     */
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }

    /**
     * Setup Exclusive Facilities Slider
     */
    setupExclusiveSlider() {
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.exclusive-slide').length;
        this.slider = document.getElementById('exclusiveSlider');
        this.slides = document.querySelectorAll('.exclusive-slide');
        this.dots = document.querySelectorAll('.pagination-dot');
        
        if (!this.slider || this.totalSlides === 0) return;
        
        // Navigation buttons
        const prevButton = document.getElementById('prevSlide');
        const nextButton = document.getElementById('nextSlide');
        
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => this.previousSlide());
            nextButton.addEventListener('click', () => this.nextSlide());
        }
        
        // Pagination dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-slide functionality
        this.startAutoSlide();
        
        // Pause auto-slide on hover
        const sliderContainer = document.querySelector('.exclusive-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.pauseAutoSlide());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoSlide());
        }
        
        // Touch/swipe support
        this.setupTouchNavigation();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    /**
     * Go to specific slide
     */
    goToSlide(slideIndex) {
        if (slideIndex === this.currentSlide) return;
        
        const direction = slideIndex > this.currentSlide ? 'right' : 'left';
        
        // Remove active classes
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active classes with animation
        setTimeout(() => {
            this.slides[this.currentSlide].classList.add('active');
            this.slides[this.currentSlide].classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');
            this.dots[this.currentSlide].classList.add('active');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.slides[this.currentSlide].classList.remove('slide-in-right', 'slide-in-left');
            }, 800);
        }, 50);
        
        // Transform slider
        this.slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }

    /**
     * Go to next slide
     */
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    /**
     * Go to previous slide
     */
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    /**
     * Start auto-slide functionality
     */
    startAutoSlide() {
        this.pauseAutoSlide(); // Clear any existing interval
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    /**
     * Pause auto-slide functionality
     */
    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    /**
     * Setup touch/swipe navigation
     */
    setupTouchNavigation() {
        let startX = 0;
        let endX = 0;
        const minSwipeDistance = 50;
        
        const sliderContainer = document.querySelector('.exclusive-slider-container');
        if (!sliderContainer) return;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const distance = startX - endX;
            
            if (Math.abs(distance) > minSwipeDistance) {
                if (distance > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        }, { passive: true });
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isElementInViewport(document.querySelector('.exclusive-facilities-section'))) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case ' ': // Spacebar
                        e.preventDefault();
                        this.nextSlide();
                        break;
                }
            }
        });
    }

    /**
     * Check if element is in viewport
     */
    isElementInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Setup Video Section functionality
     */
    /**
     * Setup Photo Gallery functionality
     */
    setupPhotoGallery() {
        const galleryImages = document.querySelectorAll('.main-gallery-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const prevBtn = document.getElementById('galleryPrev');
        const nextBtn = document.getElementById('galleryNext');
        const autoplayBtn = document.getElementById('autoplayBtn');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const currentImageSpan = document.querySelector('.current-image');
        const totalImagesSpan = document.querySelector('.total-images');
        
        if (!galleryImages.length) return;
        
        let currentIndex = 0;
        let isAutoplay = false;
        let autoplayInterval = null;
        
        // Initialize gallery
        this.updateGalleryDisplay(currentIndex, galleryImages, thumbnails, currentImageSpan);
        
        // Setup navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
                this.updateGalleryDisplay(currentIndex, galleryImages, thumbnails, currentImageSpan);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
                this.updateGalleryDisplay(currentIndex, galleryImages, thumbnails, currentImageSpan);
            });
        }
        
        // Setup thumbnail clicks
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                currentIndex = index;
                this.updateGalleryDisplay(currentIndex, galleryImages, thumbnails, currentImageSpan);
            });
        });
        
        // Setup autoplay functionality
        if (autoplayBtn) {
            autoplayBtn.addEventListener('click', () => {
                isAutoplay = !isAutoplay;
                
                if (isAutoplay) {
                    this.startAutoplay();
                    autoplayBtn.querySelector('.play-icon').classList.add('hidden');
                    autoplayBtn.querySelector('.pause-icon').classList.remove('hidden');
                    autoplayBtn.querySelector('.control-text').textContent = 'Pause';
                } else {
                    this.stopAutoplay();
                    autoplayBtn.querySelector('.play-icon').classList.remove('hidden');
                    autoplayBtn.querySelector('.pause-icon').classList.add('hidden');
                    autoplayBtn.querySelector('.control-text').textContent = 'Autoplay';
                }
            });
        }
        
        // Setup fullscreen functionality
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen(galleryImages[currentIndex]);
            });
        }
        
        
        
        // Auto-advance functionality
        const startAutoplay = () => {
            autoplayInterval = setInterval(() => {
                currentIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
                this.updateGalleryDisplay(currentIndex, galleryImages, thumbnails, currentImageSpan);
            }, 4000);
        };
        
        const stopAutoplay = () => {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        };
        
        this.startAutoplay = startAutoplay;
        this.stopAutoplay = stopAutoplay;
        
        // Pause autoplay on hover
        const galleryContainer = document.querySelector('.photo-gallery-container');
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', () => {
                if (isAutoplay) stopAutoplay();
            });
            
            galleryContainer.addEventListener('mouseleave', () => {
                if (isAutoplay) startAutoplay();
            });
        }
    }
    
    /**
     * Update gallery display
     */
    updateGalleryDisplay(index, images, thumbnails, currentImageSpan) {
        // Update main images
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Update counter
        if (currentImageSpan) {
            currentImageSpan.textContent = index + 1;
        }
        
        // Scroll thumbnail into view
        // if (thumbnails[index]) {
        //     thumbnails[index].scrollIntoView({
        //         behavior: 'smooth',
        //         block: 'nearest',
        //         inline: 'center'
        //     });
        // }
    }
    
    /**
     * Toggle fullscreen for image
     */
    toggleFullscreen(image) {
        if (!document.fullscreenElement) {
            // Create fullscreen container
            const fullscreenContainer = document.createElement('div');
            fullscreenContainer.className = 'fullscreen-image-container';
            fullscreenContainer.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" class="fullscreen-image">
                <button class="fullscreen-close" aria-label="Exit fullscreen">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            `;
            
            document.body.appendChild(fullscreenContainer);
            
            // Add fullscreen styles
            const style = document.createElement('style');
            style.textContent = `
                .fullscreen-image-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                .fullscreen-image {
                    max-width: 95vw;
                    max-height: 95vh;
                    object-fit: contain;
                    border-radius: 8px;
                }
                .fullscreen-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .fullscreen-close:hover {
                    background: white;
                    transform: scale(1.1);
                }
                .fullscreen-close svg {
                    fill: #333;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            // Close functionality
            const closeBtn = fullscreenContainer.querySelector('.fullscreen-close');
            const closeFullscreen = () => {
                fullscreenContainer.style.animation = 'fadeIn 0.3s ease reverse';
                setTimeout(() => {
                    document.body.removeChild(fullscreenContainer);
                    document.head.removeChild(style);
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeFullscreen);
            fullscreenContainer.addEventListener('click', (e) => {
                if (e.target === fullscreenContainer) closeFullscreen();
            });
            
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeFullscreen();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        }
    }
    
    /**
     * Check if element is in viewport
     */
    isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Utility method for throttling functions
     */
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Utility method for debouncing functions
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
}

// Initialize the application
new VillaWaha();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VillaWaha;
}
