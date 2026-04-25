document.addEventListener('DOMContentLoaded', function () {

    // ===== TYPING EFFECT =====
    const typingEl = document.querySelector('.typing-name');
    const words = ['Julius Brocales', 'a Web Developer', 'an IT Student', 'a Problem Solver'];
    let wIdx = 0, cIdx = 0, deleting = false;

    function type() {
        if (!typingEl) return;
        const current = words[wIdx];
        typingEl.textContent = deleting
            ? current.substring(0, cIdx - 1)
            : current.substring(0, cIdx + 1);
        deleting ? cIdx-- : cIdx++;

        if (!deleting && cIdx === current.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
        if (deleting && cIdx === 0) {
            deleting = false;
            wIdx = (wIdx + 1) % words.length;
        }
        setTimeout(type, deleting ? 70 : 110);
    }
    type();

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
        updateActiveNav();
    });

    // ===== ACTIVE NAV =====
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) a.classList.add('active');
        });
    }

    // ===== HAMBURGER =====
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navbar.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navbar.classList.remove('open');
        });
    });

    // ===== DARK/LIGHT MODE =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    let isDark = true;
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeIcon.className = isDark ? 'bx bx-moon' : 'bx bx-sun';
    });

    // ===== SCROLL REVEAL =====
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    // ===== SKILL BAR ANIMATION =====
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                    fill.style.width = fill.dataset.width + '%';
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skills-category').forEach(cat => skillObserver.observe(cat));

    // ===== PROJECT FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.style.display = match ? '' : 'none';
                if (match) {
                    card.style.animation = 'none';
                    requestAnimationFrame(() => {
                        card.style.animation = '';
                    });
                }
            });
        });
    });

    // Netlify handles the form submission automatically.
    // If you want custom JS validation or success messages in the future, you can add it back here.

    // ===== DOWNLOAD CV PLACEHOLDER =====
    const cvBtn = document.getElementById('downloadCv');
    if (cvBtn) {
        cvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('CV download will be available soon!');
        });
    }

});