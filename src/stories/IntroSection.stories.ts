import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { IntroSection } from '@/app/(frontend)/home/_components/intro/IntroSection'

const meta = {
  title: 'IntroSection',
  component: IntroSection,
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof IntroSection>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
