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

    // Close mobile menu when clicking a link (only for leaf links, not dropdown expanders)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const isDropdownToggler = link.parentElement.classList.contains('nav-dropdown') || 
                                     link.parentElement.classList.contains('nav-subdropdown') ||
                                     link.classList.contains('subdropdown-toggle') ||
                                     link.getAttribute('href') === 'javascript:void(0);';
            
            if (navLinks.classList.contains('active') && !isDropdownToggler) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Handle smooth scroll manually for offset
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
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
        threshold: 0.02
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

    // --- 5. Dynamic Tabs Builder (Dual Mode: Tab Buttons on Desktop, Custom Styled Select Box on Mobile) ---
    const tabContainers = document.querySelectorAll('.tab-container');
    tabContainers.forEach((container) => {
        const panes = container.querySelectorAll('.tab-pane');
        if (panes.length === 0) return;
        
        const tabNav = document.createElement('div');
        tabNav.classList.add('tab-nav');

        // Create a premium custom styled select box for mobile
        const selectWrapper = document.createElement('div');
        selectWrapper.classList.add('tab-mobile-select-wrapper');
        
        const selectLabel = document.createElement('label');
        selectLabel.classList.add('tab-mobile-select-label');
        selectLabel.innerHTML = '<i class="fas fa-list-ul" style="margin-right: 6px; color: var(--color-btn-primary-bg);"></i> Select Section:';
        
        const customSelectContainer = document.createElement('div');
        customSelectContainer.classList.add('custom-select-container');
        
        const customSelectTrigger = document.createElement('div');
        customSelectTrigger.classList.add('custom-select-trigger');
        
        const triggerText = document.createElement('span');
        const triggerIcon = document.createElement('i');
        triggerIcon.className = 'fas fa-chevron-down';
        
        customSelectTrigger.appendChild(triggerText);
        customSelectTrigger.appendChild(triggerIcon);
        
        const customSelectOptions = document.createElement('div');
        customSelectOptions.classList.add('custom-select-options');
        
        panes.forEach((pane, idx) => {
            const title = pane.getAttribute('data-title') || `Tab ${idx + 1}`;
            
            // 1. Create Desktop Tab Button
            const btn = document.createElement('button');
            btn.classList.add('tab-btn');
            btn.type = 'button';
            btn.innerText = title;
            btn.setAttribute('data-tab-index', idx);
            
            if (idx === 0) {
                btn.classList.add('active');
                pane.classList.add('active');
                triggerText.innerText = title; // Set initial active text
            }
            
            btn.addEventListener('click', () => {
                switchActiveTab(idx);
            });
            tabNav.appendChild(btn);

            // 2. Create Custom Select Option
            const opt = document.createElement('div');
            opt.classList.add('custom-select-option');
            if (idx === 0) opt.classList.add('active');
            opt.innerText = title;
            opt.setAttribute('data-value', idx);
            
            opt.addEventListener('click', () => {
                switchActiveTab(idx);
                customSelectContainer.classList.remove('open');
            });
            customSelectOptions.appendChild(opt);
        });

        // Trigger toggle open
        customSelectTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            customSelectContainer.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            customSelectContainer.classList.remove('open');
        });

        customSelectContainer.appendChild(customSelectTrigger);
        customSelectContainer.appendChild(customSelectOptions);
        
        selectWrapper.appendChild(selectLabel);
        selectWrapper.appendChild(customSelectContainer);
        
        const tabPanes = container.querySelector('.tab-panes');
        container.insertBefore(tabNav, tabPanes);
        container.insertBefore(selectWrapper, tabPanes);

        function switchActiveTab(activeIdx) {
            // Update Tab Buttons classes
            container.querySelectorAll('.tab-btn').forEach((b, idx) => {
                b.classList.toggle('active', idx === activeIdx);
            });
            
            // Update Custom Select active option and trigger text
            const optionsList = customSelectOptions.querySelectorAll('.custom-select-option');
            optionsList.forEach((opt, idx) => {
                opt.classList.toggle('active', idx === activeIdx);
                if (idx === activeIdx) {
                    triggerText.innerText = opt.innerText;
                }
            });
            
            // Update Panes classes
            panes.forEach((p, idx) => {
                p.classList.toggle('active', idx === activeIdx);
            });
        }
    });

    // --- 6. Announcement Close Handler ---
    const banner = document.getElementById('announcement-banner');
    const bannerClose = document.getElementById('banner-close');
    
    // Check if dismissed before
    if (banner && localStorage.getItem('announcement-dismissed') === 'true') {
        banner.style.display = 'none';
        document.body.classList.add('banner-dismissed');
    }
    
    if (banner && bannerClose) {
        bannerClose.addEventListener('click', () => {
            banner.style.display = 'none';
            document.body.classList.add('banner-dismissed');
            localStorage.setItem('announcement-dismissed', 'true');
        });
    }

    // --- 7. Mobile Multilevel Navigation ---
    const dropdownToggles = document.querySelectorAll('.nav-dropdown > a, .nav-subdropdown > a');
    dropdownToggles.forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const siblingContent = toggle.nextElementSibling;
                if (siblingContent && (siblingContent.classList.contains('nav-dropdown-content') || siblingContent.classList.contains('nav-subdropdown-content'))) {
                    e.preventDefault();
                    const parent = toggle.parentElement;
                    parent.classList.toggle('open');
                }
            }
        });
    });

    // --- 8. Sidebar Sub-nav Mobile Toggle ---
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) {
        const parentLinks = sidebarNav.querySelectorAll('li > a');
        parentLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const subMenu = link.nextElementSibling;
                if (subMenu && subMenu.classList.contains('sub-sidebar-nav')) {
                    // Let link navigate if it already has active grandchild or was clicked twice
                    // but allow simple toggles
                    if (subMenu.style.display === 'none' || subMenu.style.display === '') {
                        e.preventDefault();
                        subMenu.style.display = 'block';
                    }
                }
            });
        });
    }

    // --- 9. Close Sidebar Accordion on Mobile by Default ---
    const sidebarDetails = document.querySelector('.sidebar-details');
    if (sidebarDetails && window.innerWidth <= 900) {
        sidebarDetails.removeAttribute('open');
    }

    // --- 10. Automatic Responsive Tables in Markdown ---
    const tables = document.querySelectorAll('.page-content table:not(.synoptic-table)');
    tables.forEach((table) => {
        if (!table.parentElement.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });

});

