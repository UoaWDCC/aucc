import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/app/(frontend)/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/lib/utils/**/*.{ts,tsx}',
    './src/assets/**/*.{ts,tsx,mdx}', // add (Logo, etc.)
    './src/globals/**/*.{ts,tsx,mdx}', // add if any Tailwind classes here
    './stories/**/*.{ts,tsx,mdx}', // uncomment if you want Storybook scanning
    './src/app/(payload)/**/*.{ts,tsx}', // uncomment if admin needs Tailwind
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
