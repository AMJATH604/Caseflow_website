import type { Config } from "tailwindcss";

// Every colour is a CSS variable from src/index.css, so the public site (ink)
// and the admin panel (light) share one set of names.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        ink: { DEFAULT: v("ink"), 2: v("ink-2"), 3: v("ink-3") },
        fg: { DEFAULT: v("fg"), 2: v("fg-2"), 3: v("fg-3") },
        royal: v("royal"),
        violet: v("violet"),
        sky: v("sky"),
        gold: v("gold"),
        jade: v("jade"),
        danger: v("danger"),
        warn: v("warn"),
        paper: { DEFAULT: v("paper"), 2: v("paper-2") },
        line: "rgb(var(--line) / var(--line-a))",
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Newsreader", "Georgia", "Times New Roman", "serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      letterSpacing: { tightest: "-0.045em" },
      maxWidth: { prose: "65ch" },
    },
  },
  plugins: [],
} satisfies Config;
