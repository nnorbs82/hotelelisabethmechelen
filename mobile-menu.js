// Mobile Menu JavaScript - Rebuilt
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const moreBtn = document.querySelector('.nav-more-btn');
    const dropdown = document.querySelector('.nav-dropdown');
    
    // Toggle mobile menu
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');
            
            // Close dropdown when closing menu
            if (!navMenu.classList.contains('show') && dropdown) {
                dropdown.classList.remove('show');
                if (moreBtn) {
                    moreBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Close menu when clicking on a regular link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('show');
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
                if (moreBtn) {
                    moreBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target) && 
                navMenu.classList.contains('show')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('show');
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
                if (moreBtn) {
                    moreBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
    
    // Toggle dropdown menu
    if (moreBtn && dropdown) {
        moreBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            dropdown.classList.toggle('show');
        });
        
        // Keyboard support for More button
        moreBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                dropdown.classList.toggle('show');
            }
            if (e.key === 'Escape') {
                this.setAttribute('aria-expanded', 'false');
                dropdown.classList.remove('show');
                this.focus();
            }
        });
    }
});

