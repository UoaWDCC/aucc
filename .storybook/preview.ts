import type { Preview } from '@storybook/nextjs-vite'

import '@/app/(frontend)/styles.css'

import '../src/app/(frontend)/styles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
