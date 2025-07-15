import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      screens: {
        xs: '400px', // For looking for us title
        s: '500px',
        m: '600px',
      },
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
