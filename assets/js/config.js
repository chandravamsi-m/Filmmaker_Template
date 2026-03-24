/*
  ==============================================
  CONFIG: Theme & Tailwind Integration
  TEMPLATE: Filmmaker Portfolio
  VERSION: 1.0.0
  DESCRIPTION: Immediate theme logic and custom tokens.
  ==============================================
*/

// Immediate Theme Initialization (Prevent Flash)
(function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        // Body isn't ready yet, so we'll wait for DOMContentLoaded to add .light-mode if needed
        // but removing .dark from <html> handles Tailwind immediately.
    } else if (theme === 'dark' || !theme) {
        document.documentElement.classList.add('dark');
    }
})();

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: '#050505',
                surface: '#0d0d0d',
                gold: {
                    light: '#f1d683',
                    DEFAULT: '#E8C547',
                    dark: '#c4a230'
                },
                bone: '#F0EDE8'
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace']
            }
        }
    }
}

