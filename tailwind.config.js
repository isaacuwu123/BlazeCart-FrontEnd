/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', '*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                'blazecart-yellow': {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#F59E0B',
                    600: '#D97706',
                    700: '#B45309',
                    800: '#92400E',
                    900: '#78350F',
                    950: '#451A03',
                },
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: '0', transform: 'translateY(-10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                bounceSubtle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-3px)' },
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'bounce-subtle': 'bounceSubtle 2s infinite',
            },
        },
    },
    plugins: [],
};
