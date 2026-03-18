/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                surface: "#0f1117",
                "surface-2": "#1a1d27",
                "surface-3": "#2a2d3a",
                primary: {
                    DEFAULT: "#fe5933",
                    dark: "#e04a25",
                    light: "#ff7a5c",
                },
                brand: {
                    400: "#fe5933",
                },
                severity: {
                    high: "#ef4444",
                    medium: "#f59e0b",
                    low: "#10b981",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                body: ["DM Sans", "sans-serif"],
                display: ["Syne", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            borderRadius: {
                custom: "0.75rem",
                theme: "8px",
            },
        },
    },
    plugins: [],
};