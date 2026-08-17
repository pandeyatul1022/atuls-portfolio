'use strict';

/**
 * ThemeController
 * Manages light & dark mode preference with localStorage & system preference sync.
 */
class ThemeController {
    constructor() {
        this.STORAGE_KEY = 'atul_portfolio_theme';
        this.toggles = document.querySelectorAll('.theme-toggle');
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        this.setTheme(initialTheme, false);

        this.toggles.forEach((toggle) => {
            toggle.addEventListener('click', () => this.toggleTheme());
        });

        // Listen for system theme changes if user hasn't explicitly set preference
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.setTheme(e.matches ? 'dark' : 'light', false);
            }
        });
    }

    setTheme(theme, save = true) {
        document.documentElement.setAttribute('data-theme', theme);
        if (save) {
            localStorage.setItem(this.STORAGE_KEY, theme);
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(nextTheme, true);
    }
}

/**
 * NavbarController
 * Handles every behaviour of the site navigation:
 *  - Frosted/shrink state once the page scrolls
 *  - Smart hide on scroll-down, reveal on scroll-up
 *  - Sliding pill indicator tracking the active section
 *  - Accessible full-screen mobile menu overlay
 *  - Scroll-progress top hairline
 */
class NavbarController {
    constructor({
        header = '#siteHeader',
        navbar = '#navbar',
        links = '#navbarLinks',
        indicator = '#navIndicator',
        burger = '#navBurger',
        menu = '#navMenu',
    } = {}) {
        this.header = document.querySelector(header);
        this.navbar = document.querySelector(navbar);
        this.linkList = document.querySelector(links);
        this.indicator = document.querySelector(indicator);
        this.burger = document.querySelector(burger);
        this.menu = document.querySelector(menu);

        this.navLinks = this.linkList
            ? [...this.linkList.querySelectorAll('.navbar__link')]
            : [];
        this.sections = this.navLinks
            .map((link) => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        this.isMenuOpen = false;
        this.isManualScrolling = false;
        this.scrollTimer = null;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.init();
    }

    init() {
        if (!this.navbar) return;

        this.onResize = this.onResize.bind(this);
        window.addEventListener('resize', this.onResize);

        this.bindMobileMenu();
        this.bindSmoothScroll();
        this.observeSections();

        // Sync sliding indicator once layout rendering completes
        requestAnimationFrame(() => this.moveIndicatorTo(this.getActiveLink()));

        // Recalculate indicator position on font load
        if (document.fonts) {
            document.fonts.ready.then(() => this.moveIndicatorTo(this.getActiveLink()));
        }
    }

    onResize() {
        this.moveIndicatorTo(this.getActiveLink());
        if (window.innerWidth > 991 && this.isMenuOpen) {
            this.closeMenu();
        }
    }

    /* ---------------------------------------------------------------- */
    /*  Active-section tracking & sliding pill indicator                 */
    /* ---------------------------------------------------------------- */
    observeSections() {
        if (!this.sections.length) return;

        let ticking = false;

        const handleScroll = () => {
            if (this.isManualScrolling) return;

            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            const headerHeight = this.header ? this.header.offsetHeight : 70;

            // 1. Top edge case: Near top of page -> Home
            if (scrollY < 80) {
                this.setActiveLink('home');
                return;
            }

            // 2. Bottom edge case: Near bottom of page -> Contact
            if (clientHeight + scrollY >= scrollHeight - 50) {
                const lastSection = this.sections[this.sections.length - 1];
                if (lastSection) {
                    this.setActiveLink(lastSection.id);
                }
                return;
            }

            // 3. Section-by-section position tracking
            const scrollPos = scrollY + headerHeight + Math.round(clientHeight * 0.25);
            let currentSection = null;

            for (let i = this.sections.length - 1; i >= 0; i--) {
                const section = this.sections[i];
                if (section.offsetTop <= scrollPos) {
                    currentSection = section;
                    break;
                }
            }

            if (currentSection) {
                this.setActiveLink(currentSection.id);
            }
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    setActiveLink(sectionId) {
        const activeLink = this.navLinks.find(
            (link) => link.getAttribute('href') === `#${sectionId}`
        );
        if (!activeLink) return;

        // Skip redundant updates
        if (activeLink.classList.contains('is-active') && this.indicator && this.indicator.style.opacity === '1') {
            return;
        }

        this.navLinks.forEach((link) => link.classList.remove('is-active'));
        activeLink.classList.add('is-active');
        this.moveIndicatorTo(activeLink);
    }

    getActiveLink() {
        return this.navLinks.find((link) => link.classList.contains('is-active')) || this.navLinks[0];
    }

    moveIndicatorTo(link) {
        if (!link || !this.indicator || !this.linkList) return;

        const listRect = this.linkList.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        // Calculate offset relative to parent link container
        const leftOffset = linkRect.left - listRect.left;

        this.indicator.style.width = `${linkRect.width}px`;
        this.indicator.style.transform = `translateX(${leftOffset}px)`;
        this.indicator.style.opacity = '1';
    }

    /* ---------------------------------------------------------------- */
    /*  Single Navbar Mobile Menu Control                               */
    /* ---------------------------------------------------------------- */
    bindMobileMenu() {
        if (!this.menu) return;

        if (this.burger) {
            this.burger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });
        }

        this.menu.querySelectorAll('[data-link]').forEach((link) => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close on Escape or click outside
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isMenuOpen) this.closeMenu();
        });

