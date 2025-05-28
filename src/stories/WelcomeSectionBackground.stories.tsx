import type { Meta, StoryObj } from '@storybook/react'

import { WelcomeSectionBackground } from '@/app/(frontend)/_components/sections/HomePage/Welcome/WelcomeSectionBackground'

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
}
