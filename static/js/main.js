document.addEventListener('DOMContentLoaded', () => {
    // Scroll animations observer
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    fadeElements.forEach(el => observer.observe(el));
});
