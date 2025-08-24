import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}', // Next.js app dir
    './src/**/*.{ts,tsx,js,jsx,mdx}', // Your source code
    './components/**/*.{ts,tsx,js,jsx,mdx}', // If you keep components here
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // TODO(dyzhuu) see if we need custom styling for prose rendering
            //
            // h1: {
            //   fontFamily: 'var(--font-heading)',
            // },
            // h2: {
            //   fontFamily: 'var(--font-heading)',
            // },
            // h3: {
            //   fontFamily: 'var(--font-heading)',
            // },
            // h4: {
            //   fontFamily: 'var(--font-heading)',
            // },
            // h5: {
            //   fontFamily: 'var(--font-heading)',
            // },
            // h6: {
            //   fontFamily: 'var(--font-heading)',
            // },
          },
        },
      },
    },
  },
} satisfies Config