        document.addEventListener('click', (event) => {
            if (this.isMenuOpen && !this.header.contains(event.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.isMenuOpen = true;
        this.menu.classList.add('is-open');
        this.menu.setAttribute('aria-hidden', 'false');
        if (this.burger) this.burger.setAttribute('aria-expanded', 'true');
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.menu.classList.remove('is-open');
        this.menu.setAttribute('aria-hidden', 'true');
        if (this.burger) this.burger.setAttribute('aria-expanded', 'false');
    }

    /* ---------------------------------------------------------------- */
    /*  Smooth scroll for in-page anchors with Header Offset Compensation*/
    /* ---------------------------------------------------------------- */
    bindSmoothScroll() {
        document.querySelectorAll('[data-link]').forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();

                // 1. Lock scrollSpy during smooth transition to prevent tab bouncing
                this.isManualScrolling = true;
                if (this.scrollTimer) clearTimeout(this.scrollTimer);

                // 2. Compute exact scroll position compensating for sticky header
                const headerHeight = this.header ? this.header.offsetHeight : 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 5;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
                });

                // 3. Immediately highlight target tab and move indicator pill smoothly
                const sectionId = targetId.replace('#', '');
                this.setActiveLink(sectionId);

                if (history.pushState) {
                    history.pushState(null, '', targetId);
                }

                // 4. Release scroll lock after smooth scroll animation completes
                this.scrollTimer = setTimeout(() => {
                    this.isManualScrolling = false;
                }, 800);
            });
        });
    }
}

/**
 * Hero typewriter initialization
 */
const initTypedText = () => {
    const el = document.getElementById('typed-text');
    if (!el || typeof Typed === 'undefined') return;

    new Typed('#typed-text', {
        strings: [
            'Full-Stack Web Apps.',
            'Responsive UIs.',
            'Scalable Codebases.',
            'Interactive Digital Products.'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
    });
};

/**
 * Stats counter animation when scrolled into view
 */
const initStatsCounter = () => {
    const statNumbers = document.querySelectorAll('.stat-card__number');
    if (!statNumbers.length) return;

    let animated = false;

    const animateCounts = () => {
        statNumbers.forEach((el) => {
            const target = parseInt(el.getAttribute('data-count'), 10) || 0;
            const duration = 1800; // ms
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quad formula
                const currentVal = Math.floor(progress * (2 - progress) * target);

                el.textContent = currentVal;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    el.textContent = target;
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateCounts();
                }
            });
        },
        { threshold: 0.3 }
    );

    const statsSection = document.querySelector('.about__stats-col');
    if (statsSection) observer.observe(statsSection);
};

/**
 * Projects filter category switcher
 */
const initProjectsFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || (category && category.includes(filterValue))) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
};

/**
 * Contact Form submission handler & feedback
 */
/**
 * Contact Form Real-time Validation, Dot Loader & Random Time Popup Handler
 */
