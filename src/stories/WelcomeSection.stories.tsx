import type { Meta, StoryObj } from '@storybook/react'

import { WelcomeSectionBackground } from '@/components/WelcomeSection'

const meta = {
  title: 'WelcomeSectionBackground',
  component: WelcomeSectionBackground,
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof WelcomeSectionBackground>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  parameters: {},
  args: {
    children: <div className="w-full bg-red-400">1</div>,
  },
}
