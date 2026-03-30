/* ==============================================
   TAILWIND CONFIGURATION & THEME INIT
   ============================================== */

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
        screens: {
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                dark: '#050505',
                surface: '#0d0d0d',
                gold: {
                    light: '#f1d683',
                    DEFAULT: ({ opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgb(var(--color-gold-rgb, 255 193 7) / ${opacityValue})`;
                        }
                        return `rgb(var(--color-gold-rgb, 255 193 7))`;
                    },
                    dark: '#b38d45'
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

