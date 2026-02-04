// Language Switcher functionality for Hotel Elisabeth Mechelen
// This script manages language selection and persistence across the website

(function() {
    'use strict';
    
    // Available languages with their flag images and labels
    const LANGUAGES = {
        'nl': { label: 'Nederlands', flag: 'logo/flag-nl.svg' },
        'en': { label: 'English', flag: 'logo/flag-en.svg' },
        'fr': { label: 'Français', flag: 'logo/flag-fr.svg' }
    };
    
    const DEFAULT_LANGUAGE = 'en';
    const STORAGE_KEY = 'selectedLanguage';
    
    // Get the current language from localStorage or browser/default
    function getCurrentLanguage() {
        // First check localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && LANGUAGES[stored]) {
            return stored;
        }
        
        // Then check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('nl')) return 'nl';
        if (browserLang.startsWith('fr')) return 'fr';
        
        return DEFAULT_LANGUAGE;
    }
    
    // Set the language and persist to localStorage
    function setLanguage(lang) {
        if (LANGUAGES[lang]) {
            localStorage.setItem(STORAGE_KEY, lang);
            // Reload the page to apply the new language
            window.location.reload();
        }
    }
    
    // Create the language switcher dropdown element
    function createLanguageSwitcher() {
        const currentLang = getCurrentLanguage();
        const currentLangData = LANGUAGES[currentLang];
        
        // Create the language switcher container
        const container = document.createElement('li');
        container.className = 'language-switcher dropdown';
        
        // Create the button with current language flag
        const button = document.createElement('button');
        button.id = 'language-btn';
        button.className = 'language-btn';
        button.setAttribute('aria-label', 'Select language');
        button.innerHTML = `<img src="${currentLangData.flag}" alt="${currentLangData.label}" class="language-flag">`;
        
        // Create the dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-menu language-dropdown';
        dropdown.id = 'language-dropdown';
        
        // Add language options
        Object.keys(LANGUAGES).forEach(langCode => {
            const langData = LANGUAGES[langCode];
            const option = document.createElement('button');
            option.className = 'language-option';
            option.setAttribute('data-lang', langCode);
            option.innerHTML = `
                <img src="${langData.flag}" alt="${langData.label}" class="language-flag">
                <span>${langData.label}</span>
            `;
            
            // Highlight the current language
            if (langCode === currentLang) {
                option.classList.add('active');
            }
            
            // Add click handler
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                setLanguage(langCode);
            });
            
            dropdown.appendChild(option);
        });
        
        container.appendChild(button);
        container.appendChild(dropdown);
        
        // Add toggle functionality
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        return container;
    }
    
    // Initialize the language switcher
    function initLanguageSwitcher() {
        // Find the main navigation list
        const mainNav = document.querySelector('.main-nav ul');
        if (!mainNav) {
            console.warn('Main navigation not found');
            return;
        }
        
        // Find the "Book Now" button list item
        const bookNowLi = Array.from(mainNav.children).find(li => 
            li.querySelector('a.booking-button')
        );
        
        if (!bookNowLi) {
            console.warn('Book Now button not found in navigation');
            return;
        }
        
        // Create and insert the language switcher after the Book Now button
        const languageSwitcher = createLanguageSwitcher();
        bookNowLi.parentNode.insertBefore(languageSwitcher, bookNowLi.nextSibling);
    }
    
    // Export functions for use by other scripts
    window.LanguageSwitcher = {
        getCurrentLanguage: getCurrentLanguage,
        setLanguage: setLanguage
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
    } else {
        initLanguageSwitcher();
    }
})();
