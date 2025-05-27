import type { Meta, StoryObj } from '@storybook/react'

import { WelcomeSection } from '@/components/WelcomeSection'
import { WelcomeSectionBackground } from '@/components/WelcomeSectionBackground'
import { env } from '@/lib/env'

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
    children: <WelcomeSection />,
  },
}

export const Empty: Story = {
  parameters: {},
  args: {},
}
