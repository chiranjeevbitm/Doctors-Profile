/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-fixed": "#baeaff",
        "inverse-on-surface": "#eff1f3",
        "surface-tint": "#3a5f94",
        "on-secondary-fixed-variant": "#004d62",
        "on-primary": "#ffffff",
        "on-tertiary-container": "#7fdfde",
        "outline-variant": "#c2c6d4",
        "on-tertiary-fixed": "#002020",
        "surface-container": "#eceef0",
        "on-surface-variant": "#424752",
        "background": "#f7f9fb",
        "surface-variant": "#e0e3e5",
        "primary-fixed": "#d5e3ff",
        "tertiary-container": "#006363",
        "primary-container": "#34598e",
        "surface-container-lowest": "#ffffff",
        "on-background": "#191c1e",
        "on-secondary-fixed": "#001f29",
        "primary-fixed-dim": "#a7c8ff",
        "on-secondary-container": "#09657f",
        "tertiary-fixed": "#93f2f2",
        "primary": "#184275",
        "surface": "#f7f9fb",
        "secondary-container": "#9ae1ff",
        "on-primary-fixed": "#001b3c",
        "error-container": "#ffdad6",
        "inverse-surface": "#2d3133",
        "on-tertiary-fixed-variant": "#004f4f",
        "tertiary-fixed-dim": "#76d6d5",
        "on-tertiary": "#ffffff",
        "inverse-primary": "#a7c8ff",
        "surface-container-low": "#f2f4f6",
        "secondary-fixed-dim": "#89d0ed",
        "secondary": "#0c6780",
        "error": "#ba1a1a",
        "on-primary-container": "#b7d1ff",
        "on-primary-fixed-variant": "#1f477b",
        "surface-container-highest": "#e0e3e5",
        "on-error-container": "#93000a",
        "outline": "#727784",
        "surface-container-high": "#e6e8ea",
        "surface-bright": "#f7f9fb",
        "on-secondary": "#ffffff",
        "on-surface": "#191c1e",
        "surface-dim": "#d8dadc",
        "tertiary": "#004949",
        "on-error": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
