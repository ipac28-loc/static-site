/**
 * IPAC'2X - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Ensure correct state on load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Handle smooth scroll manually for offset
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                // Prevent default behavior to handle active state
                // But let css scroll-behavior handle the scrolling
                
                // Update active state
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // --- 3. Scroll Animation (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- 4. Countdown Timer logic ---
    const countdownEl = document.getElementById('countdown');
    let futureDate = new Date();
    
    if (countdownEl && countdownEl.dataset.date) {
        futureDate = new Date(countdownEl.dataset.date);
    } else {
        // Fallback to 6 months from now
        futureDate.setMonth(futureDate.getMonth() + 6);
    }
    
    const countDays = document.getElementById('days');
    const countHours = document.getElementById('hours');
    const countMins = document.getElementById('minutes');
    const countSecs = document.getElementById('seconds');
    
    function updateCountdown() {
        if (!countDays) return; // Guard clause if elements don't exist
        
        const now = new Date().getTime();
        const distance = futureDate.getTime() - now;
        
        if (distance < 0) {
            // Conference has started
            return;
        }
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update DOM with padded zeros
        countDays.innerHTML = days < 10 ? '0' + days : days;
        countHours.innerHTML = hours < 10 ? '0' + hours : hours;
        countMins.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        countSecs.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Initial call
    updateCountdown();
    // Update every second
    setInterval(updateCountdown, 1000);

});
