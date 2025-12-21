// Theme Toggle Component using Alpine.js
document.addEventListener('alpine:init', () => {
    Alpine.data('themeToggle', () => ({
        darkMode: false,
        
        init() {
            // Check localStorage or system preference
            this.darkMode = localStorage.getItem('theme') === 'dark' || 
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
            this.updateTheme();
        },
        
        toggle() {
            this.darkMode = !this.darkMode;
            this.updateTheme();
        },
        
        updateTheme() {
            if (this.darkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    }));
});
