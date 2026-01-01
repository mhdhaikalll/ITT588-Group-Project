/**
 * Component Loader for Daily Blueprint
 * Loads modular HTML components before Alpine.js initializes
 */

// Store component cache to avoid re-fetching
const componentCache = {};

/**
 * Load a component from the components folder
 * @param {string} componentPath - Path to the component HTML file
 * @returns {Promise<string>} - The component HTML
 */
async function loadComponent(componentPath) {
    if (componentCache[componentPath]) {
        return componentCache[componentPath];
    }

    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${componentPath}`);
        }
        const html = await response.text();
        componentCache[componentPath] = html;
        return html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        return `<!-- Component load error: ${componentPath} -->`;
    }
}

/**
 * Process template variables in component HTML
 * @param {string} html - The component HTML
 * @param {Object} variables - Variables to replace
 * @returns {string} - Processed HTML
 */
function processTemplate(html, variables = {}) {
    let processed = html;
    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        processed = processed.replace(regex, value);
    }
    return processed;
}

/**
 * Load all components marked with data-component attribute
 */
async function loadAllComponents() {
    const componentElements = document.querySelectorAll('[data-component]');
    
    const loadPromises = Array.from(componentElements).map(async (element) => {
        const componentPath = element.getAttribute('data-component');
        const basePath = element.getAttribute('data-base-path') || '.';
        const activePage = element.getAttribute('data-active-page') || '';
        const showExport = element.getAttribute('data-show-export') === 'true';
        
        // Build full path
        const fullPath = `${basePath}/components/${componentPath}`;
        
        // Load the component
        let html = await loadComponent(fullPath);
        
        // Process template variables
        html = processTemplate(html, {
            basePath: basePath,
            activePage: activePage,
            showExport: showExport
        });
        
        // Replace active page classes
        if (activePage) {
            // Add active class to current page link
            html = html.replace(
                new RegExp(`(href="[^"]*${activePage}[^"]*"[^>]*class=")([^"]*)(")`),
                '$1$2 text-primary$3'
            );
        }
        
        // Inject the HTML
        element.innerHTML = html;
    });

    await Promise.all(loadPromises);
}

/**
 * Initialize components - call this before Alpine.js starts
 */
async function initComponents() {
    await loadAllComponents();
    
    // Re-initialize Lucide icons after components are loaded
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Auto-initialize when DOM is ready, but before Alpine
document.addEventListener('DOMContentLoaded', async () => {
    await initComponents();
});

// Also expose for manual calling if needed
window.initComponents = initComponents;
window.loadComponent = loadComponent;
