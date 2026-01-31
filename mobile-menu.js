// Mobile Menu Toggle Script
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const submenuToggles = document.querySelectorAll('.nav-submenu-toggle');
    const submenuItems = Array.from(submenuToggles).map(toggle => ({
        toggle,
        submenu: toggle.nextElementSibling
    }));
    const closeAllSubmenus = (exceptToggle = null) => {
        submenuItems.forEach(({ toggle, submenu }) => {
            if (toggle === exceptToggle) {
                return;
            }
            toggle.setAttribute('aria-expanded', 'false');
            if (submenu) {
                submenu.classList.remove('show');
            }
        });
    };
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');
            if (!navMenu.classList.contains('show')) {
                closeAllSubmenus();
            }
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('show');
                closeAllSubmenus();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('show')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('show');
                closeAllSubmenus();
            }
        });
    }

    submenuItems.forEach(({ toggle, submenu }) => {
        if (submenu) {
            const toggleSubmenu = () => {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    closeAllSubmenus();
                } else {
                    closeAllSubmenus(toggle);
                    toggle.setAttribute('aria-expanded', 'true');
                    submenu.classList.add('show');
                }
            };

            toggle.addEventListener('click', toggleSubmenu);
        toggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleSubmenu();
            }
            if (event.key === 'Escape') {
                closeAllSubmenus();
                toggle.focus();
            }
        });
        }
    });
});
