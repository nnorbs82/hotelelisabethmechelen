// Hotel Elisabeth Mechelen - Custom Translation System
// Unique implementation for dynamic multilingual content management

import { database } from './firebase-config.js';
import { ref as dbRef, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

(function() {
    'use strict';
    
    // Elisabeth Hotel Translation Cache
    const elisabethTranslationCache = {
        data: new Map(),
        activeLocale: 'en',
        supportedLocales: ['en', 'nl', 'fr']
    };

    // Retrieve visitor's preferred locale from browser storage
    function retrieveVisitorLocale() {
        const storedChoice = localStorage.getItem('selectedLanguage');
        if (storedChoice && elisabethTranslationCache.supportedLocales.includes(storedChoice)) {
            return storedChoice;
        }
        
        const browserPreference = navigator.language || navigator.userLanguage;
        if (browserPreference.startsWith('nl')) return 'nl';
        if (browserPreference.startsWith('fr')) return 'fr';
        
        return 'en';
    }

    // Fetch multilingual content from Firebase backend
    async function fetchMultilingualContent() {
        try {
            const contentSnapshot = await get(dbRef(database, 'translations'));
            if (contentSnapshot.exists()) {
                const contentData = contentSnapshot.val();
                
                // Store in cache using Map for efficient lookups
                Object.keys(contentData).forEach(categoryKey => {
                    Object.keys(contentData[categoryKey]).forEach(itemKey => {
                        const fullKey = `${categoryKey}.${itemKey}`;
                        elisabethTranslationCache.data.set(fullKey, contentData[categoryKey][itemKey]);
                    });
                });
                
                return true;
            } else {
                console.warn('Translation content not available in Firebase');
                return false;
            }
        } catch (fetchError) {
            console.error('Failed to fetch multilingual content:', fetchError);
            return false;
        }
    }

    // Retrieve specific text in visitor's language
    function retrieveLocalizedText(categoryKey, itemKey, forcedLocale = null) {
        const fullKey = `${categoryKey}.${itemKey}`;
        const contentObject = elisabethTranslationCache.data.get(fullKey);
        
        if (!contentObject) {
            return null;
        }

        const targetLocale = forcedLocale || elisabethTranslationCache.activeLocale;
        
        // Try requested locale
        if (contentObject[targetLocale]) {
            return contentObject[targetLocale];
        }

        // Fallback to English default
        if (targetLocale !== 'en' && contentObject['en']) {
            return contentObject['en'];
        }

        return null;
    }

    // Apply localized content to page elements
    function injectLocalizedContent() {
        const elementsRequiringTranslation = document.querySelectorAll('[data-translate]');
        
        elementsRequiringTranslation.forEach(element => {
            const translationIdentifier = element.getAttribute('data-translate');
            const [categoryKey, itemKey] = translationIdentifier.split('.');
            
            const localizedContent = retrieveLocalizedText(categoryKey, itemKey);
            
            if (localizedContent) {
                // Handle different element types
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = localizedContent;
                } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                    element.textContent = localizedContent;
                } else {
                    element.textContent = localizedContent;
                }
            }
        });
    }

    // Bootstrap the translation system
    async function bootstrapElisabethTranslations() {
        elisabethTranslationCache.activeLocale = retrieveVisitorLocale();
        
        const contentLoaded = await fetchMultilingualContent();
        
        if (contentLoaded) {
            injectLocalizedContent();
        } else {
            console.warn('Using static content - translations unavailable');
        }
    }

    // Refresh translations (called when language changes)
    async function refreshTranslations() {
        elisabethTranslationCache.activeLocale = retrieveVisitorLocale();
        await fetchMultilingualContent();
        injectLocalizedContent();
    }

    // Public API for Hotel Elisabeth translation system
    window.ElisabethTranslations = {
        bootstrap: bootstrapElisabethTranslations,
        refresh: refreshTranslations,
        getText: retrieveLocalizedText,
        getLocale: () => elisabethTranslationCache.activeLocale
    };

    // Auto-initialize when page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrapElisabethTranslations);
    } else {
        bootstrapElisabethTranslations();
    }
})();
