// Main Menu functionality for Hotel Elisabeth Mechelen

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Dropdown toggle for "More" button
    const moreBtn = document.getElementById('more-btn');
    const moreDropdown = document.getElementById('more-dropdown');
    
    if (moreBtn && moreDropdown) {
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            moreDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!moreBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
                moreDropdown.classList.remove('active');
            }
        });
    }
});
