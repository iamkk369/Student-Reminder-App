/* ========================================
   HOME PAGE JAVASCRIPT
   Sprint 3B - Phase 2: Home Page Development

   Handles:
   - Mobile menu toggle
   - Back to top button
   - Smooth scrolling for anchor links
   - Navbar scroll behavior
   ======================================== */

/**
 * Student Reminder App - Home Page Module
 * @version 1.0.0
 */

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const backToTop = document.getElementById('backToTop');

// ========================================
// Mobile Menu Toggle
// ========================================

/**
 * Opens the mobile menu
 */
function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Closes the mobile menu
 */
function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';

  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Toggles the mobile menu visibility
 */
function toggleMobileMenu() {
  if (!mobileMenu) return;
  const isActive = mobileMenu.classList.contains('active');
  if (isActive) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

// ========================================
// Back to Top Button
// ========================================

/**
 * Toggles the back to top button visibility based on scroll position
 */
function toggleBackToTop() {
  if (!backToTop) return;

  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

/**
 * Scrolls to the top of the page smoothly
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ========================================
// Navbar Scroll Behavior
// ========================================

function handleNavbarScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  if (window.scrollY > 10) {
    header.style.boxShadow = 'var(--shadow-sm)';
  } else {
    header.style.boxShadow = 'none';
  }
}

// ========================================
// Smooth Scrolling for Anchor Links
// ========================================

function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        if (mobileMenu && mobileMenu.classList.contains('active')) {
          closeMobileMenu();
        }

        const offset = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// Event Listeners
// ========================================

function initEventListeners() {
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', scrollToTop);
  }

  window.addEventListener('scroll', function() {
    toggleBackToTop();
    handleNavbarScroll();
  });
}

// ========================================
// Lazy Loading
// ========================================

function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window && lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ========================================
// Initialization
// ========================================

function initHomePage() {
  initEventListeners();
  initSmoothScroll();
  initLazyLoading();
  toggleBackToTop();
  handleNavbarScroll();

  if (window.location.hostname === 'localhost') {
    console.log('Student Reminder - Home Page Initialized');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initHomePage();
});