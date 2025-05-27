import type { StorybookConfig } from '@storybook/experimental-nextjs-vite'

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
}
export default config
