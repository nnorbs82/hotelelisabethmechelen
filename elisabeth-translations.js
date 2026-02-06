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

    // localStorage cache configuration
    const CACHE_KEY = 'elisabethTranslationCache';
    const CACHE_TIMESTAMP_KEY = 'elisabethTranslationCacheTimestamp';

    // Load cached translations from localStorage
    function loadCachedTranslations() {
        try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                const parsed = JSON.parse(cachedData);
                // Reconstruct Map from stored array of [key, value] pairs
                if (Array.isArray(parsed)) {
                    elisabethTranslationCache.data = new Map(parsed);
                    return true;
                }
            }
        } catch (error) {
            console.warn('Failed to load cached translations:', error);
        }
        return false;
    }

    // Save translations to localStorage
    function saveCachedTranslations() {
        try {
            // Convert Map to array of [key, value] pairs for JSON serialization
            const dataArray = Array.from(elisabethTranslationCache.data.entries());
            localStorage.setItem(CACHE_KEY, JSON.stringify(dataArray));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        } catch (error) {
            console.warn('Failed to save translations to cache:', error);
        }
    }

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
                
                // Save to localStorage cache
                saveCachedTranslations();
                
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
                if (element.tagName === 'INPUT') {
                    if (element.hasAttribute('placeholder')) {
                        element.placeholder = localizedContent;
                    }
                } else if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
                    element.placeholder = localizedContent;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = localizedContent;
                } else if (element.tagName === 'LABEL') {
                    // For labels, preserve any nested elements (like checkboxes)
                    const nestedInputs = element.querySelectorAll('input, a');
                    if (nestedInputs.length > 0) {
                        // Complex label with nested elements - update only text nodes
                        const textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                        if (textNodes.length > 0) {
                            textNodes[0].textContent = localizedContent;
                        }
                    } else {
                        element.textContent = localizedContent;
                    }
                } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                    element.textContent = localizedContent;
                } else {
                    element.textContent = localizedContent;
                }
                
                // Mark element as translated
                element.classList.add('translated');
            }
        });
        
        // Mark body as translations ready
        document.body.classList.add('translations-ready');
    }

    // Bootstrap the translation system
    async function bootstrapElisabethTranslations() {
        elisabethTranslationCache.activeLocale = retrieveVisitorLocale();
        
        // First, try to load from cache for instant translation
        const cacheLoaded = loadCachedTranslations();
        if (cacheLoaded && elisabethTranslationCache.data.size > 0) {
            // Apply cached translations immediately (synchronous, no flash)
            injectLocalizedContent();
        }
        
        // Then fetch fresh translations from Firebase in the background
        const contentLoaded = await fetchMultilingualContent();
        
        if (contentLoaded) {
            // Re-apply translations with fresh data (in case anything changed)
            injectLocalizedContent();
        } else if (!cacheLoaded) {
            // No cache and fetch failed - show hardcoded English
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
