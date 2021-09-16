module.exports = {
    mode: "jit",
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: {
                DEFAULT: "#000",
                primary: "#222222",
            },
            white: {
                DEFAULT: "#fff",
                primary: "#eceff1",
            },
            red: {
                light: "#faa2b0",
                DEFAULT: "#f00",
                primary: "#ff0266",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("tailwindcss"),
        require("precss"),
        require("autoprefixer"),
        require("tailwind-scrollbar-hide"),
    ],
};
