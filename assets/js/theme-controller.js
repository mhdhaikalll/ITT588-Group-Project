/**
 * Theme Controller & Component Loader for Daily Blueprint
 * Manages theme switching, persistence, and modular component loading
 */

// Theme controller function for Alpine.js
function themeController() {
    return {
        currentTheme: 'light',
        themes: [
            { name: 'light', label: 'Light', color: '#ffffff' },
            { name: 'dark', label: 'Dark', color: '#1d232a' },
            { name: 'forest', label: 'Forest', color: '#1eb854' },
        ],
        accessibleThemes: [
            { name: 'winter', label: 'Color-Blind Friendly', color: '#047AFF' }
        ],
        
        // Configuration (can be overridden when spreading)
        basePath: '.',
        activePage: 'home',
        showExportButton: false,

        initTheme() {
            const saved = localStorage.getItem('habitTrackerTheme');
            if (saved) {
                this.currentTheme = saved;
                document.documentElement.setAttribute('data-theme', saved);
            }
        },

        setTheme(theme) {
            this.currentTheme = theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('habitTrackerTheme', theme);
        }
    };
}

/**
 * Component Loader - Loads modular HTML components synchronously before Alpine
 */
const ComponentLoader = {
    cache: {},

    async load(path) {
        if (this.cache[path]) return this.cache[path];
        
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const html = await response.text();
            this.cache[path] = html;
            return html;
        } catch (error) {
            console.error(`Failed to load component: ${path}`, error);
            return '';
        }
    },

    async loadAll() {
        const elements = document.querySelectorAll('[data-component]');
        const promises = [];
        
        for (const el of elements) {
            const component = el.getAttribute('data-component');
            const basePath = el.getAttribute('data-base-path') || '.';
            const fullPath = `${basePath}/components/${component}`;
            
            promises.push(
                this.load(fullPath).then(html => {
                    el.innerHTML = html;
                })
            );
        }
        
        await Promise.all(promises);
    }
};

// Load components immediately when this script runs
(async function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
    }
    
    // Load all components
    await ComponentLoader.loadAll();
})();