const initContactForm = () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmitBtn');

    if (!form) return;

    const fields = {
        name: {
            input: document.getElementById('contactName'),
            error: document.getElementById('nameError'),
            validate: (val) => {
                if (!val) return 'Full name is required.';
                if (val.length < 3) return 'Name must be at least 3 characters long.';
                if (!/^[A-Za-z\s.'-]+$/.test(val)) return 'Name should only contain letters and spaces.';
                return '';
            }
        },
        email: {
            input: document.getElementById('contactEmail'),
            error: document.getElementById('emailError'),
            validate: (val) => {
                if (!val) return 'Email address is required.';
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(val)) return 'Please enter a valid email address.';
                return '';
            }
        },
        subject: {
            input: document.getElementById('contactSubject'),
            error: document.getElementById('subjectError'),
            validate: (val) => {
                if (!val) return 'Subject is required.';
                if (val.length < 4) return 'Subject must be at least 4 characters long.';
                return '';
            }
        },
        message: {
            input: document.getElementById('contactMessage'),
            error: document.getElementById('messageError'),
            validate: (val) => {
                if (!val) return 'Message is required.';
                if (val.length < 10) return 'Message must be at least 10 characters long.';
                return '';
            }
        }
    };

    // Update Field UI State (Red when error, Green when valid, Reset when empty)
    const updateFieldUI = (fieldKey, isSubmittedCheck = false) => {
        const field = fields[fieldKey];
        if (!field || !field.input) return '';

        const rawVal = field.input.value;
        const val = rawVal.trim();
        const error = field.validate(val);

        if (error) {
            if (isSubmittedCheck || rawVal.length > 0) {
                field.input.classList.add('is-invalid');
                field.input.classList.remove('is-valid');
                if (field.error) field.error.textContent = error;
            }
        } else {
            if (val.length > 0) {
                field.input.classList.remove('is-invalid');
                field.input.classList.add('is-valid');
                if (field.error) field.error.textContent = '';
            } else {
                field.input.classList.remove('is-invalid', 'is-valid');
                if (field.error) field.error.textContent = '';
            }
        }

        return error;
    };

    // Attach real-time input and blur event listeners for immediate Red-to-Green feedback
    Object.keys(fields).forEach((key) => {
        const field = fields[key];
        if (!field.input) return;

        field.input.addEventListener('input', () => {
            updateFieldUI(key, false);
        });

        field.input.addEventListener('blur', () => {
            updateFieldUI(key, true);
        });
    });

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;

        // Check all fields on submit
        Object.keys(fields).forEach((key) => {
            const error = updateFieldUI(key, true);
            if (error) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        // Show dot pulse animation on submit button
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending</span> <span class="dot-loader" aria-hidden="true"><span></span><span></span><span></span></span>`;
        }

        // Generate a random loading duration between 1.2s and 2.8s
        const randomDelay = Math.floor(Math.random() * 1600) + 1200;

        setTimeout(() => {
            form.reset();

            // Clear all validation states
            Object.keys(fields).forEach((key) => {
                const field = fields[key];
                if (field.input) {
                    field.input.classList.remove('is-valid', 'is-invalid');
                }
                if (field.error) {
                    field.error.textContent = '';
                }
            });

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span> <i class="bi bi-send-fill" aria-hidden="true"></i>`;
            }

            // Trigger Ultra-Attractive SweetAlert2 Success Modal Popup
            if (typeof Swal !== 'undefined') {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                Swal.fire({
                    title: '<span class="text-gradient">Message Sent Successfully!</span>',
                    html: `
                        <div class="custom-swal-html">
                            Thank you for reaching out! Your message has been received and <strong>Atul Pandey</strong> will respond to your email shortly.
                            <br>
                            <div class="swal-badge-box">
                                <i class="bi bi-clock-history" aria-hidden="true"></i> Expected response: within 24 hours
                            </div>
                        </div>
                    `,
                    icon: 'success',
                    confirmButtonText: 'Awesome, Got It!',
                    background: isDark ? '#18181b' : '#ffffff',
                    color: isDark ? '#f4f4f5' : '#18181b',
                    customClass: {
                        popup: 'custom-swal-popup',
                        title: 'custom-swal-title',
                        icon: 'custom-swal-icon',
                        confirmButton: 'custom-swal-confirm-btn'
                    },
                    buttonsStyling: false
                });
            }
        }, randomDelay);
    });
};

/**
 * Back to Top button scroll handler
 */
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('is-visible');
        } else {
            backToTopBtn.classList.remove('is-visible');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

/**
 * Animate On Scroll initialization
 */
const initAOS = () => {
    if (typeof AOS === 'undefined') return;
    AOS.init({ duration: 700, once: true, offset: 60 });
};

document.addEventListener('DOMContentLoaded', () => {
    new ThemeController();
    new NavbarController();
    initTypedText();
    initStatsCounter();
    initProjectsFilter();
    initContactForm();
    initBackToTop();
    initAOS();
});