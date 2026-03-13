/* ==============================================
   TAILWIND CONFIGURATION
   ============================================== */

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
