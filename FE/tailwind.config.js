/** @type {import('tailwindcss').Config} */
// Arogya Rx design language, carried over to the public site.
// Ink blue and sindoor red come from Dr. Deepak's letterhead; the "desk" is a
// cool blue-grey so white cards read as paper. Tokens mirror
// arogya-rx-dr-deepak/src/styles.css so both products look like one clinic.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        desk: "#EEF0F6",
        "desk-2": "#E3E7F1",
        paper: "#FFFFFF",
        line: "#D5DBE8",
        "line-2": "#C3CBDD",
        text: "#161A2E",
        muted: "#5B6280",
        faint: "#8A90A8",
        ink: {
          DEFAULT: "#1626B8",
          deep: "#0E1A6E",
          soft: "#E6E9FB",
          tint: "#F3F5FE",
        },
        sindoor: { DEFAULT: "#C8241C", soft: "#FBE6E4" },
        neem: { DEFAULT: "#1E7A4C", soft: "#DFF2E7" },
        haldi: { DEFAULT: "#9A5C00", soft: "#FCEFD6" },

        /* ── compatibility aliases ───────────────────────────────────────
           The older pages and widgets (Doctor-in-10, the WhatsApp widgets)
           still use the previous Material token names. Rather than rewrite
           1,200 lines of working widget code, the old names are remapped
           onto the Arogya Rx palette, so those screens inherit the new look
           automatically. Prefer the tokens above for anything new. */
        primary: { DEFAULT: "#1626B8", container: "#0E1A6E" },
        "on-primary": "#FFFFFF",
        "primary-container": "#0E1A6E",
        "on-primary-container": "#E6E9FB",
        "primary-fixed": "#E6E9FB",
        "primary-fixed-dim": "#B9C0F2",
        "on-primary-fixed": "#0B1142",
        "on-primary-fixed-variant": "#1D2A86",
        secondary: { DEFAULT: "#1E7A4C" },
        "on-secondary": "#FFFFFF",
        "secondary-container": "#DFF2E7",
        "on-secondary-container": "#145836",
        "secondary-fixed": "#DFF2E7",
        "secondary-fixed-dim": "#AEDCC4",
        "on-secondary-fixed": "#0D3B24",
        "on-secondary-fixed-variant": "#145836",
        tertiary: { DEFAULT: "#9A5C00", container: "#9A5C00" },
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#9A5C00",
        "on-tertiary-container": "#FCEFD6",
        "tertiary-fixed": "#FCEFD6",
        "tertiary-fixed-dim": "#EBCB94",
        "on-tertiary-fixed": "#3A2200",
        "on-tertiary-fixed-variant": "#7A4900",
        surface: "#EEF0F6",
        "on-surface": "#161A2E",
        "surface-variant": "#E3E7F1",
        "on-surface-variant": "#5B6280",
        "surface-bright": "#FFFFFF",
        "surface-dim": "#E3E7F1",
        "surface-container": "#E3E7F1",
        "surface-container-low": "#F3F5FE",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-high": "#E3E7F1",
        "surface-container-highest": "#D5DBE8",
        "inverse-surface": "#161A2E",
        "inverse-on-surface": "#EEF0F6",
        "inverse-primary": "#B9C0F2",
        background: "#EEF0F6",
        "on-background": "#161A2E",
        outline: "#8A90A8",
        "outline-variant": "#C3CBDD",
        error: "#C8241C",
        "on-error": "#FFFFFF",
        "error-container": "#FBE6E4",
        "on-error-container": "#8E1812",
        "surface-tint": "#1626B8",
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
        full: "9999px",
      },
      fontFamily: {
        head: ['Martel', 'Noto Serif Devanagari', 'Georgia', 'serif'],
        ui: ['Hind', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        hand: ['Kalam', 'Segoe Print', 'cursive'],
        headline: ['Martel', 'Noto Serif Devanagari', 'Georgia', 'serif'],
        body: ['Hind', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        label: ['Hind', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: "0 1px 2px rgba(22,26,46,.06), 0 8px 24px rgba(22,26,46,.07)",
        "lift-lg": "0 2px 4px rgba(22,26,46,.05), 0 18px 48px rgba(22,26,46,.10)",
        ink: "0 10px 34px rgba(22,38,184,.22)",
      },
      maxWidth: { content: "1180px" },
      transitionTimingFunction: { out: "cubic-bezier(.22,.61,.36,1)" },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
